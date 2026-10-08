---
document_id: SEC-003
title: Trust boundaries
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Trust boundaries

| # | Boundary | Controls |
|---|---|---|
| TB-1 | Customer → Platform API | AuthN/Z, tenant scoping, rate limits |
| TB-2 | Agent → Gateway | Signed platform tasks only; content carries no authority (INB-02) |
| TB-3 | Gateway → Integrations | Per-assignment MCP/tool allow-list; lane checks; policy (OPA); credential injection |
| TB-4 | App tier → Audit store | Append-only write path; no update/delete; hash chain |
| TB-5 | Tenant ↔ Tenant | Postgres RLS on all tables; per-tenant secrets vault; per-tenant workspace |

Status: seed from supplied spec — needs verification against implementation in Phase 0.
