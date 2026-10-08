---
document_id: REQ-DIR
title: Requirements
status: ACTIVE
version: 0.1.0
created: 2026-10-08
---

# 02-requirements

Requirements live in `product/requirements/` (source of truth once extracted).

## Current state

Requirements currently exist in supplied documents:

- **Roster/marketplace:** FR-R01–FR-R07 — `supplied/VLTHR-HR-Complete-Product-Spec.md` §3.1
- **ARWOS governance:** FR-A01–FR-A10 (spec §3.2) and normative GW/POL/AUD/etc. requirements — `supplied/ARWOS v1.2.md` (138 requirements)
- **Integrations:** FR-I01–FR-I05 — spec §3.3
- **Non-functional:** spec §3.4

## Extraction plan

Phase 0 task: extract into `product/requirements/REQ-*.md` files using
`engineering/_templates/REQUIREMENT-TEMPLATE.md`, preserving source references and IDs.
Until extraction completes, the supplied spec sections above are the source of truth.
