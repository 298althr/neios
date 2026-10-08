---
document_id: SEC-009
title: Security testing
status: DRAFT
version: 0.1.0
owner: QA/VALIDATION (placeholder)
created: 2026-10-08
---

# Security testing

## Required test suites (from supplied INDEX — Phase 0/1 exit criteria)

- **Prompt injection:** email/scraped content never executes; content never grants authority.
- **Tamper detection:** deliberately corrupted audit entry detected <1s.
- **Kill switch:** halt all agents in a project <30s.
- **Tenant isolation:** 50+ cross-tenant attack simulations — all must fail.
- **Gateway bypass:** 0% of agent actions bypass GW-01.
- **Credential leak:** agent attempts to exfiltrate secrets fail; no tokens in logs.
- **RLS:** enforced on all tables.

## Test evidence

Results recorded in `engineering/validations/` with test ID, version, environment,
inputs, expected vs actual, reviewer, timestamp.
