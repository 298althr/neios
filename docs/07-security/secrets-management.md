---
document_id: SEC-005
title: Secrets management
status: ACTIVE
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Secrets management

## Rules

- All secrets in **Infisical** vault — never in code, prompts, logs, or committed `.env` files.
- Credentials injected at tool-call time by the gateway; agents never see them.
- Per-tenant secret scoping; integration tokens (e.g., GitHub OAuth) stored per-tenant (FR-I01).
- `.env.example` documents required variables; real values are never committed.

## Rotation & revocation

- Rotation policy: TBD (open — assign to SECURITY OWNER).
- Agent credential revocation on assignment end / kill switch: required by ARWOS v1.2.

## Pre-launch checklist (from supplied INDEX)

- [ ] All secrets in Infisical (not code/logs)
- [ ] Agent attempts to exfiltrate secrets fail in security tests
