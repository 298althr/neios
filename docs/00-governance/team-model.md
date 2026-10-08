---
document_id: GOV-002
title: Team model
status: DRAFT
version: 0.1.0
owner: PROJECT OWNER (placeholder)
created: 2026-10-08
---

# Team model

Roles are separated from people. One person may hold multiple roles.
Where a person is unknown, the role placeholder stands — do not invent names.

## Roles

| Role | Responsibility | Holder |
|---|---|---|
| PROJECT OWNER | go/no-go, org-level (lane 3) approvals | Althr (per supplied INDEX) |
| PRODUCT OWNER | product decisions, roadmap | TBD |
| TECHNICAL LEAD | architecture, gateway, audit | TBD |
| ENGINEER (backend ×2) | ARWOS identity/policies; manager+worker agents | TBD |
| ENGINEER (frontend) | Roster UI, job workspace, billing | TBD |
| DEVOPS/SRE | Kubernetes, Postgres, monitoring, DR | TBD |
| PM | customer feedback, GTM | TBD |
| QA/VALIDATION | test plan, E2E, security tests | TBD |
| SECURITY OWNER | threat model, secrets, vulnerability mgmt | TBD |
| COMPLIANCE | NDPA, audit response, policy docs | TBD |
| AI AGENT | implementation/analysis under agent governance rules | Devin (this agent) |

Source of staffing detail: supplied INDEX "Key Contacts & Responsibilities" and spec §10
(6.3 FTE breakdown) — E2 documentary.

## Authority map

- Lane 2 approval: PM or reviewer agent
- Lane 3 approval: PROJECT OWNER + deputy
- Release authority: PROJECT OWNER (until delegated by ADR)
