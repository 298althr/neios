// Gate G0 smoke test — calls the real N-ATLAS backend through NAtlasProvider
// and writes the raw request/response evidence to engineering/evidence/.
//
// Usage:
//   node scripts/natlas-smoke-test.ts [prompt]
//
// Env (see .env.example):
//   NATLAS_BASE_URL  default http://localhost:8000/v1  (SSH tunnel to vast.ai vLLM)
//   NATLAS_API_KEY   default devkey123
//   NATLAS_MODEL     optional — defaults to first id reported by GET /models
//
// Requires Node >= 22.18 (native .ts execution). No install step needed.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OpenAICompatProvider } from "../packages/natlas-adapter/src/index.ts";

// NOTE: 127.0.0.1:18000 — local Ollama already owns :11434
// on Windows and won't fall back, but the SSH tunnel binds IPv4 only.
const baseUrl = process.env.NATLAS_BASE_URL ?? "http://127.0.0.1:18000/v1";
const apiKey = process.env.NATLAS_API_KEY ?? "devkey123";
const prompt =
  process.argv[2] ??
  "A trader at Balogun Market in Lagos wants an invoice for 50 bags of rice at 45000 naira each from supplier Adaeze Foods. Draft the invoice line items in JSON.";

const provider = new OpenAICompatProvider({
  baseUrl,
  apiKey,
  model: process.env.NATLAS_MODEL,
  timeoutMs: 180_000,
});

const requestedAt = new Date().toISOString();
console.log(`[smoke] endpoint : ${baseUrl}`);
console.log(`[smoke] prompt   : ${prompt}`);
console.log(`[smoke] calling provider.generate() ...`);

const res = await provider.generate({ prompt, maxTokens: 256, requestId: "g0-smoke" });

const evidence = {
  gate: "G0",
  kind: "natlas-smoke-test",
  endpoint: baseUrl,
  requestedAt,
  modelRequested: process.env.NATLAS_MODEL ?? "(from /models)",
  modelReported: res.model,
  backendRequestId: res.requestId ?? null,
  latencyMs: res.latencyMs,
  finishReason: res.finishReason ?? null,
  prompt,
  responseText: res.text,
};

console.log(`[smoke] latency  : ${res.latencyMs}ms, model: ${res.model}, finish: ${res.finishReason}`);
console.log(`[smoke] response :\n${res.text}`);

const dir = join(process.cwd(), "engineering", "evidence");
mkdirSync(dir, { recursive: true });
const file = join(dir, `natlas-g0-${requestedAt.replace(/[:.]/g, "-")}.json`);
writeFileSync(file, JSON.stringify(evidence, null, 2));
console.log(`[smoke] evidence : ${file}`);
