"use client";

import { useEffect, useState } from "react";

interface AuditRecord {
  timestamp: string; requestId: string; requester: string; role: string;
  policyResult: string; provider: string; modelRequestId: string | null;
  outputHash: string | null; validationResult: string; approvalResult: string; finalState: string;
}

const badgeFor = (s: string) =>
  s === "blocked" || s === "failed" || s === "rejected" ? "b-fail"
  : s === "pending_approval" ? "b-warn"
  : s === "approved" || s === "complete" ? "b-ok" : "b-info";

export default function AuditPage() {
  const [records, setRecords] = useState<AuditRecord[] | null>(null);
  useEffect(() => {
    fetch("/api/audit").then((r) => r.json()).then((j) => setRecords((j.records as AuditRecord[]).reverse()));
  }, []);

  return (
    <>
      <h1 className="page-title">Audit Log</h1>
      <p className="page-sub">
        Append-only record — every run, block, failure and human decision. Stored in <code>data/audit/audit-log.jsonl</code>
      </p>

      <div className="card">
        {records === null && <div className="empty">loading…</div>}
        {records?.length === 0 && <div className="empty">no records yet</div>}
        {records && records.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Time (UTC)</th><th>Request</th><th>Requester</th><th>Role</th>
                <th>Policy</th><th>Model req.</th><th>Validation</th><th>Approval</th><th>Final state</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.timestamp.slice(0, 19).replace("T", " ")}</td>
                  <td>{r.requestId.slice(0, 8)}…</td>
                  <td>{r.requester}</td>
                  <td>{r.role}</td>
                  <td>{r.policyResult}</td>
                  <td>{r.modelRequestId ?? "—"}</td>
                  <td>{r.validationResult}</td>
                  <td>{r.approvalResult}</td>
                  <td><span className={`badge ${badgeFor(r.finalState)}`}>{r.finalState}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
