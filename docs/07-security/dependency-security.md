---
document_id: SEC-007
title: Dependency & supply-chain security
status: DRAFT
version: 0.1.0
owner: SECURITY OWNER (placeholder)
created: 2026-10-08
---

# Dependency & supply-chain security

## Rules

- Pinned versions; no floating `latest` ranges.
- Prefer versions published ≥7 days ago.
- Lockfiles committed (`pnpm-lock.yaml`, `uv.lock`/`requirements.txt`).

## Scanning (stack per supplied MPLOY §8)

- Semgrep — SAST
- Trivy — container/filesystem vulnerability scanning
- Gitleaks — secret scanning in CI

## MCP server governance

- MCP servers are a supply-chain surface: only allow-listed, pinned, reviewed servers
  reachable through the gateway (FR-I05).
- Third-party MCP servers need provenance review before assignment allow-listing.
