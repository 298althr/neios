// Audit service (direction doc §5.I) — append-only JSONL record per work
// request. Hash-chain infrastructure deliberately deferred for the MVP.

import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export interface AuditRecord {
  timestamp: string;
  requestId: string;
  requester: string;
  role: string;
  /** sha256 of the intake — a safe input reference, not the raw input. */
  inputHash: string;
  policyResult: string;
  provider: string;
  modelRequestId: string | null;
  outputHash: string | null;
  validationResult: string;
  approvalResult: string;
  finalState: string;
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function appendAudit(dir: string, record: AuditRecord): string {
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "audit-log.jsonl");
  appendFileSync(file, JSON.stringify(record) + "\n");
  return file;
}
