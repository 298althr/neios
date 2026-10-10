---
document_id: TST-DIR
title: Testing
status: ACTIVE
version: 0.2.0
created: 2026-10-08
updated: 2026-10-10
---

# 08-testing

## What is actually exercised

| Layer | How | Status |
|---|---|---|
| Type safety | `corepack pnpm -r typecheck` — all 4 TS projects | PASS 2026-10-10 |
| Live pipeline | `scripts/neios-run.ts` (+ `--blocked`, `--missing`) | Verified |
| Golden benchmark | `benchmarks/eval.ts` → 10 fixtures vs live N-ATLaS | **10/10 pass, 93/100** — `engineering/metrics/` |
| ASR service | `/health` + per-language transcription through `/v1/audio/transcriptions` | en/ha/yo/ig verified 2026-10-10 |
| Browser smoke | Playwright screenshot pass over Intake/Approvals/Audit | PASS |
| Failure honesty | endpoint-down run → `final: failed`, audit still appended | Verified |
| Video QA | per-chapter frame extraction + ffprobe | `VIDEO-RECORDINg/.../qa-log.md` |

## Known testing gaps (honest)

- No unit-test suite yet (typecheck + live harness currently carry the burden).
- `pnpm lint` broken repo-wide — `next lint` deprecated under Next 15, no
  ESLint config exists; pre-existing, not a regression. Fix = add flat config.
- Beta sessions (2 external testers) scheduled but not yet run — the only
  blocking validation item for PS1.
