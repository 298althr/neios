---
document_id: REG-R01
title: Risk register
status: OPEN
created: 2026-10-08
---

# Risk register

Baseline risk set documented in `docs/01-context/supplied/VLTHR-HR-Risk-Assessment-And-Analysis.md`
(E2 documentary). IDs below preserve the source IDs. Individual records:
`engineering/risks/RISK-*.md` (created as ownership is assigned).

## Critical / high

| ID | Risk | Mitigation anchor | Status |
|---|---|---|---|
| R-001 | Prompt injection via email/untrusted content | Signed-task authority only (INB-02); guardrails; allow-lists | OPEN |
| R-002 | Credential leak in logs/context | Injection at call time; no creds in prompts | OPEN |
| R-003 | Gateway bypass | One-path rule (GW-01); no direct agent egress | OPEN |
| R-004 | Audit log tampering | Hash chain + Merkle; immutable store; <1s detection | OPEN |
| R-005 | Cost creep from agent loops | Hard per-job caps; kill switch; alerts | OPEN |
| R-006 | Approval gate bottleneck | Reviewer agents for lane 2; <5% timeout target | OPEN |
| R-007 | Fingerprint collision | Scoped fingerprints; re-verification on change | OPEN |
| R-008 | Tenant isolation failure | RLS everywhere; cross-tenant attack tests | OPEN |
| R-009 | Approval bottleneck (alt scenario) | See R-006 | OPEN |
| R-010 | Model update breaks fingerprint | Fingerprint re-verification flow (FR-A01) | OPEN |

## Operational

| ID | Risk | Status |
|---|---|---|
| R-020 | Database outage | OPEN |
| R-021 | OpenAI API outage | OPEN |
| R-022 | Payment processor down (Paystack) | OPEN |
| R-023 | Key personnel leave | OPEN |

## Strategic

| ID | Risk | Status |
|---|---|---|
| R-030 | OpenAI/Anthropic launch competing product | OPEN |
| R-031 | Regulatory backlash on AI agents | OPEN |
| R-032 | Customers prefer bespoke builds | OPEN |
| R-033 | Margin compression | OPEN |

## Project-level additions (not in source doc)

| ID | Risk | Owner | Status |
|---|---|---|---|
| R-100 | Legal: Devin resale/AUP unresolved (U-001/U-002) blocks Devin-backed roles | PROJECT OWNER + counsel | OPEN |
| R-101 | Scope ambiguity: N-ATLAS doc in repo — unknown whether it adds a deliverable (U-003) | PROJECT OWNER | OPEN |
