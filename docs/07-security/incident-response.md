---
document_id: SEC-010
title: Security incident response
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Security incident response

## Severity classes

- **SEV-1:** tenant boundary crossed, audit store compromised, credential leak, unauthorized lane-3 execution → kill switch, page Admin, customer notification per policy.
- **SEV-2:** gateway bypass attempt blocked, policy violation spike → investigate same day.
- **SEV-3:** anomalous agent behavior contained by controls → review within sprint.

## Response flow

1. Contain (kill switch / revoke credentials / pause assignments)
2. Preserve evidence (audit store is append-only — export relevant chain segment)
3. Record incident → `docs/14-incidents/` + `engineering/issues/` (SECURITY)
4. Notify per NDPA breach obligations where personal data implicated
5. Postmortem → corrective actions as tracked tasks

## Contacts

TBD — assign incident commander + comms owner before Phase 1.
