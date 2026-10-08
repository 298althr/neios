---
document_id: REG-X01
title: Dependency register
status: OPEN
created: 2026-10-08
---

# Dependency register

External systems/services the platform depends on. Status PROPOSED until validated
in Phase 0 (versions pinned only after evaluation).

| Dependency | Purpose | Source | Risk notes | Status |
|---|---|---|---|---|
| OpenAI API (Agents SDK) | Manager + light employee runtime | Spec, MPLOY | R-021 outage; pricing drift | PROPOSED |
| LiteLLM proxy | Multi-model routing, per-tenant budgets | Spec, MPLOY | — | PROPOSED |
| OpenHands | Devin-alternative agent runtime | INDEX | Fitness unproven (ASM-007) | PROPOSED |
| Devin API v3 | Heavy engineering employee runtime | MPLOY | **Blocked on U-001/U-002 (resale/AUP)** | BLOCKED |
| Postgres (+RLS, pgvector) | Operational DB, registry, vectors | Spec | R-020 | PROPOSED |
| Postgres (separate instance) | Immutable audit store (AUD-01) | Spec, ARWOS v1.2 | R-004 | PROPOSED |
| Infisical | Secrets vault | Spec, MPLOY | — | PROPOSED |
| OPA / Rego | Policy engine (FR-A09) | Spec | — | PROPOSED |
| socket.io | Realtime workspace feed | Spec | — | PROPOSED |
| Temporal *or* Arq+Redis | Durable jobs / approval timeouts | MPLOY | choice unresolved (U-005) | PROPOSED |
| MinIO / S3 | Deliverable storage, pre-signed URLs | Spec | — | PROPOSED |
| Paystack | NGN payments + webhooks | Spec | R-022 | PROPOSED |
| Lago *or* OpenMeter | Usage metering/billing | MPLOY | choice unresolved (U-006) | PROPOSED |
| Kubernetes (Fly.io or DO) | Deployment platform | Spec | provider unresolved (U-004) | PROPOSED |
| Langfuse + OpenTelemetry | Observability/tracing | MPLOY | unresolved (U-012) | PROPOSED |
| E2B *or* Docker+gVisor | Non-Devin code sandbox | MPLOY | unresolved (U-007) | PROPOSED |
| MCP servers (GitHub, Slack, DBs, email…) | Agent tool surface | Spec FR-I01–I05 | supply-chain risk; allow-list only | PROPOSED |
| Semgrep / Trivy / Gitleaks | Security scanning | MPLOY | — | PROPOSED |
