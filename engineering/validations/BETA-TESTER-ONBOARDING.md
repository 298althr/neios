---
document_id: VAL-BT-001
title: Beta tester onboarding workflow (PS1 validation requirement)
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER
created: 2026-10-08
---

# Beta tester onboarding — NEIOS / NAIC 2026 (PS1 validation requirement)

PS1 requires **2+ external beta testers**, documented. Direction doc §15.1 says
prefer one technical/developer tester and one operations/business-workflow
tester. Scheduled Day 3 (2026-10-10) — see `engineering/ROADMAP-NAIC-2026.md`
TASK-0025/TASK-0026.

## 1. Who to recruit

| Tester | Profile | Why |
|---|---|---|
| Tester 1 — Technical | A developer (any stack) who has never seen NEIOS | Tests the "3 commands to run" quickstart and the developer API/SDK example — proxy for a judge who clones the repo |
| Tester 2 — Operations/business | Someone who runs or works in an SME, procurement, admin, or ops role (does not need to code) | Tests the actual worked example (procurement request → invoice draft) for real usefulness, not just technical correctness |

Do not use yourself as a tester — must be external, per the official rule.

## 2. Access method (we're not deploying live — local-only + video posture)

Three options, pick per tester based on their setup:

1. **They run it locally** (best test of the README/quickstart quality, and the
   most defensible evidence — it directly proves the "60-second local launch"
   claim). Send them the repo + `.env.example` + quickstart steps once written
   (TASK-0034).
2. **Screen-share, they drive** (you share your screen via Zoom/Discord/Meet,
   give them remote control or verbally guide their own actions on your machine).
   Use if they can't install Node/pnpm themselves in time.
3. **Temporary tunnel** (e.g. `ngrok http 3000` or Cloudflare Tunnel) pointed at
   your local dev server, valid only for their test window, torn down
   immediately after. Use if they want to test from their own device without a
   local install, and option 1 isn't practical.

Pick per-tester now so you know which to arrange.

## 3. Pre-session: what to send them

A short, neutral briefing — do not over-explain or bias their reaction:

> "I built a tool that takes a procurement/purchase request (you can type or
> describe it, including in Pidgin/Yoruba/Hausa/Igbo if you want) and turns it
> into a structured invoice draft, with a visible approval step before anything
> is finalized. Can you try submitting one real-ish request and tell me what
> happens, what's confusing, and whether you'd trust the output? Takes about
> 10–15 minutes. [access method + link/instructions]"

Do not tell them what "should" happen — you want their unbiased reaction,
especially to **failures** (per direction doc §15.1: capture failures, not just
successes).

## 4. During the session — what to capture

Use `engineering/_templates/VALIDATION-TEMPLATE.md` structure, but this specific
feedback form (fields required by the direction doc §15.1):

```text
Tester ID:            (e.g. BT-01, BT-02 — do not record real names in the repo)
Date:
Task given:
Input language used:
Workflow completed?:  yes / no / partial
Failures observed:
Observed usefulness:  (their own words)
Integration friction: (what was confusing, slow, or broke)
Suggested improvement:
```

Record this live or immediately after — do not reconstruct from memory later.

## 5. After the session

1. Save the completed form as
   `engineering/validations/BETA-TEST-RESULT-BT-01.md` and `...-BT-02.md`
   (copy the fields above into the VALIDATION-TEMPLATE structure).
2. Fix only **high-severity** failures before the freeze day (direction doc
   §20 Day 3: "Fix only high-severity failures").
3. Reference both results in the final submission's "Real-World Validation"
   component (TASK-0041).

## 6. Timing

Both sessions should happen Day 3 (Oct 10), **before** freeze day (Oct 11) so
there's time to fix anything high-severity they find. If Day 3 is tight,
Tester 1 (technical) can slip to early Day 4 at the latest — Tester 2 should
not, since their feedback is the main "impact" evidence for judges.
