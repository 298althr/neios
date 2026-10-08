---
document_id: SEC-001
title: Security model
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
confidence: MEDIUM — derived from spec, needs security review
---

# Security model — future-extension layer (formerly "VLTHR HR")

> **Not current build scope.** NEIOS's security/trust rules are at
> `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §24. This document
> is the fuller future-layer reference that NEIOS's principles are drawn from.

Security is a product feature (ARWOS). Source: supplied spec §2, FR-A01–A10, ARWOS v1.2.

## Core principles (normative, from ARWOS v1.2 §2)

1. **Permissions enforce, prompts inform.** No control depends on agent context instructions (POL-04).
2. **One path.** Every agent action to every integration passes through the tool gateway (GW-01).
3. **Content never grants authority.** Authority arrives only as signed platform tasks (INB-02).
4. **The record is append-only and independent.** Audit store separate from operational DB (AUD-01).

## Control summary

- Tenant isolation: Postgres RLS on all tables; no shared memory/index/cache/secrets across tenants.
- Secrets: Infisical; injected at tool-call time; never in prompts/logs.
- Approvals: lanes 0–3 by reversibility; lane 2+ requires recorded approval before execution.
- Audit: append-only, hash-chained; tamper detection target <1s; 7-year retention.
- Policy: OPA/Rego, versioned; changes trigger re-verification of affected agents.

## Open items

- Full threat model: `threat-model.md` (Phase 0 task)
- ARWOS v1.2 open issues OI-01–OI-26 must be answered by named owners.
