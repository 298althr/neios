---
document_id: DSN-DIR
title: Design
status: ACTIVE
version: 0.2.0
created: 2026-10-08
updated: 2026-10-10
---

# 05-design

## What actually exists

- **App design system** — `apps/vlthr-hr-web/src/app/globals.css`: cream/white
  surfaces, blue primary accent, status colours (green pass / red block /
  amber pending), monospace data treatments. Ported 2026-10-10 from the
  decluttered prototype (`NEIOS-PROJECT-REVIEW/neios-workflow-prototype.html`)
  after owner feedback on accessibility fatigue.
- **Views** — Intake (voice row + typed request + language examples + run),
  Approvals queue (pending_approval rows, Approve/Reject), Audit explorer.
  Single nav — no duplicate tab rows.
- **Cursor overlay** — `CursorOverlay.tsx`, activated by `?cursor=1`, used only
  for video capture (visible pointer + click ripples; Playwright records no OS
  cursor). Inert for real users.
- **Review artefacts** — `NEIOS-PROJECT-REVIEW/neios-prd-review.html`
  (19-slide PRD deck) and the workflow prototype above are standalone HTML,
  not part of the shipped app.

## Deliberately not built

Role Cards UX, billing/credit flows, tenant switching — out of scope for the
PS1 slice (see ADR-0003).
