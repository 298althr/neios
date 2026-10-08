---
document_id: OPS-DIR
title: Operations
status: ACTIVE
version: 0.1.0
created: 2026-10-08
---

# 09-operations

Runbooks, observability, on-call, incident procedures.

## Required operational capabilities (from supplied docs)

- Observability: Langfuse + OpenTelemetry (MPLOY §8 proposal — unvalidated)
- Kill switch runbook: halt all agents in a project <30s (FR-A08)
- Audit store monitoring: hash-chain validation, tamper alerts
- Approval queue monitoring: timeout rate target <5%
- Cost alerting: per-job caps, runaway detection (R-005)
- DR: cross-region backups; DR drill before public beta

Status: EMPTY — runbooks written during Phase 1 alongside first deployable services.
