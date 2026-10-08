---
document_id: RES-001
title: N-ATLAS access path findings (live research, 2026-10-08)
status: ACTIVE
version: 0.1.0
owner: Agent (Devin), for PROJECT OWNER decision
created: 2026-10-08
evidence_level: E3 (demonstrated — live fetches of actual HF Spaces/repos today)
---

# N-ATLAS access path findings

Direction doc §9 ranked community Gradio Spaces as Priority 1. Live-checking that
assumption today changes the recommended order.

## What I found (live, 2026-10-08)

Checked several community Spaces running/claiming to run `NCAIR1/N-ATLaS`:

| Space | Result |
|---|---|
| `anabury/N-ATLaS` | **Broken** — crashes with "Cannot access gated repo... Access to model NCAIR1/N-ATLaS is restricted." The Space itself never got gate access. |
| `wiknwo/Chat_with_N-ATLaS` | **Broken** — crashes loading `llama_cpp` shared library (environment/packaging bug). |
| `DiGiAI/Atlas-Gradio` | **Broken** — crashes on an unrelated `pydantic`/`prisma` import error. |
| `seun-ajayi/n-atlas-evaluations` | Shows "Running," but is a Docker-based Space (not plain Gradio) — unclear if it exposes a standard `/gradio_api/openapi.json`; not yet verifiable without deeper inspection. |

**Pattern: most public community Spaces attempting to serve this specific gated
model are currently broken**, not just slow/rate-limited.

## Independent confirmation from the ecosystem

Inspected `telnora-natlas-kit` (the competing N-ATLAS SDK project the direction doc
names as ecosystem evidence, §10.3). Its own README states:

> "N-ATLaS weights are on Hugging Face. Serve them behind an OpenAI-compatible API
> (e.g. vLLM) or use the official endpoint if you have credentials."
>
> "The playground's 'Demo mode' uses a mock server and returns simulated text, not
> model output."

Even this other competition entrant has **no real hosted N-ATLAS API** — its own
demo mode is explicitly fake. This independently confirms: nobody in the public
ecosystem currently has a free, reliable, hosted N-ATLAS endpoint. Self-hosting (in
some form) is not a fallback — it is the realistic primary path.

## DECIDED (2026-10-08, D-0015 — supersedes D-0013's HF Inference Endpoint pick)

Owner constraint clarified: **zero budget except an existing $5 credit on vast.ai**
(no HF billing card to be added). This rules out HF Inference Endpoints (D-0013)
entirely, regardless of merit — not a cost comparison, a hard constraint.

**Decided path: vast.ai GPU rental + self-hosted vLLM.**

Live pricing checked 2026-10-08: RTX 3090/4090 (24GB, sufficient for N-ATLaS 8B
in BF16) available on vast.ai from **$0.08–0.15/hr on interruptible/spot
listings** (on-demand ~$0.40/hr for guaranteed uptime, e.g. for the final demo
recording). At the low end, $5 buys 30–60+ hours — comfortably more than the
remaining build window needs.

vLLM has first-class support for gated Hugging Face models via `HF_TOKEN`:

```bash
docker run --runtime nvidia --gpus all \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  --env "HF_TOKEN=$HF_TOKEN" -p 8000:8000 --ipc=host \
  vllm/vllm-openai:latest --model NCAIR1/N-ATLaS --dtype auto --api-key devkey123
```

This exposes a real OpenAI-compatible `/v1/chat/completions` endpoint, confirming
the "reuse the `openai` npm package" plan below works unchanged.

## Final priority order

1. **vast.ai + vLLM (Docker), interruptible instance for dev/test, on-demand for final demo recording.** — DECIDED, D-0015.
2. Ollama local quantized model — not applicable, owner has no 8B-capable local machine (D-0013).
3. HF Inference Endpoint — ruled out by budget constraint (D-0013 superseded).
4. Community Gradio Space hunting — deprioritized (most observed broken, see above).

## Operational workflow

1. Rent cheapest RTX 3090/4090 interruptible listing with a PyTorch/CUDA template.
2. SSH in; run the Docker command above (HF token from https://huggingface.co/settings/tokens, read-scope).
3. From the local dev machine, SSH tunnel: `ssh -N -L 8000:localhost:8000 -p <port> root@<ip>`.
4. `NAtlasProvider` targets `http://localhost:8000/v1` with the chosen `--api-key`.
5. **Stop (not destroy)** the instance between sessions to pause compute billing
   while keeping the downloaded model cached on disk (avoids re-downloading ~16GB
   each session).
6. For the Day-4 demo recording specifically, switch to an **on-demand** instance
   (no preemption risk) for that session only.

## OUTCOME (2026-10-08, same day — D-0016)

The vLLM plan above hit a real operational failure on first use: instance
54832982 (RTX 3090, $0.139/hr) spent **>60 minutes** extracting the ~18 GB
`vllm/vllm-openai` image on a host with a ~90 MB/s disk + gVisor runtime —
unacceptable on a per-second budget. Instance destroyed (~$0.23 spent).

**Pivoted to `ollama/ollama` + `QuantFactory/N-ATLaS-GGUF` (Q4_K_M):**

- The GGUF mirror is **ungated** — no HF token needed for download at all.
- Ollama image ~1.5 GB → up in ~3 min on a fast-disk host (offer 53250098,
  3200 MB/s disk, $0.178/hr, ~$0.195/hr all-in).
- Model pull: 4.9 GB at ~150 MB/s ≈ 33 s.
- Ollama exposes the same OpenAI-compatible `/v1` API — `NAtlasProvider`
  (custom fetch impl in `packages/natlas-adapter`, not the `openai` npm pkg —
  zero-dependency) worked unchanged.
- **G0 PASSED**: first real response 45.7 s cold, 1.8–4.1 s warm; English,
  Hausa and Yoruba probes all produced correct structured extraction.
  Evidence in `engineering/evidence/`.

Caveat recorded for honesty: the served weights are the official
NCAIR1/N-ATLaS 8B in a third-party GGUF quantization, not the raw safetensors —
genuine N-ATLAS integration (same model), quantized serving form.

## Practical implementation implication

vast.ai + Ollama (like vLLM / HF Endpoints / Ollama-local) exposes an
**OpenAI-compatible HTTP API**. `NAtlasProvider` targets the tunneled
`baseURL` (`http://localhost:11434/v1`); config-driven, backend-swappable.
Daily ops in `engineering/runbooks/VASTAI-NATLAS.md`.
