// End-to-end core-loop demo — full pipeline against the real N-ATLAS backend:
// request -> context -> policy -> model -> result -> evidence -> approval -> audit
//
// Usage:
//   node scripts/neios-run.ts              # normal allow-then-review flow
//   node scripts/neios-run.ts --blocked    # policy-blocked request (no model call)
//   node scripts/neios-run.ts --missing    # incomplete intake (blocked on fields)
//
// Env: NATLAS_BASE_URL / NATLAS_API_KEY / NATLAS_MODEL (see .env.example)
// Requires Node >= 22.18. Evidence written to engineering/evidence/ + data/audit.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OpenAICompatProvider } from "../packages/natlas-adapter/src/index.ts";
import { runWorkRequest, type ApsosIntake } from "../packages/governance/src/index.ts";

const mode = process.argv[2] ?? "--normal";

// Clearly fictional SME + supplier per direction doc §6 ("do not hardcode a
// fake real company; use a clearly marked fictional SME and supplier").
const baseIntake: ApsosIntake = {
  who: { requester: "demo-user", organisation: "Fictional Demo Ventures Ltd (fictional)" },
  what: {
    workType: "procurement_invoice",
    requestedOutput: "invoice_draft",
    sourceText:
      "Oga please prepare invoice for our customer: 50 bags of Mama Gold rice at 45000 naira each " +
      "and 20 cartons of Indomie at 8000 naira each. Supplier na Fictional Adaeze Foods. " +
      "Buyer na Fictional Demo Ventures Ltd. Delivery by next Friday.",
  },
  why: { purpose: "monthly canteen restock procurement", criticality: "medium", severity: "low" },
  when: { urgency: "routine", dueAt: null },
};

const intake: ApsosIntake =
  mode === "--blocked"
    ? { ...baseIntake, what: { ...baseIntake.what, workType: "wire_transfer" } }
    : mode === "--missing"
      ? { ...baseIntake, what: { ...baseIntake.what, items: undefined }, who: { requester: "" } }
      : { ...baseIntake, what: { ...baseIntake.what, items: ["see sourceText"] } };

const provider = new OpenAICompatProvider({
  baseUrl: process.env.NATLAS_BASE_URL ?? "http://localhost:8000/v1",
  apiKey: process.env.NATLAS_API_KEY ?? "devkey123",
  model: process.env.NATLAS_MODEL,
  timeoutMs: 180_000,
});

const result = await runWorkRequest({
  intake,
  roleId: "procurement-assistant",
  provider,
  providerName: `openai-compat:${process.env.NATLAS_BASE_URL ?? "http://localhost:8000/v1"}`,
  auditDir: join(process.cwd(), "data", "audit"),
});

console.log("\n=== EXECUTION TRACE ===");
for (const s of result.trace) {
  const icon = { ok: "✓", warn: "!", fail: "✗", skipped: "·" }[s.status];
  console.log(` ${icon} ${s.stage.padEnd(9)} ${s.detail}`);
}
if (result.invoice) {
  console.log("\n=== INVOICE DRAFT ===");
  console.log(JSON.stringify(result.invoice, null, 2));
}
if (result.issues.length) {
  console.log("\n=== VALIDATION ISSUES ===");
  for (const i of result.issues) console.log(` - ${i.field}: ${i.issue}`);
}
console.log(`\napproval: ${result.approval} | final: ${result.auditRecord.finalState}`);

const dir = join(process.cwd(), "engineering", "evidence");
mkdirSync(dir, { recursive: true });
const file = join(dir, `run-${result.requestId}.json`);
writeFileSync(file, JSON.stringify({ mode, intake, ...result }, null, 2));
console.log(`evidence: ${file}`);
