---
document_id: REG-U01
title: Uncertainty register
status: OPEN
created: 2026-10-08
---

# Uncertainty register

What is NOT known. Entries are resolved via `engineering/questions/` or validated
via `engineering/validations/`. Do not fill these gaps by inference.

| ID | Unknown | Blocks | Owner | Status |
|---|---|---|---|---|
| U-001 | Devin access model (A: BYO key / B: Cognition partner agreement / C: OpenAI-only) | Billing design, engineering-role staffing, legal exposure | PROJECT OWNER + counsel | OPEN — see Q-0001 |
| U-002 | Cognition AUP resale terms — written confirmation | Marketplace legality of Devin-backed roles | PROJECT OWNER + counsel | OPEN — see Q-0002 |
| U-003 | N-ATLAS relationship: is N-ATLAS STRATEGY.md in scope for this repo or a separate deliverable? | Scope, schedule, possibly product type | PROJECT OWNER | OPEN — see Q-0003 |
| U-004 | Cloud provider: Fly.io vs DigitalOcean | Deployment manifests, DR design | DEVOPS/SRE | OPEN |
| U-005 | Durable job engine: Temporal vs Arq+Redis for MVP | Job queue architecture | TECHNICAL LEAD | OPEN |
| U-006 | Billing stack: Lago vs OpenMeter vs custom credit ledger | Billing implementation | TECHNICAL LEAD | OPEN |
| U-007 | Sandbox for non-Devin execution: E2B vs Docker+gVisor | Agent runtime security | TECHNICAL LEAD | OPEN |
| U-008 | Team assignments (spec plans 6.3 FTE; roles unstaffed) | All ownership fields | PROJECT OWNER | OPEN |
| U-009 | Budget approval status ($60–100K seed) | Timeline commitments | PROJECT OWNER | OPEN |
| U-010 | Confirmed OpenAI/Devin pricing at build time (docs flag prices change) | Unit economics, credit pricing | PRODUCT OWNER | OPEN |
| U-011 | ARWOS v1.2 open issues OI-01–OI-26 — each must be answered by named owner before its gating phase | Phase 0–3 work per ARWOS v1.2 §23 | Named per-issue owners | OPEN — extraction task needed |
| U-012 | Observability stack final choice (Langfuse+OTel proposed in MPLOY) | Ops readiness | DEVOPS/SRE | OPEN |
