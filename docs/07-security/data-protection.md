---
document_id: SEC-006
title: Data protection
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Data protection

## Classification

| Class | Examples | Handling |
|---|---|---|
| Restricted | Secrets, credentials | Infisical only; never agent-visible |
| Confidential | Tenant jobs, deliverables, audit logs | RLS; encrypted at rest (TBD); access logged |
| Personal | User accounts, customer data | NDPA: lawful basis, consent, deletion rights |
| Financial | Credit ledger, invoices, payments | Reconciled; refunds auditable |
| Internal | Platform config, policies | Versioned; access controlled |

## NDPA 2023 obligations (from supplied docs — needs counsel confirmation)

- Lawful basis + DPO appointment
- Breach notification process
- Cross-border transfer terms (US-hosted LLMs)
- Right-to-deletion — in roadmap per INDEX

## Retention

- Audit log: 7 years (immutable)
- Operational data: TBD per policy
- Deliverables: per-tenant policy — TBD
