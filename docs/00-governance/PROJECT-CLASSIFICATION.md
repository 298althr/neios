---
document_id: GOV-001
title: Project classification — future-extension layer (formerly "VLTHR HR")
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER (placeholder)
created: 2026-10-08
confidence: HIGH
evidence_level: E2 (documentary — supplied spec)
scope_note: This classification (C3/Level 2) applies to the future-extension
  layer's full scope. NEIOS, the current NAIC 2026 build, is intentionally much
  smaller (modular monolith, no multi-tenant RLS, no hash-chained audit store) —
  do not apply C3/L2 governance weight to NEIOS's 4-day build. A lighter NEIOS-
  specific classification should be recorded if/when this distinction causes
  friction (not yet done — tracked informally via the direction doc's own P0-P3
  task prioritisation instead of a formal reclassification).
---

# Project classification — future-extension layer (formerly "VLTHR HR")

> **Scope note:** this is the classification for the fuller future-extension
> product, not the current NEIOS build (see scope_note above and
> `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`).

Classification per the template-generation skill's classification engine.
Sources: `docs/01-context/supplied/` (E2 documentary evidence).

| Dimension | Value | Basis |
|---|---|---|
| Product type | SaaS + marketplace + AI platform + governance/control plane | Spec §1–2 |
| Business model | Credits (pay-per-use) + tiered SaaS + internal ops | Spec §1.4 |
| Delivery model | Small team (6.3 FTE per spec §10), cloud-hosted | Spec §10, INDEX |
| Data sensitivity | Confidential + personal data (NDPA scope) + financial (payments) | Spec, INDEX security checklist |
| **Consequence level** | **Level 2 — High** | Tenant isolation, immutable audit, payments, enterprise data |
| **Complexity** | **C3 — Complex** | Multi-service platform: marketplace + control plane + agent runtime + billing + integrations |
| Deployment | Kubernetes on Fly.io or DigitalOcean (TBD) | INDEX, engineer notes |
| Regulatory | NDPA (Nigeria Data Protection Act 2023); counsel review required | MPLOY §7, INDEX |

## Implied template depth (C3 / Level 2)

Full requirements, architecture, ADRs, security docs, threat model, risk register,
change control, release governance, runbooks, DR, reproducibility — all required.
No C4 formal controls (not safety-critical / regulated-infrastructure) unless scope
changes.

## Rescoring triggers

- N-ATLAS challenge track added → verify whether product type/regulatory change.
- Devin access model decision (Q-0001) → may change delivery model and vendor risk.
- Enterprise/regulated customers onboarded → reassess consequence level.
