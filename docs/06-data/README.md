---
document_id: DAT-DIR
title: Data engineering
status: ACTIVE
version: 0.1.0
created: 2026-10-08
---

# 06-data

Data contracts, schemas, dictionaries, lineage, quality, retention, privacy.

## Known data domains (from supplied spec)

- Operational DB (Postgres + RLS): tenants, users, jobs, tasks, credits, ratings
- **Audit store (separate, immutable, hash-chained):** agent actions, approvals, evidence
- Agent identity registry: fingerprints, capability vectors, clearances
- Deliverables: MinIO/S3 objects with pre-signed URLs
- Secrets: Infisical (never in operational DB)

## Rules

- Document: source, owner, schema, lineage, freshness, quality, sensitivity,
  retention, transformation, validation, deletion, access.
- No mock data presented as production data. Synthetic/stale/estimated values
  are explicitly classified.
- Audit retention: 7 years per spec FR-A07.
- NDPA: consent tracking, right-to-deletion, cross-border transfer terms — owner: COMPLIANCE.
