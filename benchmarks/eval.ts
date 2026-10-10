// NEIOS governed-intake benchmark — runs fixtures/golden-requests.json through
// the REAL pipeline + live N-ATLaS provider and scores each run.
//
// Scoring (mirrors the prototype's quality model):
//   parse      40 pts — model output parsed into the invoice_draft schema
//   extraction 40 pts — expected line items found (25) + expected total within
//                       5% (15, skipped if fixture declares no total)
//   arithmetic 20 pts — post-repair consistency: line_total = qty*unit_price,
//                       total = subtotal + tax
//   pass >= 80. policyDecision is checked separately — policy runs BEFORE the
//   model and is a governance check, not a model-quality signal.
//
// Usage:
//   node benchmarks/eval.ts                      # all fixtures
//   node benchmarks/eval.ts fx-en-pidgin         # one fixture
//   node benchmarks/eval.ts --dry                # score fixtures offline (mock provider)
//
// Env: NATLAS_BASE_URL / NATLAS_API_KEY / NATLAS_MODEL
// Report: engineering/metrics/eval-<promptVersion>-<ts>.json + stdout table.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OpenAICompatProvider, type NAtlasProvider, type NAtlasResponse } from "../packages/natlas-adapter/src/index.ts";
import { runWorkRequest, PROMPT_VERSION, type ApsosIntake, type PipelineResult } from "../packages/governance/src/index.ts";

interface FixtureExpected {
  policyDecision: "ALLOW" | "REVIEW" | "BLOCK";
  schemaValid: boolean;
  items?: number;
  total?: number;
  missingField?: string;
  mustNotContain?: string;
  modelCalled?: boolean;
}
interface Fixture { id: string; label: string; language: string; intake: ApsosIntake; expected: FixtureExpected }

const set = JSON.parse(readFileSync(join("fixtures", "golden-requests.json"), "utf8")) as { fixtures: Fixture[] };
const arg = process.argv[2];
const dry = arg === "--dry";
const fixtures = arg && !dry ? set.fixtures.filter((f) => f.id === arg) : set.fixtures;
if (!fixtures.length) { console.error(`no fixture matched '${arg}'`); process.exit(1); }

const provider: NAtlasProvider = dry
  ? { generate: async (): Promise<NAtlasResponse> => ({ text: JSON.stringify({ document_type: "invoice_draft", supplier: { name: "mock" }, buyer: { name: "mock" }, currency: "NGN", items: [], subtotal: 0, tax: 0, total: 0, missing_fields: [] }), model: "mock", latencyMs: 1 }) }
  : new OpenAICompatProvider({
      baseUrl: process.env.NATLAS_BASE_URL ?? "http://127.0.0.1:18000/v1",
      apiKey: process.env.NATLAS_API_KEY ?? "devkey123",
      model: process.env.NATLAS_MODEL,
      timeoutMs: 180_000,
    });

const auditDir = join(process.cwd(), "data", "audit");

function arithConsistent(r: PipelineResult): boolean {
  const inv = r.invoice;
  if (!inv) return false;
  const lines = inv.items.every((i) => i.line_total === i.quantity * i.unit_price);
  return lines && inv.subtotal === inv.items.reduce((s, i) => s + i.line_total, 0) && inv.total === inv.subtotal + (inv.tax ?? 0);
}

function score(fx: Fixture, r: PipelineResult) {
  const e = fx.expected;
  const parsed = !!r.invoice;
  const itemsOk = e.items == null || (r.invoice?.items.length ?? 0) >= e.items;
  const totalOk = e.total == null ? itemsOk : !!r.invoice && Math.abs(r.invoice.total - e.total) / e.total <= 0.05;
  const arithOk = parsed && arithConsistent(r);
  const missingOk = e.missingField == null || r.invoice?.missing_fields?.some((m) => m.toLowerCase().includes(e.missingField!)) === true;
  const safe = e.mustNotContain == null || !(r.modelResponse?.text ?? "").includes(e.mustNotContain);
  const modelOk = e.modelCalled === false ? !r.modelResponse : true;

  const extraction = (itemsOk ? 25 : 0) + (e.total == null ? (itemsOk ? 15 : 0) : totalOk ? 15 : 0);
  const value = (parsed ? 40 : 0) + extraction + (arithOk ? 20 : 0);
  const policyOk = r.policy.decision === e.policyDecision;
  // For fixtures where the correct outcome is "blocked before the model",
  // pass means the block fired and no model call happened.
  const pass = e.modelCalled === false ? policyOk && modelOk : value >= 80;
  return {
    policyOk,
    parsed, itemsOk, totalOk, arithOk, missingOk, safe, modelOk,
    score: value, pass,
    latencyMs: r.modelResponse?.latencyMs ?? null,
    repairs: r.repairs.length,
    issues: r.issues.length,
    finalState: r.auditRecord.finalState,
    requestId: r.requestId,
    modelRequestId: r.auditRecord.modelRequestId,
  };
}

const rows = [];
for (const fx of fixtures) {
  process.stdout.write(`${fx.id} … `);
  const result = await runWorkRequest({
    intake: fx.intake,
    roleId: "procurement-assistant",
    provider,
    providerName: dry ? "mock:dry-run" : `openai-compat:${process.env.NATLAS_BASE_URL ?? "http://127.0.0.1:18000/v1"}`,
    auditDir,
  });
  const s = score(fx, result);
  rows.push({ fixture: fx.id, label: fx.label, language: fx.language, ...s });
  console.log(`${s.pass && s.policyOk ? "PASS" : "FAIL"} score=${s.score} policy=${result.policy.decision} items=${result.invoice?.items.length ?? "—"} latency=${s.latencyMs ?? "—"}ms repairs=${s.repairs}`);
}

const summary = {
  generatedAt: new Date().toISOString(),
  promptVersion: PROMPT_VERSION,
  provider: dry ? "mock:dry-run" : process.env.NATLAS_BASE_URL ?? "http://127.0.0.1:18000/v1",
  total: rows.length,
  passed: rows.filter((r) => r.pass && r.policyOk).length,
  meanScore: Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length),
  meanLatencyMs: Math.round(rows.filter((r) => r.latencyMs).reduce((s, r) => s + (r.latencyMs ?? 0), 0) / Math.max(1, rows.filter((r) => r.latencyMs).length)),
  rows,
};

console.log(`\n=== ${summary.passed}/${summary.total} pass · mean score ${summary.meanScore}/100 · mean latency ${summary.meanLatencyMs}ms · prompt ${PROMPT_VERSION} ===`);

const dir = join(process.cwd(), "engineering", "metrics");
mkdirSync(dir, { recursive: true });
const file = join(dir, `eval-${PROMPT_VERSION}-${Date.now()}.json`);
writeFileSync(file, JSON.stringify(summary, null, 2));
console.log(`report: ${file}`);
process.exit(summary.passed === summary.total ? 0 : 2);
