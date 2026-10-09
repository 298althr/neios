"use client";

import { useEffect, useState } from "react";

interface AuditRecord {
  timestamp: string; requestId: string; requester: string; role: string;
  policyResult: string; validationResult: string; approvalResult: string; finalState: string;
}

/** Latest record per requestId — a request is pending iff its newest record
 *  says pending_approval (a later approved/rejected event supersedes it). */
function pendingQueue(records: AuditRecord[]): AuditRecord[] {
  const latest = new Map<string, AuditRecord>();
  for (const r of records) {
    const cur = latest.get(r.requestId);
    if (!cur || r.timestamp > cur.timestamp) latest.set(r.requestId, r);
  }
  return [...latest.values()].filter((r) => r.finalState === "pending_approval").reverse();
}

export default function ApprovalsPage() {
  const [queue, setQueue] = useState<AuditRecord[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/audit");
    const json = await res.json();
    setQueue(pendingQueue(json.records as AuditRecord[]));
  }
  useEffect(() => { refresh(); }, []);

  async function decide(requestId: string, decision: "approved" | "rejected") {
    setBusy(requestId);
    await fetch("/api/approve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ requestId, decision, by: "approver-console" }),
    });
    await refresh();
    setBusy(null);
  }

  return (
    <>
      <h1 className="page-title">Approvals</h1>
      <p className="page-sub">Lane-2 outputs wait here. Nothing consequential ships without a human decision.</p>

      <div className="card">
        {queue === null && <div className="empty">loading…</div>}
        {queue !== null && queue.length === 0 && <div className="empty">no drafts awaiting approval</div>}
        {queue?.map((r) => (
          <div key={r.requestId} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ flex: 1 }}>
              <div className="kv"><b>{r.requestId.slice(0, 8)}…</b> · {r.role} · {r.requester}</div>
              <div className="kv" style={{ fontSize: 12 }}>{r.timestamp.slice(0, 19).replace("T", " ")} UTC · {r.policyResult} · validation: {r.validationResult}</div>
            </div>
            <span className="badge b-warn">pending_approval</span>
            <button className="btn btn-ok btn-sm" disabled={busy === r.requestId} onClick={() => decide(r.requestId, "approved")}>Approve</button>
            <button className="btn btn-danger btn-sm" disabled={busy === r.requestId} onClick={() => decide(r.requestId, "rejected")}>Reject</button>
          </div>
        ))}
      </div>
    </>
  );
}
