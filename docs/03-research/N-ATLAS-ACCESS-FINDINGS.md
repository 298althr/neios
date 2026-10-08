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

## Revised priority (recommendation — supersedes direction doc §9's ordering)

1. **Ollama + a quantized GGUF build of NCAIR1/N-ATLaS, run locally** (the model
   page lists 5 existing community quantizations). Free, no ongoing cost, works
   offline, but needs a machine with enough RAM (8B model, quantized ≈ 5–8GB) and
   is slower than a GPU endpoint. **Fastest to try today — zero cost, zero signup
   beyond what's already needed.**
2. **Hugging Face Inference Endpoint** (paid, dedicated GPU, minutes to provision)
   — use if (1) is too slow for a smooth live demo, or the owner's machine can't
   run an 8B model locally. Reliable, fully within our control.
3. **Hunt for a working community Space** — deprioritized given the evidence above.
   Only revisit if both (1) and (2) are blocked.
4. **Rent a GPU (RunPod/Vast.ai) and self-host via vLLM** — fallback if (2) is
   rejected on cost grounds; more setup time than (2).

## Practical implementation implication

Options 1, 2, and 4 all can expose an **OpenAI-compatible HTTP API** (Ollama,
HF TGI/Inference Endpoints, and vLLM all support this). This means our
`NAtlasProvider` adapter does not need bespoke HTTP/retry/timeout code — it can
use the well-known `openai` npm package pointed at a custom `baseURL`, swapping
only the base URL depending on which option is live. This is a meaningful build-
time saver and is reflected in the roadmap's task list.

## Owner decision needed

See the roadmap's Day-1 task list. Specifically: can your machine run an 8B
(quantized) model locally via Ollama at acceptable speed, or should we go straight
to a paid HF Inference Endpoint (estimate: a few dollars for the build+demo window)?
