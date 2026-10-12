---
document_id: VAL-BT-003-BT02
title: Beta tester report BT-02 — NEIOS
status: COMPLETED
version: 0.1.0
created: 2026-10-12
---

# Beta tester report — BT-02

## Header

```text
Tester ID:*              BT-02
Date & duration:*        2026-10-12, ~15 min (live app) + setup
Profile:*                operations (billing-clerk persona), driven by an AI agent
Access method:*          local clone — pnpm install + next dev on the tester's machine
Facilitator:             PROJECT OWNER
Artifact tested:*        live app at http://localhost:3000
```

## Honesty caveats (read before citing as evidence)

1. **The tester is an AI agent (Devin), not an external human.** The session
   script (VAL-BT-002 §"What makes a session count") requires the tester be
   external — not the owner, not the agent. Treat this report as a full
   dress-rehearsal / instrumented smoke-run of the tester journey, **not** as
   the second external-tester datapoint for PS1.
2. **Model output is SIMULATED.** The real N-ATLaS endpoint (vast.ai via SSH
   tunnel, `127.0.0.1:18000/v1`) is not reachable from this machine. A minimal
   local OpenAI-compatible stub (`natlas-stub.mjs`, outside the repo, model id
   `SIMULATED-natlas-stub-q4km`) served `/models` + `/chat/completions` so the
   governed loop could run end-to-end. Everything the *pipeline* did (policy,
   validation, provenance, approval, audit) is real NEIOS behaviour; invoice
   extraction quality reflects the stub, not N-ATLaS.
3. All requestIds/audit rows below are real entries in
   `data/audit/audit-log.jsonl` on this machine.

## Quick fields (onboarding §4 / direction §15.1)

```text
Task given:             invoice a patient in your own words; narrate each step;
                        approve or reject the draft; find your run in the audit log
Input language used:    Nigerian Pidgin (primary), Hausa (probe)
Workflow completed?:    yes — submit → policy → draft → human decision → audit
Failures observed:      model-offline run (deliberate probe) failed honestly;
                        procurement schema flagged "supplier: missing" on a patient bill
Observed usefulness:    "the stage-by-stage trace and the approval gate are the
                        part a billing supervisor would actually care about"
Integration friction:   procurement vocabulary (supplier/buyer/delivery_terms)
                        does not fit hospital billing; jargon in trace details
Suggested improvement:  a billing role card + document type; authenticated
                        approver identity; tamper-evident audit store
```

## Section A — Task results *

**T0 — Open.** Completed. Page title "Work Intake" + subtitle "APSOS intake →
deterministic policy → N-ATLaS execution → validation → human approval →
audit" states the loop unprompted. As a billing person I could paraphrase the
product as "type a request, machine drafts the paperwork, a person signs it
off." What they said: "I get the conveyor belt, but 'APSOS' and 'N-ATLaS
execution' mean nothing to me." Time stuck: none.

**T1 — Request read.** Completed. The pre-filled box is an oil & gas
procurement request (butterfly valves, gaskets, ₦ figures). Readable, but the
worked example is procurement, not billing — a hospital tester must overwrite
it. Four language chips (English-Pidgin / Hausa / Yoruba / Igbo) are visible
and self-explanatory. Time stuck: <30s.

**T2 — Voice intake.** Skipped — marked honestly in the UI. The ASR shim needs
the NCAIR1 checkpoints on a local GPU; not provisioned on this machine. The
row states this plainly rather than pretending — good.

**T3 — Governed run.** Completed. Submitted in Pidgin:
"Abeg prepare invoice for patient Adaeze Okafor: consultation with Dr. Eze at
15000 naira, malaria RDT test 4500 naira, 2 packs of artemether-lumefantrine
at 3800 naira each, and one night observation bed fee 12000 naira. NHIS go
cover 60 percent."
Trace (request `0772f99c`):
REQUEST ok → CONTEXT ok → **POLICY warn: REVIEW — lane ≥ 2, human approval
required (this visibly ran BEFORE the model)** → MODEL ok (129 ms, stub) →
RESULT warn: 1 validation issue (`supplier: missing`) → EVIDENCE ok
(per-field provenance) → APPROVAL warn: pending human → AUDIT ok.
What they said: "I can see the check happened before the AI even ran — that
order is the whole point." Correct arithmetic: ₦15,000 + 4,500 + 7,600 +
12,000 = ₦39,100. Time stuck: none.

**T4 — Approve.** Completed. Approve/Reject buttons appear in place under the
draft; Approvals queue page also derives the pending item correctly (latest
record per requestId). Approved `0772f99c` as `billing-clerk-bt02`; audit event
written. The decision is recorded permanently — clear from the badge + audit
row. Time stuck: none.

