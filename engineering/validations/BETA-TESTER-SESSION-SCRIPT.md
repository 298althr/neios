---
document_id: VAL-BT-002
title: Beta tester session script — NEIOS ported app
status: ACTIVE
version: 0.2.0
owner: PROJECT OWNER (runs sessions); Agent authored script
created: 2026-10-10
---

# Beta tester session script — ported app build

Pairs with `BETA-TESTER-ONBOARDING.md` (recruiting) and
`BETA-TESTER-REPORT-TEMPLATE.md` (what the tester fills in).

**Target artifact:** the real app at `http://localhost:3000` (Intake /
Approvals / Audit). Run on the owner's machine with the dev server up; the
tester drives in person or via screen-share + remote control. If the live
model is unavailable that day, the session still works — failures are honest
findings, and the model-offline path is itself a test case (T6).

**Fallback:** `NEIOS-PROJECT-REVIEW/neios-workflow-prototype.html` (simulated,
single file) if the live environment can't be reached — mark the report
"SIMULATION" in that case.

**Session length:** ~15–20 min. Record the screen if the tester consents.

## Session rules (for the facilitator)

- Say as little as possible. This tests comprehension, not our explanation.
- Do not correct them mid-task. Note where they get stuck; that is the finding.
- If they ask "is the AI real?" — answer honestly: model calls are live against
  the real N-ATLaS deployment when the pipeline shows real output; the voice
  row uses the official N-ATLAS ASR checkpoints running on this machine.
  Simulated paths are labeled where they exist.

## Task script

| # | Task | Say this | Watch for |
|---|------|----------|-----------|
| T0 | Open | "Open this page and tell me what you think this product does." | Can they state the value prop unprompted? Does the pipeline line under the title make sense? |
| T1 | Request read | "Read the request in the box. What's being asked for?" | Do the oil & gas request and the ₦ figures read naturally? Do they notice the four language chips? |
| T2 | Voice intake | "Try the voice option — pick a language and read any purchase request aloud, or upload a clip if you have one." | Does the transcript land in the box? Do they understand they should EDIT before running? (If ASR is offline that day, skip and mark it — the row says so honestly.) |
| T3 | Governed run | "Run the pipeline and tell me what happened, step by step." | Do they follow the trace stages? Do they notice policy runs BEFORE the model? Repairs named, not hidden? |
| T4 | Approve | "The draft needs a human decision. Give it one." | Do they find Approve/Reject — in-place or via the Approvals queue? Do they understand the decision is recorded permanently? |
| T5 | Language probe | "Switch to Hausa, Yoruba or Igbo and run it again." | Multilingual confidence; do they trust the draft in a language they may not read? |
| T6 | Failure honesty | "Ask me to break something — I'll show you what happens when the model can't be reached." (Facilitator: stop the tunnel/service for this task, then restore.) | Do they see the failure is shown in the trace, downstream steps skipped, and the audit record still written? |
| T7 | Audit trail | "Open Audit and find everything you just did." | Do they find their runs incl. the approval? "Entries are never edited or deleted" — credible to them? |
| T8 | Trust probe | "Would you let this draft an invoice at your organisation? What would need to be true first?" | Free text — the money quote for the submission. |

## What makes a session count (per direction doc §15.1)

- At least one real attempt at T3–T7 in the tester's own words.
- Failures captured verbatim, not just successes.
- The report template filled within 1 hour of the session, not from memory.
- Tester is external — not the owner, not the agent.

## If they finish early

Bonus probes (optional): reject a draft and explain why; find a blocked
request in the audit log; ask what they'd want the product to do next
(dispatch, ERP export, WhatsApp channel).
