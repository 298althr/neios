---
document_id: VAL-BT-002
title: Beta tester session script — NEIOS workflow prototype
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER (runs sessions); Agent authored script
created: 2026-10-10
---

# Beta tester session script — prototype build

Pairs with `BETA-TESTER-ONBOARDING.md` (recruiting) and
`BETA-TESTER-REPORT-TEMPLATE.md` (what the tester fills in).

**Target artifact:** `NEIOS-PROJECT-REVIEW/neios-workflow-prototype.html` — a
single HTML file, no install, no internet needed after the font CDN caches.
Send the file itself, or screen-share.

**Session length:** ~15–20 min. Record the screen if the tester consents.

## Session rules (for the facilitator)

- Say as little as possible. This tests comprehension, not our explanation.
- Do not correct them mid-task. Note where they get stuck; that is the finding.
- If they ask "is the AI real?" — answer honestly: "the model calls are
  simulated in this prototype; the real app runs them live. We're testing the
  workflow, not the model today."

## Task script

| # | Task | Say this | Watch for |
|---|------|----------|-----------|
| T0 | Open | "Open this HTML file and tell me what you think this product is." | Can they state the value prop unprompted? |
| T1 | Dashboard read | "What do these three cards tell you?" | Do stage pills and "In checks / Dispatch & audit" read correctly? |
| T2 | Approve a pending request | "Open 'Fertiliser co-op order' and finish its journey — it needs a human decision." | Do they find Human approval? Do they understand the decision is permanent? Do they notice the approved-value floor? |
| T3 | Create a request | "Create a new request the way you'd describe a real purchase at your work. Any domain, any language offered." | Do domain/language selects make sense? Manual vs AI creation mode — do they understand the difference? |
| T4 | Policy + draft | "Run the checks on your request." | Do they run Policy check first, then N-ATLaS draft? Do they read the repair count and latency? |
| T5 | Negative test | "Now change the work type to `wire_transfer` and run policy again." | Do they understand the request was blocked BEFORE any model call? Note their reaction — this is the governance moment. |
| T6 | Failure honesty | "Pick 'Model offline' in the Scenario menu (top right) and run the draft again." | Do they see the failure is shown, not hidden? |
| T7 | Audit trail | "Open Audit log and find everything you just did." | Do they believe the trail? "Entries are never edited or deleted" — credible to them? |
| T8 | Trust probe | "Would you let this draft an invoice at your organisation? What would need to be true first?" | Free text — the money quote for the submission. |

## What makes a session count (per direction doc §15.1)

- At least one real attempt at T3–T7 in the tester's own words.
- Failures captured verbatim, not just successes.
- The report template filled within 1 hour of the session, not from memory.
- Tester is external — not the owner, not the agent.

## If they finish early

Bonus probes (optional): create a second version after approval (v2 flow),
retire a request, switch request language to Hausa/Yoruba/Igbo and describe what
they'd expect the real model to do with it.
