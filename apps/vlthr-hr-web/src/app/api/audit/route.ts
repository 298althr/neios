import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const auditDir = process.env.NEIOS_AUDIT_DIR ?? join(process.cwd(), "..", "..", "data", "audit");
  const auditFile = join(auditDir, "audit-log.jsonl");
  if (!existsSync(auditFile)) return NextResponse.json({ records: [] });
  const records = readFileSync(auditFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  return NextResponse.json({ records });
}
