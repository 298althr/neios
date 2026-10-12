// NEIOS MCP server — exposes the governed N-ATLAS work-request loop as MCP
// tools over stdio (Claude Desktop / IDEs / agent frameworks).
//
// Every call goes through the SAME governed path as the web app and CLI:
//   intake -> deterministic policy -> N-ATLaS -> validation+repair ->
//   provenance -> pending_approval -> append-only audit.
// The MCP tool NEVER executes consequential work itself — lane-2 drafts come
// back "pending_approval" and a human decides via neios_record_decision or
// the approvals UI. Content never grants authority.
//
// Env: NATLAS_BASE_URL / NATLAS_API_KEY / NATLAS_MODEL / NEIOS_AUDIT_DIR

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { OpenAICompatProvider } from "@neios/natlas-adapter";
import { runWorkRequest, appendAudit, type ApsosIntake, type AuditRecord } from "@neios/governance";

const REPO_ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const AUDIT_DIR = process.env.NEIOS_AUDIT_DIR ?? join(REPO_ROOT, "data", "audit");
const AUDIT_FILE = join(AUDIT_DIR, "audit-log.jsonl");
const BASE_URL = process.env.NATLAS_BASE_URL ?? "http://127.0.0.1:18000/v1";
const ROLE_ID = "procurement-assistant";

const text = (obj: { [x: string]: unknown }) => ({
  content: [{ type: "text" as const, text: JSON.stringify(obj, null, 2) }],
  structuredContent: obj,
});
const err = (e: unknown) => ({
  isError: true as const,
  content: [{ type: "text" as const, text: e instanceof Error ? e.message : String(e) }],
});

function readAudit(): AuditRecord[] {
  if (!existsSync(AUDIT_FILE)) return [];
  return readFileSync(AUDIT_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l) as AuditRecord);
}

const server = new McpServer({
  name: "neios",
  version: "0.1.0",
});

server.registerTool(
  "neios_submit_request",
  {
    title: "Submit governed work request",
    description:
      "Submit a work request (e.g. a procurement request, in English/Pidgin/Hausa/Yoruba/Igbo) " +
      "through the governed N-ATLAS pipeline. Deterministic policy runs BEFORE the model; the " +
      "result is a validated draft pending human approval — this tool never executes work itself.",
    inputSchema: {
      text: z.string().describe("The request in natural language (any supported language)"),
      requester: z.string().describe("Who is making the request"),
      organisation: z.string().optional(),
      workType: z.string().default("procurement_invoice").describe("Must be allowed by the role's policy"),
      urgency: z.enum(["routine", "urgent", "critical"]).default("routine"),
      criticality: z.enum(["low", "medium", "high"]).default("medium"),
      purpose: z.string().optional().describe("Business purpose; defaults to the request text"),
    },
  },
  async (args) => {
    try {
      const intake: ApsosIntake = {
        who: { requester: args.requester, organisation: args.organisation },
        what: {
          workType: args.workType,
          requestedOutput: "invoice_draft",
          items: ["see sourceText"],
          sourceText: args.text,
        },
        why: { purpose: args.purpose ?? args.text.slice(0, 200), criticality: args.criticality },
        when: { urgency: args.urgency, dueAt: null },
      };
      const provider = new OpenAICompatProvider({
        baseUrl: BASE_URL,
        apiKey: process.env.NATLAS_API_KEY ?? "devkey123",
        model: process.env.NATLAS_MODEL,
        timeoutMs: 180_000,
      });
      const r = await runWorkRequest({
        intake,
        roleId: ROLE_ID,
        provider,
        providerName: `openai-compat:${BASE_URL}`,
        auditDir: AUDIT_DIR,
      });
      return text({
        requestId: r.requestId,
        finalState: r.auditRecord.finalState,
        approval: r.approval,
        policyDecision: r.policy.decision,
        repairs: r.repairs,
        issues: r.issues,
        invoice: r.invoice ?? null,
        trace: r.trace.map((s) => `${s.status} ${s.stage}: ${s.detail}`),
        note:
          r.approval === "required"
            ? "Draft produced — a human must approve via neios_record_decision or the Approvals UI. Nothing is executed by this tool."
            : undefined,
      });
    } catch (e) {
      return err(e);
    }
  },
);

server.registerTool(
  "neios_pending_approvals",
  {
    title: "List pending approvals",
    description:
      "Audit records whose finalState is pending_approval with no later approve/reject decision. " +
      "These are drafts waiting for a human.",
    inputSchema: {},
  },
  async () => {
    try {
      const records = readAudit();
      const decided = new Set(
        records.filter((r) => r.finalState === "approved" || r.finalState === "rejected").map((r) => r.requestId),
      );
      const pending = records.filter((r) => r.finalState === "pending_approval" && !decided.has(r.requestId));
      return text({ count: pending.length, pending });
    } catch (e) {
      return err(e);
    }
  },
);

server.registerTool(
  "neios_record_decision",
  {
    title: "Record human approval decision",
    description:
      "Append an approval event to the audit log for a pending draft. decision must be " +
      "'approved' or 'rejected'. Records the human decision; does not mutate the draft.",
    inputSchema: {
      requestId: z.string().describe("requestId returned by neios_submit_request"),
      decision: z.enum(["approved", "rejected"]),
      by: z.string().describe("Name/ID of the human making the decision"),
    },
  },
  async (args) => {
    try {
      appendAudit(AUDIT_DIR, {
        timestamp: new Date().toISOString(),
        requestId: args.requestId,
        requester: args.by,
        role: ROLE_ID,
        inputHash: "",
        policyResult: "n/a (approval event)",
        provider: "n/a",
        modelRequestId: null,
        outputHash: null,
        validationResult: "n/a",
        approvalResult: args.decision,
        finalState: args.decision === "approved" ? "approved" : "rejected",
      });
      return text({ ok: true, requestId: args.requestId, decision: args.decision, by: args.by });
    } catch (e) {
      return err(e);
    }
  },
);

server.registerTool(
  "neios_get_request",
  {
    title: "Look up a request in the audit log",
    description:
      "All audit records for one requestId — the run record plus any approval decision. " +
      "Use after neios_submit_request to check final state.",
    inputSchema: {
      requestId: z.string(),
    },
  },
  async (args) => {
    try {
      const records = readAudit().filter((r) => r.requestId === args.requestId);
      return text({ requestId: args.requestId, found: records.length > 0, records });
    } catch (e) {
      return err(e);
    }
  },
);

server.registerTool(
  "neios_audit_tail",
  {
    title: "Read recent audit records",
    description:
      "Return the most recent records from the append-only audit log (every request, block, " +
      "failure and human decision).",
    inputSchema: {
      limit: z.number().int().min(1).max(200).default(20),
    },
  },
  async (args) => {
    try {
      const records = readAudit();
      return text({ total: records.length, records: records.slice(-args.limit) });
    } catch (e) {
      return err(e);
    }
  },
);

await server.connect(new StdioServerTransport());
console.error("neios-mcp: stdio server ready");
