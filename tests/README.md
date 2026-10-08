# tests/

Cross-app test suites (unit tests live next to their apps).

- `e2e/` — hire → brief → workspace → approval gate → deliverable flows
- `security/` — cross-tenant attacks (50+), prompt injection, gateway bypass,
  audit tamper detection, credential exfiltration, kill-switch timing
- `load/` — 50 concurrent jobs, gateway p95 <200ms, approval notify <10s
- `contract/` — API/gateway contract tests

Results → `engineering/validations/` records. Phase 0 exit tests are mandatory
(see docs/08-testing).
