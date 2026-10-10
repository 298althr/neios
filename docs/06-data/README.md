---
document_id: DAT-DIR
title: Data
status: ACTIVE
version: 0.2.0
created: 2026-10-08
updated: 2026-10-10
---

# 06-data

## Data the system actually produces

| Store | Location | Shape |
|---|---|---|
| Audit log | `data/audit/audit-log.jsonl` | Append-only JSONL; one record per pipeline run incl. blocked/failed; carries `promptVersion` when a model call occurred |
| Eval reports | `engineering/metrics/eval-*.json` | Per-fixture scores, latency, repairs, policy decision, provider errors |
| Golden fixtures | `fixtures/golden-requests.json` | 10 labelled requests across 4 languages + engineered edge cases |
| Raw model evidence | `engineering/evidence/*.json` | Captured request/response pairs from verification runs |

## Rules

- Audit records are append-only — nothing edits or deletes them.
- `.env*`, HF caches, audio clips and scratch outputs are gitignored.
- No personal data is stored: fixtures use fictional suppliers/buyers
  ("Fictional NigerDelta Industrial Supplies", "Fictional Crestfield Energy").
