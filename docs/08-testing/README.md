---
document_id: TST-DIR
title: Testing
status: ACTIVE
version: 0.1.0
created: 2026-10-08
---

# 08-testing

## Test layers for this project

Unit → Integration → Contract → Component → System → E2E → Performance → Security →
Reliability → Recovery → Data Quality → Regression → Acceptance.

Plus for this Level-2 system: precondition checks, failure injection (kill switch),
rollback testing, operational readiness.

## Exit-test anchors (from supplied INDEX)

- **Phase 0 exit:** prompt injection blocked; tamper detection <1s; kill switch <30s;
  tenant isolation enforced; RLS on all tables.
- **Phase 1 E2E:** hire → brief → workspace → approval gate → deliverable; billing
  accuracy; refunds; credit metering.
- **Load:** 50 concurrent jobs; gateway p95 <200ms; approval notifications <10s.

## Evidence

Every test result records: test ID, version, environment, inputs, expected, actual,
status, evidence, reviewer, timestamp → `engineering/validations/`.
