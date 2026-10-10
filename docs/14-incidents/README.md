---
document_id: INC-DIR
title: Incidents
status: ACTIVE
version: 0.2.0
created: 2026-10-08
updated: 2026-10-10
---

# 14-incidents

Operational incident log. Format: timeline, impact, root cause, corrective action.

## INC-001 — vast.ai instance wedge (2026-10-08)

- **What:** Instance 54832982 (vLLM image) stalled >60 min in image extraction.
- **Root cause:** slow-disk gVisor host; image never extracted.
- **Action:** destroyed instance, pivoted to `ollama/ollama` image on a new host;
  rule recorded: prefer `disk_bw>300`, check SSH early. Cost logged.

## INC-002 — Instance restart refused / host unavailable (2026-10-09→10)

- **What:** stopped instances returned "host resources unavailable"/connection
  refused for ~10+ min on restart attempts (54838985 twice, 55001750 once).
- **Root cause:** GPU reallocation on vast.ai spot capacity; containers queue
  until a host frees the GPU.
- **Action:** provision-on-fast-host fallback worked twice; one duplicate
  (55129880) destroyed before first run at ~$0. Rule: don't wait on a queued
  start >5 min — provision a replacement on a fast-disk host.

## INC-003 — HF gated-repo 401 on ASR checkpoints (2026-10-10)

- **What:** `services/natlas-asr` returned 500/401 on first transcription.
- **Root cause:** NCAIR1 checkpoints are gated; no `HF_TOKEN` configured.
- **Action:** `.env` loading added to the service; owner accepted all four
  repo terms; token placed in gitignored `.env`.

## INC-004 — HF cache lock hangs all pipeline loads (2026-10-10)

- **What:** Igbo (and earlier Yoruba) model loads hung indefinitely; curl
  requests timed out at 240–300 s with the service alive.
- **Root cause:** a killed download left a stale `*.lock` + `*.incomplete`
  blob; every `pipeline()` load blocked on the filelock.
- **Action:** stopped service, removed the repo's `.lock` files, resumed with
  `HF_HUB_DISABLE_XET=1 snapshot_download(...)`. Documented in the service
  README troubleshooting section.

## INC-005 — ASR service appeared offline during checkpoint download (2026-10-10)

- **What:** `/health` hung while a checkpoint downloaded — service looked dead.
- **Root cause:** synchronous `pipeline()` load ran on the FastAPI event loop.
- **Action:** model load + inference moved to a threadpool; health stays
  responsive during downloads.
