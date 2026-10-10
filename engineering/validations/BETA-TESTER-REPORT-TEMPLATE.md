---
document_id: VAL-BT-003
title: Beta tester report template — NEIOS
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER
created: 2026-10-10
---

# Beta tester report — template

Copy this file to `BETA-TEST-RESULT-BT-01.md` / `-BT-02.md` and fill it during
or immediately after the session. Fields marked * are required for the PS1
"real-world validation" evidence.

## Header

```text
Tester ID:*              BT-0X (no real names in the repo)
Date & duration:*        
Profile:*                technical / operations / other
Access method:*          local file / screen-share / tunnel
Facilitator:             PROJECT OWNER
Artifact tested:*        prototype HTML / live app
```

## Section A — Task results *

For each task (T0–T8 in the session script):

```text
Task:         T?
Completed:    yes / partial / no / skipped
Time stuck:   none / <30s / 30-120s / >120s
What they said (verbatim, even if unflattering):
What they did that surprised you:
```

Repeat per task attempted. A "no" or "confused" is a finding, not a failure of
the session.

## Section B — Failures and friction *

| ID | What happened | Severity | Where |
|----|---------------|----------|-------|
| F1 |              | high / med / low | screen or step |

Severity guide: **high** = could not complete the core loop or misunderstood
what was approved; **med** = needed facilitator help but recovered;
**low** = cosmetic or wording.

## Section C — Quick ratings (1–5) *

```text
I understood what the product does without explanation:      1-5
The stages (compose → policy → draft → approve → audit) made sense: 1-5
I trusted that nothing shipped without my approval:          1-5
I would use this for real procurement/admin work:            1-5
The audit log made me more confident, not less:              1-5
```

## Section D — Free text *

```text
The most confusing moment was:
The moment it made sense was:
If this ran at my organisation, the first thing I'd want changed:
One thing I'd tell a colleague about it:
```

## Section E — Facilitator notes (owner fills, not tester)

```text
What I observed that the tester didn't say:
Quotes worth citing in the submission:
Follow-up fixes filed (issue/task ids):
```
