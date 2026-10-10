---
document_id: DPL-DIR
title: Deployment
status: ACTIVE
version: 0.2.0
created: 2026-10-08
updated: 2026-10-10
---

# 10-deployment

## Honest current state

There is **no public deployment** — the submission relies on the repository as
the working artefact (explicitly allowed: "repository counts"). Everything runs
on the owner's machine + one rented GPU.

## What a deploy consists of today

1. Model: vast.ai instance + Ollama + `N-ATLaS-GGUF:Q4_K_M`, SSH tunnel to
   `127.0.0.1:18000` (any OpenAI-compatible endpoint works via `NATLAS_BASE_URL`).
2. App: `corepack pnpm --filter vlthr-hr-web dev` → `localhost:3000`.
3. ASR (optional): `python services/natlas-asr/main.py` → `127.0.0.1:8765` on a
   local GPU; app degrades honestly when absent.

## Path to a real deployment (post-submission)

- Model serving: keep Ollama or move to vLLM on the same provider; put the
  tunnel behind a small VPS reverse proxy with TLS.
- App: `next build` + any Node host; audit JSONL → durable store (SQLite file
  on a mounted volume is enough at this scale).
- ASR: the FastAPI shim is already deployable — it only needs the checkpoints
  cached and `HF_TOKEN` set.
- Not addressed: authn/z, multi-tenant audit, TLS termination, monitoring —
  recorded as UNKNOWNs, not assumed away.
