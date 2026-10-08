"use client";

import { useState } from "react";

interface TraceStage {
  stage: string;
  status: "ok" | "warn" | "fail" | "skipped";
  detail: string;
}

interface AuditRecord {
  timestamp: string;
  requestId: string;
  requester: string;
  role: string;
  policyResult: string;
  provider: string;
  modelRequestId: string | null;
  outputHash: string | null;
  validationResult: string;
  approvalResult: string;
  finalState: string;
}

interface RunResult {
  requestId: string;
  trace: TraceStage[];
  policy: { decision: string; lane: number; reasons: string[] };
  invoice?: Record<string, unknown>;
  issues: { field: string; issue: string }[];
  approval: string;
  auditRecord: AuditRecord;
}

const ICON = { ok: "✓", warn: "!", fail: "✗", skipped: "·" } as const;

const EXAMPLES: Record<string, string> = {
  "English (Pidgin)":
    "Oga please prepare invoice for our customer: 50 bags of Mama Gold rice at 45000 naira each " +
    "and 20 cartons of Indomie at 8000 naira each. Supplier na Fictional Adaeze Foods. " +
    "Buyer na Fictional Demo Ventures Ltd. Delivery by next Friday.",
  Hausa:
    "Ina son ka shirya min invoice: 50 jaka shinkafa a 45000 naira kowanne, da 20 karton Indomie a 8000 naira kowanne. " +
    "Supplier shi ne Fictional Adaeze Foods. Buyer shi ne Fictional Demo Ventures Ltd. Delivery nan da Juma'a.",
  Yoruba:
    "Jowo se invoice fun mi: 50 apo iresi ni 45000 naira fun okan, ati 20 carton Indomie ni 8000 naira fun okan. " +
    "Supplier ni Fictional Adaeze Foods. Buyer ni Fictional Demo Ventures Ltd. Delivery laipẹ Ọjọ́ Ẹtì.",
};

export default function Home() {
  const [sourceText, setSourceText] = useState(EXAMPLES["English (Pidgin)"]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [approval, setApproval] = useState<string | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditRecord[]>([]);

  async function run() {
    setRunning(true);
    setError(null);
    setResult(null);
    setApproval(null);
    try {
      const res = await fetch("/api/work", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roleId: "procurement-assistant",
          intake: {
            who: { requester: "demo-user", organisation: "Fictional Demo Ventures Ltd (fictional)" },
            what: {
              workType: "procurement_invoice",
              requestedOutput: "invoice_draft",
              items: ["see sourceText"],
              sourceText,
            },
            why: { purpose: "monthly canteen restock procurement", criticality: "medium", severity: "low" },
            when: { urgency: "routine", dueAt: null },
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setResult(json as RunResult);
      const audit = await fetch("/api/audit").then((r) => r.json());
      setAuditTrail((audit.records as AuditRecord[]).slice(-6).reverse());
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setRunning(false);
    }
  }

  async function decide(decision: "approved" | "rejected") {
    if (!result) return;
    const res = await fetch("/api/approve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ requestId: result.requestId, decision, by: "demo-user" }),
    });
    if (res.ok) {
      setApproval(decision);
      const audit = await fetch("/api/audit").then((r) => r.json());
      setAuditTrail((audit.records as AuditRecord[]).slice(-6).reverse());
    }
  }

  const box: React.CSSProperties = { border: "1px solid #333", padding: 12, marginTop: 12, fontFamily: "monospace" };
  const btn: React.CSSProperties = { padding: "6px 14px", fontFamily: "monospace", cursor: "pointer" };

  return (
    <main style={{ maxWidth: 860, margin: "24px auto", padding: "0 16px", fontFamily: "monospace", background: "#0b0b0b", color: "#e8e8e8", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 20 }}>NEIOS — N-ATLAS Enterprise Integration OS</h1>
      <p style={{ color: "#888" }}>ROLE: Procurement Assistant &nbsp;|&nbsp; STATUS: {running ? "Running…" : "Ready"}</p>

      <div style={box}>
        <div style={{ color: "#888", marginBottom: 6 }}>WORK REQUEST</div>
        <div style={{ marginBottom: 6 }}>
          {Object.keys(EXAMPLES).map((lang) => (
            <button key={lang} onClick={() => setSourceText(EXAMPLES[lang])} style={{ ...btn, marginRight: 6, fontSize: 12 }}>
              {lang}
            </button>
          ))}
        </div>
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          rows={5}
          style={{ width: "100%", background: "#111", color: "#e8e8e8", border: "1px solid #333", fontFamily: "monospace", padding: 8 }}
        />
        <button onClick={run} disabled={running} style={{ ...btn, marginTop: 8 }}>
          {running ? "Running…" : "Run"}
        </button>
      </div>

      {error && <div style={{ ...box, borderColor: "#a33" }}>ERROR: {error}</div>}

      {result && (
        <>
          <div style={box}>
            <div style={{ color: "#888", marginBottom: 6 }}>EXECUTION TRACE</div>
            {result.trace.map((s, i) => (
              <div key={i} style={{ color: s.status === "fail" ? "#f66" : s.status === "warn" ? "#fc6" : s.status === "skipped" ? "#555" : "#6c6" }}>
                {ICON[s.status]} {s.stage.padEnd(9)} {s.detail}
              </div>
            ))}
          </div>

          {result.invoice && (
            <div style={box}>
              <div style={{ color: "#888", marginBottom: 6 }}>RESULT — structured invoice draft</div>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(result.invoice, null, 2)}</pre>
              {result.invoice.field_provenance ? (
                <>
                  <div style={{ color: "#888", margin: "8px 0 4px" }}>EVIDENCE / PROVENANCE</div>
                  {Object.entries(result.invoice.field_provenance as Record<string, string>).map(([k, v]) => (
                    <div key={k} style={{ color: v === "input_fact" ? "#6c6" : v === "system_derived" ? "#6cf" : "#fc6" }}>
                      {"  "}{k} → {v}
                    </div>
                  ))}
                </>
              ) : null}
              {result.approval === "required" && !approval && (
                <div style={{ marginTop: 10 }}>
                  <button onClick={() => decide("approved")} style={{ ...btn, marginRight: 8 }}>Approve</button>
                  <button onClick={() => decide("rejected")} style={btn}>Reject</button>
                </div>
              )}
              {approval && <div style={{ marginTop: 10, color: "#6c6" }}>Human decision recorded: {approval.toUpperCase()}</div>}
            </div>
          )}

          {result.issues.length > 0 && (
            <div style={{ ...box, borderColor: "#a83" }}>
              <div style={{ color: "#fc6", marginBottom: 6 }}>VALIDATION ISSUES</div>
              {result.issues.map((i, n) => <div key={n}> - {i.field}: {i.issue}</div>)}
            </div>
          )}
        </>
      )}

      {auditTrail.length > 0 && (
        <div style={box}>
          <div style={{ color: "#888", marginBottom: 6 }}>AUDIT LOG (last {auditTrail.length})</div>
          {auditTrail.map((r, i) => (
            <div key={i} style={{ fontSize: 12, color: "#aaa" }}>
              [{r.timestamp.slice(11, 19)}] {r.requestId.slice(0, 8)}… role={r.role} policy={r.policyResult} model={r.modelRequestId ?? "—"} validation={r.validationResult} approval={r.approvalResult} → <b>{r.finalState}</b>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
