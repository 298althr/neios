// Core loop orchestrator — one path for model/integration calls (§4.4):
// request -> context -> policy -> model -> result -> evidence -> approval -> audit
// Each stage is appended to `trace` with status, for UI visibility (§4.7/§7.1).

import { randomUUID } from "node:crypto";
import type { NAtlasProvider, NAtlasResponse } from "@neios/natlas-adapter";
import type { ApsosIntake } from "./apsos.ts";
import { getRole } from "./role.ts";
import { evaluatePolicy, type PolicyResult } from "./policy.ts";
import { parseInvoiceDraft, validateInvoiceDraft, fieldProvenance, type InvoiceDraft, type ValidationIssue } from "./invoice.ts";
import { appendAudit, sha256, type AuditRecord } from "./audit.ts";

export type StageStatus = "ok" | "warn" | "fail" | "skipped";

export interface TraceStage {
  stage: string;
  status: StageStatus;
  detail: string;
}

export interface PipelineResult {
  requestId: string;
  trace: TraceStage[];
  policy: PolicyResult;
  modelResponse?: NAtlasResponse;
  invoice?: InvoiceDraft;
  issues: ValidationIssue[];
  approval: "required" | "not_required" | "blocked_before_model";
  auditFile?: string;
  auditRecord: AuditRecord;
}

const INVOICE_SYSTEM = `You are the structured-output engine inside a governed enterprise workflow.
The user message contains a Nigerian SME procurement request. Return ONLY a JSON object — no prose — matching:
{
  "document_type": "invoice_draft",
  "supplier": {"name": "..."},
  "buyer": {"name": "..."},
  "currency": "NGN",
  "items": [{"description": "...", "quantity": 0, "unit_price": 0, "line_total": 0}],
  "subtotal": 0, "tax": 0, "total": 0,
  "delivery_terms": null,
  "missing_fields": [],
  "review_required": true,
  "field_provenance": {}
}
line_total = quantity * unit_price. subtotal = sum of line_totals. total = subtotal + tax.
ALL numbers must be literal JSON numbers (e.g. 2410000) — never expressions like "2250000 + 160000". Do the arithmetic yourself and emit the final value.
"missing_fields" lists only missing INVOICE business fields (e.g. delivery date, payment terms) — never names of request/intake fields. Always emit every key in the template, using null for unknown values.
If a value was not stated in the request, put null in the field and list it in missing_fields. Never invent supplier tax IDs, addresses, or bank details.`;

