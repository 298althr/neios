import { NextResponse } from "next/server";
import { join } from "node:path";
import { OpenAICompatProvider } from "@neios/natlas-adapter";
import { runWorkRequest, type ApsosIntake } from "@neios/governance";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { intake?: ApsosIntake; roleId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  if (!body.intake || !body.roleId) {
    return NextResponse.json({ error: "body must include intake and roleId" }, { status: 400 });
  }

  const baseUrl = process.env.NATLAS_BASE_URL ?? "http://127.0.0.1:18000/v1";
  const provider = new OpenAICompatProvider({
    baseUrl,
    apiKey: process.env.NATLAS_API_KEY ?? "devkey123",
    model: process.env.NATLAS_MODEL,
    timeoutMs: 180_000,
  });

  const auditDir =
    process.env.NEIOS_AUDIT_DIR ?? join(process.cwd(), "..", "..", "data", "audit");

  const result = await runWorkRequest({
    intake: body.intake,
    roleId: body.roleId,
    provider,
    providerName: `openai-compat:${baseUrl}`,
    auditDir,
  });

  return NextResponse.json(result);
}
