---
document_id: SEC-004
title: Identity and access
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Identity and access

## Agent identity

- Permanent agent ID (AGT-nnnnnn) + fingerprint = hash(model + contract + toolset + policy).
- Capability scores bind to fingerprint, not agent name (FR-A01).
- Fingerprint change → re-verification; unverified agents restricted to lanes 0–1.

## Human identity

- Customers: workspace-scoped accounts.
- Platform roles: Admin, Deputy, PM, reviewer, compliance.
- Approval authority by lane: lane 2 → reviewer agent/PM; lane 3 → Admin + Deputy.

## Access control

- RLS on all tables (tenant isolation at DB layer, not application trust).
- Per-assignment MCP allow-lists (FR-I05); per-channel Slack allow-lists (FR-I04).
- Scoped credentials per assignment; least privilege.

Status: seed from spec — detailed IAM design is a Phase 0 task.
