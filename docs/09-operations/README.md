---
document_id: OPS-DIR
title: Operations
status: ACTIVE
version: 0.2.0
created: 2026-10-08
updated: 2026-10-10
---

# 09-operations

## Runbooks that exist

- `engineering/runbooks/VASTAI-NATLAS.md` — provision/verify/stop the model
  instance, SSH tunnel, warm-up call, cost discipline.
- `services/natlas-asr/README.md` — ASR service setup incl. the HF gated-repo
  token step and the cache-lock fix (stale `.lock`/`.incomplete` hangs loads).

## Operated resources

| Resource | State | Cost behaviour |
|---|---|---|
| vast.ai `55001750` | STOPPED | ~$0.1815/hr running, ~$0.0481/hr storage while stopped |
| Local ASR (RTX 4060) | runs on demand | $0 |
| Dev server `:3000` | on demand | $0 |

## Cost discipline

Every dollar logged in `engineering/COST-LEDGER.md` (owner directive);
`vastai show user` is the reconciliation source of truth. Rule: stop instances
immediately after batched sessions; re-pulling the model (~$0.08) is cheaper
than idle storage if the gap is days.
