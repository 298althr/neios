---
document_id: CTX-000
title: Context directory
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER (placeholder)
created: 2026-10-08
---

# 01-context — Reality capture

Layer 0 evidence. Everything the project actually started with.

## Supplied documents (`supplied/`)

Preserved unmodified. Reference them; do not edit them.

| File | Contents | Evidence level |
|---|---|---|
| `VLTHR-HR-Complete-Product-Spec.md` | Main product spec: vision, Roster+ARWOS architecture, FR-R01–FR-I05, NFRs, phases, risks, financials | E2 |
| `VLTHR-HR-Risk-Assessment-And-Analysis.md` | 10 critical risks (R-001–R-010), operational (R-020–R-023), strategic (R-030–R-033), SWOT, edge cases, P&L | E2 |
| `VLTHR-HR-INDEX.md` | Navigation index, metrics, checklists, phase timeline | E2 |
| `ARWOS v1.2.md` | **Normative** ARWOS spec: 138 requirements (P0–P3), 26 open issues (OI-nn) gating adoption | E2, normative |
| `What Is Arwos.md` | ARWOS explainer | E2 |
| `MPLOY.txt` | Earlier PRD v0.1 (Hire-an-Agent): role cards, Devin API options, MVP scope, open-source stack | E2, partly superseded by spec |
| `N-ATLAS STRATEGY.md` | N-ATLAS challenge MVP technical spec — **relationship to VLTHR HR unconfirmed** (see engineering/questions/Q-0003) | E2 |

## Documents

- `PROJECT-CONTEXT.md` — consolidated context summary

## Conflicts / notes

- MPLOY.txt predates the main spec (PRD v0.1). Where they differ (e.g., product name,
  pricing detail), the spec is newer — confirmed by naming decision ADR-0001.
- Product name is **VLTHR HR**; "Roster" is the marketplace layer name, not the product.
