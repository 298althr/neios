---
document_id: PRD-REQ-IDX
title: Requirements index
status: DRAFT
version: 0.1.0
created: 2026-10-08
source_of_truth: docs/01-context/supplied/ (until REQ extraction)
---

# Requirements index — VLTHR HR

Pre-extraction index of requirement IDs defined in supplied documents (E2).

## Workforce (marketplace) — spec §3.1

| ID | Title |
|---|---|
| FR-R01 | Agent roster discovery (browse 20+ profiles, <500ms) |
| FR-R02 | Agent hiring (shift 30–480 min, budget cap ≥10 credits) |
| FR-R03 | Brief submission + Manager clarifying Q&A (<2 min to task assignment) |
| FR-R04 | Real-time job workspace (<1s feed latency) |
| FR-R05 | Deliverables & downloads (pre-signed URLs, <10s) |
| FR-R06 | Billing & credits (1% accuracy, refunds <10 min, Paystack) |
| FR-R07 | Agent rating & feedback (1–5 stars, <3.0 avg disable rule) |

## ARWOS (governance) — spec §3.2 + normative ARWOS v1.2 (138 reqs, P0–P3)

| ID | Title |
|---|---|
| FR-A01 | Identity & fingerprint registry |
| FR-A02 | Skill verification (rotating tests, fingerprint-bound) |
| FR-A03 | Staffing with hard gates |
| FR-A04 | Tool gateway (0% bypass) |
| FR-A05 | Reversibility lanes 0–3 |
| FR-A06 | Approval engine (2h default timeout, auto-decline) |
| FR-A07 | Append-only hash-chained audit log (7-yr retention) |
| FR-A08 | Assignment lifecycle + kill switch (<30s) |
| FR-A09 | Policy enforcement (Rego/OPA, versioned) |
| FR-A10 | Tenant isolation (RLS everywhere) |

## Integrations — spec §3.3

| ID | Title |
|---|---|
| FR-I01 | GitHub (read L0, PRs L2, deploy L3) |
| FR-I02 | Postgres/DuckDB (SELECT L0, updates L2, schema L3) |
| FR-I03 | Email (read/draft L1, external send L2) |
| FR-I04 | Slack (read L0, post L1 allow-listed channels) |
| FR-I05 | MCP server allow-list per assignment |

## Non-functional — spec §3.4 / INDEX

- Uptime 99.5% · gateway p95 <200ms · approval notify <10s · tamper detection <1s
- Onboarding <1 day · 50 concurrent jobs · NDPA compliance

## Extraction tasks

- TASK (TODO): extract each FR into `REQ-*.md` with acceptance criteria.
- TASK (TODO): extract ARWOS v1.2 138 requirements + 26 open issues (OI-01–26)
  into per-phase requirement sets; OI answers must come from named owners.
