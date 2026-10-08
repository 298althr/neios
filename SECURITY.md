# Security Policy

VLTHR HR is a governance-first platform: security and auditability are product features,
not afterthoughts. Security starts at architecture.

## Reporting a vulnerability

Do **not** open a public issue for security findings.

Report to: `security@vlthr.example` (placeholder — confirm channel before public beta).

Include: affected component, reproduction, impact assessment, and whether tenant
boundaries or the audit store are implicated.

## Scope

Critical attack surfaces (see `docs/07-security/threat-model.md`):

- Tool gateway bypass (all agent actions must flow through GW-01)
- Cross-tenant access (RLS on all tables; tested with cross-tenant attack simulation)
- Credential leakage into prompts, logs, or agent context
- Audit log tampering (hash-chained, append-only store)
- Prompt injection via untrusted content (email, scraped pages)

## Secrets

- Secrets live in Infisical. Never in code, prompts, logs, or `.env` files committed to git.
- Credentials are injected at tool-call time by the gateway, never exposed to agents.

## Supported versions

Pre-release. Only the latest `main` is supported until v1.0.
