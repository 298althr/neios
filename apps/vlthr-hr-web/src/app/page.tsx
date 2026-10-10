"use client";

import { useState } from "react";
import Link from "next/link";
import VoiceIntake from "./VoiceIntake";

interface TraceStage { stage: string; status: "ok" | "warn" | "fail" | "skipped"; detail: string }
interface AuditRecord {
  timestamp: string; requestId: string; requester: string; role: string;
  policyResult: string; provider: string; modelRequestId: string | null;
  outputHash: string | null; validationResult: string; approvalResult: string; finalState: string;
}
interface InvoiceItem { description: string; quantity: number; unit_price: number; line_total: number }
interface Invoice {
  supplier: Record<string, unknown>; buyer: Record<string, unknown>; currency: string;
  items: InvoiceItem[]; subtotal: number; tax: number; total: number;
  delivery_terms: string | null; missing_fields: string[]; field_provenance?: Record<string, string>;
}
interface RunResult {
  requestId: string; trace: TraceStage[];
  policy: { decision: string; lane: number; reasons: string[] };
  invoice?: Invoice; issues: { field: string; issue: string }[]; repairs: string[];
  approval: string; auditRecord: AuditRecord;
}

const ICON = { ok: "✓", warn: "!", fail: "✗", skipped: "·" } as const;
const fmt = (n: number) => n?.toLocaleString("en-NG");

const EXAMPLES: Record<string, string> = {
  "English (Pidgin)":
    "Oga prepare invoice for flowstation resupply: 12 butterfly valves DN150 at 185000 naira each, " +
    "40 spiral-wound gasket kits at 12500 naira each, and 50 coverall PPE sets at 18000 naira each. " +
    "Supplier na Fictional NigerDelta Industrial Supplies. Buyer na Fictional Crestfield Energy Ltd. " +
    "Deliver to Warri depot by month end.",
  Hausa:
    "Ina so ka shirya min invoice na kayan flowstation: butterfly valves DN150 guda 12 a naira 185000 kowanne, " +
    "gasket kits guda 40 a naira 12500 kowanne, da coverall PPE guda 50 a naira 18000 kowanne. " +
    "Supplier: Fictional NigerDelta Industrial Supplies. Buyer: Fictional Crestfield Energy Ltd.",
  Yoruba:
    "Jowo se invoice fun ohun elo flowstation: butterfly valves DN150 mejila ni 185000 naira fun okan, " +
    "gasket kits merinlelogun ni 12500 naira fun okan, ati coverall PPE aadota ni 18000 naira fun okan. " +
    "Supplier ni Fictional NigerDelta Industrial Supplies. Buyer ni Fictional Crestfield Energy Ltd.",
  Igbo:
    "Biko mee invoice maka ihe flowstation: butterfly valves DN150 iri na abụọ na 185000 naira otu otu, " +
    "gasket kits iri anọ na 12500 naira otu otu, na coverall PPE iri ise na 18000 naira otu otu. " +
    "Supplier bụ Fictional NigerDelta Industrial Supplies. Buyer bụ Fictional Crestfield Energy Ltd.",
};