**T5 — Language probe.** Completed. Hausa run `cb2ded4f` produced a valid
draft (RESULT ok) — but item descriptions degraded ("da magani" — the drug
name was lost; "kayan asibiti: consultation"). **Rejected it** — realistic
billing reason: a line that says "and medicine" without the drug name is not
billable. Note: extraction quality here is the stub's, not N-ATLaS's.
Time stuck: none.

**T6 — Failure honesty.** Completed (deliberate: stub stopped). Run
`e3831ef9`: MODEL = fail "network error: fetch failed"; RESULT/EVIDENCE/
APPROVAL = **skipped, not faked**; AUDIT still written; finalState = `failed`.
What they said: "When it's broken it says broken and still writes it down —
that's more convincing than a success." Time stuck: none.

**T7 — Audit trail.** Completed. `/audit` table shows all three of my runs by
requestId prefix plus the two decision events (`approved` 16:22:00,
`rejected` 16:22:09) interleaved with the repo's existing history. "Append-only"
is credible *by convention* — the store is a plain JSONL file anyone with file
access can edit; no hash-chaining or signing. Fine for a demo; not yet
tamper-evident. Time stuck: none.

**T8 — Trust probe.** See Section D.

## Section B — Failures and friction *

| ID | What happened | Severity | Where |
|----|---------------|----------|-------|
| F1 | Patient billing doesn't fit the invoice schema — every real bill flags `supplier: missing`; "buyer" = patient; `delivery_terms`/`missing_fields` vocabulary is procurement. A clerk must mentally remap. | med | RESULT/issues, draft card |
| F2 | Provenance key collision — `fieldProvenance` flattens supplier+buyer into one map, so `supplier.name` and `buyer.name` both record as `name`. Provenance cannot say *whose* name was an input_fact. | med | `packages/governance/src/invoice.ts` fieldProvenance |
| F3 | Approver identity is self-declared — `/api/approve` takes `by` from the request body; UI hardcodes "demo-approver"/"approver-console". Anyone who can reach the endpoint can approve. No auth anywhere. | high (for real deployment; did not block session) | approve route / approvals page |
| F4 | "Append-only" audit is a mutable local JSONL file — no hash-chain, signature, or WORM store. | med | audit store |
| F5 | Jargon leaks to ops users: "APSOS", "lane 2", "openai-compat:http://…" in trace details. | low | trace/CONTEXT/MODEL details |
| F6 | Prefilled example is oil & gas procurement, not the tester's domain; must be overwritten. | low | intake textarea |
| F7 | Fresh-clone setup friction on Windows: `corepack enable` fails (EPERM on Program Files); needed `npx pnpm@9.15.0`. App then installed + ran cleanly. No model endpoint bundled — README documents the tunnel, but a cold clone shows MODEL fail until one exists. | med | setup / quickstart claim |

## Section C — Quick ratings (1–5) *

```text
I understood what the product does without explanation:      3
The stages (compose → policy → draft → approve → audit) made sense: 5
I trusted that nothing shipped without my approval:          4
I would use this for real procurement/admin work:            2
The audit log made me more confident, not less:              4
```

## Section D — Free text *

```text
The most confusing moment was:
  Seeing "supplier: missing" flagged on a patient bill — for a second I
  thought I'd phrased the request wrong, then realised the document type is
  procurement-shaped and a hospital bill simply has no supplier.

The moment it made sense was:
  POLICY showing "REVIEW — human approval required" BEFORE the model ran, and
  the offline run marking every downstream stage "skipped" instead of
  pretending. The system visibly cannot sneak output past the gate.

If this ran at my organisation, the first thing I'd want changed:
  A billing document type / role card (patient name + hospital ID, NHIS/HMO
  coverage split, service codes, no supplier/delivery fields), and a real
  approver sign-in — right now anyone can approve as anyone. The audit file
  should also be tamper-evident before finance would accept it.

One thing I'd tell a colleague about it:
  "It drafts the invoice but won't finalise it — a person approves, and
  there's a written record of every step including when it fails."
```

**Would you let this draft invoices at your hospital?** For drafting under
human review — the shape is right: policy before model, validation + repair
named in the open, nothing final without a decision, failure recorded as
failure. Not yet for production: F1 (schema), F3 (approver auth) and F4
(tamper-evidence) would each need closing first.

## Section E — Facilitator notes (owner fills, not tester)

```text
What I observed that the tester didn't say:
Quotes worth citing in the submission:
Follow-up fixes filed (issue/task ids):
```

## Evidence

- Audit rows: `0772f99c` (Pidgin run → approved), `cb2ded4f` (Hausa run →
  rejected), `e3831ef9` (model-offline → failed) in
  `data/audit/audit-log.jsonl`, timestamps 2026-10-12T16:21–16:22 UTC.
- Stub used: `../natlas-stub.mjs` (simulated model — see caveats).
- Pages exercised: `/` (Intake), `/approvals`, `/audit`; APIs `/api/work`,
  `/api/approve`, `/api/audit`.
