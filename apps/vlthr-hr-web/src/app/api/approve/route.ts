import { NextResponse } from "next/server";
import { join } from "node:path";
import { appendAudit } from "@neios/governance";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { requestId?: string; decision?: "approved" | "rejected"; by?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  if (!body.requestId || (body.decision !== "approved" && body.decision !== "rejected")) {
    return NextResponse.json({ error: "body must include requestId and decision approved|rejected" }, { status: 400 });
  }

  const auditDir =
    process.env.NEIOS_AUDIT_DIR ?? join(process.cwd(), "..", "..", "data", "audit");

  appendAudit(auditDir, {
    timestamp: new Date().toISOString(),
    requestId: body.requestId,
    requester: body.by ?? "unknown",
    role: "procurement-assistant",
    inputHash: "",
    policyResult: "n/a (approval event)",
    provider: "n/a",
    modelRequestId: null,
    outputHash: null,
    validationResult: "n/a",
    approvalResult: body.decision,
    finalState: body.decision === "approved" ? "approved" : "rejected",
  });

  return NextResponse.json({ ok: true, decision: body.decision, requestId: body.requestId });
}
