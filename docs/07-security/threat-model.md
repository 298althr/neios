---
document_id: SEC-002
title: Threat model
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Threat model — future-extension layer (formerly "VLTHR HR")

> **Not current build scope.** Describes the fuller future-layer product's threat
> surface. NEIOS's own security/trust rules are at
> `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §24.

## Assets

- Tenant data (jobs, deliverables, secrets, audit logs)
- Agent credentials / scoped tokens
- Audit store integrity (hash chain)
- Customer funds / credit ledger
- Platform availability

## Actors

- Malicious tenant attempting cross-tenant access
- Compromised/manipulated agent (prompt injection via email, scraped content)
- External attacker against API/gateway
- Insider with elevated access
- Supply-chain compromise (dependencies, MCP servers)

## Trust boundaries

1. Customer ↔ platform API
2. Agent ↔ tool gateway (GW-01) — *the* critical boundary
3. Gateway ↔ external integrations (GitHub, Slack, email, DBs, MCP servers)
4. App tier ↔ audit store (write-only append path; no edit/delete)
5. Tenant ↔ tenant (RLS)

## Top threats (from risk assessment R-001–R-010 — E2)

| ID | Threat | Primary control |
|---|---|---|
| R-001 | Prompt injection via email/untrusted content | Content never grants authority; guardrails; MCP allow-lists |
| R-002 | Credential leak in logs/context | Injection at call time; no credentials in prompts |
| R-003 | Gateway bypass | One-path rule; no direct agent→external network access |
| R-004 | Audit log tampering | Hash chain + Merkle tree; immutable store; <1s detection |
| R-005 | Cost creep from agent loops | Hard per-job caps; kill switch; alerts |
| R-007 | Fingerprint collision | Scoped fingerprints; re-verification on change |
| R-008 | Tenant isolation failure | RLS on all tables; cross-tenant attack simulation |

Full threat/control mapping: Phase 0 task (OWASP/STRIDE pass over each boundary).

## Residual risk & monitoring

TBD — owners to complete during Phase 0.
