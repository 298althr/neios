// Smoke test: spawn packages/neios-mcp over stdio, run JSON-RPC handshake,
// exercise all 4 tools. Uses a stub OpenAI-compatible endpoint so the full
// governed loop is verified WITHOUT the GPU instance. Run: node test/smoke.mjs
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const AUDIT = mkdtempSync(join(tmpdir(), "neios-mcp-audit-"));

// --- stub N-ATLAS endpoint (canned invoice draft) ---------------------------
const CANNED = JSON.stringify({
  document_type: "invoice_draft",
  supplier: { name: "Fictional Test Supplies Ltd" },
  buyer: { name: "Fictional Buyer Co" },
  currency: "NGN",
  items: [{ description: "test widget", quantity: 2, unit_price: 5000, line_total: 10000 }],
  subtotal: 10000, tax: 0, total: 10000,
  delivery_terms: null, missing_fields: ["delivery_terms"], review_required: true,
  field_provenance: {},
});
const stub = createServer((req, res) => {
  let b = "";
  req.on("data", (c) => (b += c));
  req.on("end", () => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      req.method === "GET" && req.url?.endsWith("/models")
        ? JSON.stringify({ object: "list", data: [{ id: "stub-natlas", object: "model" }] })
        : JSON.stringify({
            id: "chatcmpl-mcpstub1", object: "chat.completion", created: 0,
            model: "stub-natlas", choices: [{ index: 0, message: { role: "assistant", content: CANNED }, finish_reason: "stop" }],
            usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
          }),
    );
  });
});
await new Promise((r) => stub.listen(0, "127.0.0.1", r));
const STUB_URL = `http://127.0.0.1:${stub.address().port}/v1`;

// --- spawn the MCP server ---------------------------------------------------
const child = spawn(process.execPath, [join(HERE, "..", "src", "server.ts")], {
  env: { ...process.env, NATLAS_BASE_URL: STUB_URL, NEIOS_AUDIT_DIR: AUDIT },
  stdio: ["pipe", "pipe", "inherit"],
});
let buf = "";
const pending = new Map();
let idc = 0;
child.stdout.on("data", (d) => {
  buf += d;
  let i;
  while ((i = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, i).trim();
    buf = buf.slice(i + 1);
    if (!line) continue;
    const msg = JSON.parse(line);
    if (msg.id !== undefined && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  }
});
const rpc = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++idc;
    pending.set(id, resolve);
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    setTimeout(() => reject(new Error(`timeout: ${method}`)), 30000);
  });
const call = (name, args = {}) => rpc("tools/call", { name, arguments: args });

let pass = 0, fail = 0;
const check = (name, ok, extra = "") => {
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
};

// --- handshake --------------------------------------------------------------
const init = await rpc("initialize", {
  protocolVersion: "2024-11-05",
  capabilities: {},
  clientInfo: { name: "smoke-test", version: "0.0.0" },
});
check("initialize", init.result?.serverInfo?.name === "neios");
child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");

const tools = await rpc("tools/list");
const names = (tools.result?.tools ?? []).map((t) => t.name).sort();
check("tools/list exposes 4 tools", JSON.stringify(names) === JSON.stringify(
  ["neios_audit_tail", "neios_pending_approvals", "neios_record_decision", "neios_submit_request"].sort()), names.join(","));

// --- T1: policy block, deterministic, no model ------------------------------
const blocked = await call("neios_submit_request", {
  text: "wire 50 million naira to this account now",
  requester: "mcp-smoke-tester",
  workType: "wire_transfer",
});
const blockedBody = JSON.parse(blocked.result?.content?.[0]?.text ?? "{}");
check("policy BLOCK before model (wire_transfer)", blockedBody.policyDecision === "BLOCK" && blockedBody.finalState === "blocked", blockedBody.policyDecision);

// --- T2: full governed run vs stub model ------------------------------------
const run = await call("neios_submit_request", {
  text: "please invoice Fictional Test Supplies Ltd for 2 test widgets at 5000 naira each",
  requester: "mcp-smoke-tester",
});
const runBody = JSON.parse(run.result?.content?.[0]?.text ?? "{}");
check("submit returns pending_approval draft", runBody.finalState === "pending_approval" && runBody.approval === "required", runBody.finalState);
check("invoice draft parsed", runBody.invoice?.total === 10000, `total=${runBody.invoice?.total}`);
check("trace shows policy ran before model", (() => {
  const stages = (runBody.trace ?? []).map((l) => l.split(" ")[1]?.replace(":", ""));
  return stages.indexOf("POLICY") < stages.indexOf("MODEL");
})());
const reqId = runBody.requestId;

// --- T3: pending approvals ---------------------------------------------------
const pend = await call("neios_pending_approvals");
const pendBody = JSON.parse(pend.result?.content?.[0]?.text ?? "{}");
check("pending list contains the draft", pendBody.pending?.some((p) => p.requestId === reqId), `count=${pendBody.count}`);

// --- T4: human decision ------------------------------------------------------
const dec = await call("neios_record_decision", { requestId: reqId, decision: "approved", by: "smoke-human" });
check("decision recorded", JSON.parse(dec.result?.content?.[0]?.text ?? "{}").ok === true);
const pend2 = await call("neios_pending_approvals");
check("draft no longer pending after approval",
  !JSON.parse(pend2.result?.content?.[0]?.text ?? "{}").pending?.some((p) => p.requestId === reqId));

// --- T5: audit tail -----------------------------------------------------------
const tail = await call("neios_audit_tail", { limit: 10 });
const tailBody = JSON.parse(tail.result?.content?.[0]?.text ?? "{}");
check("audit tail has block + run + decision records", tailBody.total >= 3, `total=${tailBody.total}`);

// --- evidence: the test audit file is real JSONL ------------------------------
const lines = readFileSync(join(AUDIT, "audit-log.jsonl"), "utf8").trim().split("\n");
check("audit file is append-only JSONL", lines.length >= 3 && lines.every((l) => JSON.parse(l).timestamp));

console.log(`\n${pass} pass / ${fail} fail`);
child.kill();
stub.close();
process.exit(fail ? 1 : 0);