export default function IntakePage() {
  const [sourceText, setSourceText] = useState(EXAMPLES["English (Pidgin)"]);
  const [selected, setSelected] = useState("English (Pidgin)");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState<string | null>(null);

  async function run() {
    setRunning(true);
    setError(null);
    setResult(null);
    setDecision(null);
    try {
      const res = await fetch("/api/work", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roleId: "procurement-assistant",
          intake: {
            who: { requester: "field-ops-01", organisation: "Fictional Crestfield Energy Ltd (fictional)" },
            what: {
              workType: "procurement_invoice",
              requestedOutput: "invoice_draft",
              items: ["see sourceText"],
              sourceText,
            },
            why: { purpose: "flowstation consumables restock", criticality: "medium", severity: "low" },
            when: { urgency: "routine", dueAt: null },
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setResult(json as RunResult);
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setRunning(false);
    }
  }

  async function decide(d: "approved" | "rejected") {
    if (!result) return;
    const res = await fetch("/api/approve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ requestId: result.requestId, decision: d, by: "demo-approver" }),
    });
    if (res.ok) setDecision(d);
  }

  const inv = result?.invoice;
  const state = decision ?? (result ? result.auditRecord.finalState : null);

  return (
    <>
      <h1 className="page-title">Work Intake</h1>
      <p className="page-sub">
        APSOS intake → deterministic policy → N-ATLaS execution → validation → human approval → audit
      </p>

      <div className="card">
        <div className="card-label">Work Request — role: Energy Procurement Officer</div>
        <VoiceIntake onTranscript={(text) => { setSourceText(text); setSelected(""); }} />
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {Object.keys(EXAMPLES).map((lang) => (
            <button
              key={lang}
              className={`chip${selected === lang ? " selected" : ""}`}
              onClick={() => { setSelected(lang); setSourceText(EXAMPLES[lang]); }}
            >
              {lang}
            </button>
          ))}
        </div>
        <textarea
          className="intake"
          rows={5}
          value={sourceText}
          onChange={(e) => { setSourceText(e.target.value); setSelected(""); }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
          <button className="btn btn-primary" onClick={run} disabled={running}>
            {running ? "Running…" : "Run governed pipeline"}
          </button>
          {state && <span className={`badge ${state === "blocked" || state === "failed" ? "b-fail" : state === "pending_approval" ? "b-warn" : "b-ok"}`}>{state}</span>}
        </div>
      </div>

      {error && <div className="card" style={{ borderColor: "var(--fail)" }}><span className="st-fail">ERROR: {error}</span></div>}

      {result && (
        <>
          <div className="card">
            <div className="card-label">Execution Trace — request {result.requestId.slice(0, 8)}…</div>
            <div className="trace">
              {result.trace.map((s, i) => (
                <div key={i} className={`trace-row st-${s.status}`}>
                  <span className="trace-ico">{ICON[s.status]}</span>
                  <span className="trace-name">{s.stage}</span>
                  <span className="trace-detail">{s.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {inv && (
            <div className="card">
              <div className="card-label">Structured Output — invoice draft</div>
              <div className="kv" style={{ marginBottom: 12 }}>
                supplier <b>{String(inv.supplier.name ?? "—")}</b> · buyer <b>{String(inv.buyer.name ?? "—")}</b> ·
                currency <b>{inv.currency}</b> · delivery <b>{inv.delivery_terms ?? "—"}</b>
              </div>
              <table className="data-table">
                <thead>
                  <tr><th>Item</th><th className="num">Qty</th><th className="num">Unit price</th><th className="num">Line total</th></tr>
                </thead>
                <tbody>
                  {inv.items.map((it, i) => (
                    <tr key={i}>
                      <td style={{ whiteSpace: "normal" }}>{it.description}</td>
                      <td className="num">{fmt(it.quantity)}</td>
                      <td className="num">{fmt(it.unit_price)}</td>
                      <td className="num">{fmt(it.line_total)}</td>
                    </tr>
                  ))}
                  <tr><td /><td /><td className="num dim">subtotal</td><td className="num">{fmt(inv.subtotal)}</td></tr>
                  <tr><td /><td /><td className="num dim">tax</td><td className="num">{fmt(inv.tax ?? 0)}</td></tr>
                  <tr className="total-row"><td /><td /><td className="num">TOTAL</td><td className="num">{inv.currency} {fmt(inv.total)}</td></tr>
                </tbody>
              </table>

              {inv.missing_fields?.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <span className="kv">missing fields: </span>
                  {inv.missing_fields.map((f) => <span key={f} className="badge b-warn" style={{ marginRight: 6 }}>{f}</span>)}
                </div>
              )}

              {result.repairs?.length > 0 && (
                <div style={{ marginTop: 10 }} className="kv">
                  deterministic repairs: <b>{result.repairs.join(", ")}</b>
                </div>
              )}

              {inv.field_provenance && (
                <div style={{ marginTop: 14 }}>
                  <div className="card-label">Field Provenance</div>
                  <div className="prov">
                    {Object.entries(inv.field_provenance).map(([k, v]) => (
                      <span key={k} className={`prov-item p-${v}`}>{k} → {v}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.approval === "required" && !decision && (
                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <button className="btn btn-ok" onClick={() => decide("approved")}>Approve draft</button>
                  <button className="btn btn-danger" onClick={() => decide("rejected")}>Reject</button>
                  <Link href="/approvals" className="btn" style={{ textDecoration: "none" }}>Open approvals queue</Link>
                </div>
              )}
              {decision && <div style={{ marginTop: 16 }} className={`badge b-${decision === "approved" ? "ok" : "fail"}`}>human decision: {decision.toUpperCase()}</div>}
            </div>
          )}

          {result.issues.length > 0 && (
            <div className="card" style={{ borderColor: "var(--warn)" }}>
              <div className="card-label" style={{ color: "var(--warn)" }}>Validation Issues</div>
              <div className="trace">
                {result.issues.map((i, n) => <div key={n} className="trace-row st-warn"><span className="trace-ico">!</span><span className="trace-detail">{i.field}: {i.issue}</span></div>)}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