export async function runWorkRequest(opts: {
  intake: ApsosIntake;
  roleId: string;
  provider: NAtlasProvider;
  providerName: string;
  auditDir: string;
}): Promise<PipelineResult> {
  const { intake, roleId, provider, providerName, auditDir } = opts;
  const requestId = randomUUID();
  const trace: TraceStage[] = [];
  const issues: ValidationIssue[] = [];
  const push = (stage: string, status: StageStatus, detail: string) => trace.push({ stage, status, detail });

  push("REQUEST", "ok", `request ${requestId} from ${intake.who.requester}`);

  // CONTEXT — package intake into the model prompt
  const role = getRole(roleId);
  const intakeJson = JSON.stringify(intake);
  const context =
    `Work type: ${intake.what.workType}\nRequester: ${intake.who.requester}\n` +
    `Purpose: ${intake.why.purpose}\nItems: ${intakeJson}\n` +
    (intake.what.sourceText ? `Source text: ${intake.what.sourceText}\n` : "");
  push("CONTEXT", "ok", `APSOS intake packaged for role "${roleId}"`);

  // POLICY — deterministic, before any model call
  const policy = evaluatePolicy(intake, role);
  if (policy.decision === "BLOCK") {
    push("POLICY", "fail", `BLOCK — ${policy.reasons.join("; ")}`);
    for (const s of ["MODEL", "RESULT", "EVIDENCE", "APPROVAL"]) push(s, "skipped", "blocked by policy");
    return finish(policy, trace, issues, "blocked_before_model", requestId, intake, roleId, providerName, auditDir);
  }
  push("POLICY", policy.decision === "REVIEW" ? "warn" : "ok", `${policy.decision} — ${policy.reasons.join("; ") || "no issues"}`);

  // MODEL — the only place the provider is called
  let modelResponse: NAtlasResponse;
  try {
    modelResponse = await provider.generate({ system: INVOICE_SYSTEM, prompt: context, maxTokens: 1024, requestId });
    push("MODEL", "ok", `${providerName} responded in ${modelResponse.latencyMs}ms (${modelResponse.model})`);
  } catch (err) {
    push("MODEL", "fail", String(err instanceof Error ? err.message : err));
    for (const s of ["RESULT", "EVIDENCE", "APPROVAL"]) push(s, "skipped", "model call failed");
    return finish(policy, trace, issues, "blocked_before_model", requestId, intake, roleId, providerName, auditDir);
  }

  // RESULT — structure + validate (one repair retry on malformed output; the
  // model is small and occasionally emits invalid JSON — a second call with a
  // fix-up nudge is cheaper than failing the whole request)
  let invoice: InvoiceDraft | undefined;
  try {
    invoice = parseInvoiceDraft(modelResponse.text);
  } catch (firstErr) {
    push("RESULT", "warn", "first output not valid schema JSON — retrying once");
    try {
      modelResponse = await provider.generate({
        system: INVOICE_SYSTEM,
        prompt: `${context}\n\nIMPORTANT: your previous reply was not valid JSON. Return ONLY the JSON object, with literal numbers and every template key present.`,
        maxTokens: 1024,
        requestId: `${requestId}-retry`,
      });
      push("MODEL", "ok", `retry responded in ${modelResponse.latencyMs}ms`);
      invoice = parseInvoiceDraft(modelResponse.text);
    } catch (err) {
      issues.push({ field: "output", issue: String(err instanceof Error ? err.message : err) });
      push("RESULT", "fail", `model output could not be parsed into invoice_draft schema (${String(firstErr instanceof Error ? firstErr.message : firstErr)})`);
    }
  }
  if (invoice) {
    issues.push(...validateInvoiceDraft(invoice));
    push("RESULT", issues.length ? "warn" : "ok", issues.length ? `${issues.length} validation issue(s)` : "schema + arithmetic valid");
  } else if (!issues.some((i) => i.field === "output")) {
    push("RESULT", "fail", "no structured output produced");
  }

  // EVIDENCE — provenance per field
  if (invoice) {
    invoice.field_provenance = fieldProvenance(invoice, intakeJson);
    push("EVIDENCE", "ok", "field provenance assigned (input_fact / model_derived / system_derived)");
  } else {
    push("EVIDENCE", "skipped", "no structured output to annotate");
  }

  // APPROVAL — lane 2+ output is a draft pending human approval
  const approval = policy.lane >= 2 || policy.decision === "REVIEW" ? "required" : "not_required";
  push("APPROVAL", approval === "required" ? "warn" : "ok", approval === "required" ? "draft pending human approval (lane 2)" : "no approval required");

  const result = finish(policy, trace, issues, approval, requestId, intake, roleId, providerName, auditDir, modelResponse.text, modelResponse.requestId);
  result.modelResponse = modelResponse;
  result.invoice = invoice;
  return result;
}

function finish(
  policy: PolicyResult,
  trace: TraceStage[],
  issues: ValidationIssue[],
  approval: PipelineResult["approval"],
  requestId: string,
  intake: ApsosIntake,
  roleId: string,
  providerName: string,
  auditDir: string,
  modelOutputText?: string,
  modelRequestId?: string,
): PipelineResult {
  const producedOutput = trace.find((t) => t.stage === "RESULT")?.status === "ok" || trace.find((t) => t.stage === "RESULT")?.status === "warn";
  const finalState =
    policy.decision === "BLOCK" ? "blocked" : !producedOutput ? "failed" : approval === "required" ? "pending_approval" : "complete";

  const record: AuditRecord = {
    timestamp: new Date().toISOString(),
    requestId,
    requester: intake.who.requester,
    role: roleId,
    inputHash: sha256(JSON.stringify(intake)),
    policyResult: `${policy.decision} (lane ${policy.lane})`,
    provider: providerName,
    modelRequestId: modelRequestId ?? null,
    outputHash: modelOutputText ? sha256(modelOutputText) : null,
    validationResult: issues.length ? `${issues.length} issue(s)` : "pass",
    approvalResult: approval,
    finalState,
  };
  const auditFile = appendAudit(auditDir, record);
  trace.push({ stage: "AUDIT", status: "ok", detail: `record appended to ${auditFile}` });

  return { requestId, trace, policy, issues, approval, auditFile, auditRecord: record };
}
