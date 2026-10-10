---
document_id: ARC-CUR-001
title: NEIOS — current system, as built
status: ACTIVE
version: 1.0.0
owner: Agent (Devin), reviewed by PROJECT OWNER
created: 2026-10-10
---

# NEIOS — current system, as built

This document describes the system **as it exists**, not the plan. For intent and
rationale see `ENGINEERING-DIRECTION-NAIC-2026.md`; for open decisions see
`engineering/decisions/`; for what is *not* yet proven see
`engineering/UNCERTAINTY-REGISTER.md`.

Audience: engineers first, but each section opens with a plain-language line for
operations/business readers.

## The one-sentence version

NEIOS takes a work request — **typed or spoken**, in English (Nigerian accent),
Pidgin, Hausa, Yoruba, or Igbo — and pushes it through a governed pipeline in
which a deterministic policy gate runs *before* the model is ever called, the
model's output is validated and deterministically repaired, a human must approve
anything consequential, and every step lands in an append-only audit log.

```
 spoken request ──► official N-ATLAS ASR (local GPU)
 typed  request ──┐
                  ▼
          APSOS intake (who / what / why / when)
                  ▼
          deterministic POLICY gate   ──► BLOCK = model never called
                  ▼
          N-ATLaS inference (OpenAI-compatible endpoint)
                  ▼
          schema validation + deterministic arithmetic repair
                  ▼
          provenance attached per field (input_fact / model_derived /
          system_derived / human_confirmed)
                  ▼
          human APPROVAL (lane-2; binding, one-shot)
                  ▼
          append-only AUDIT (JSONL) — written even on block/failure
```

## Components that exist and run

| Component | Path | What it is |
|---|---|---|
| Web app | `apps/vlthr-hr-web` | Next.js 15: Intake / Approvals / Audit views + API routes `/api/work`, `/api/approve`, `/api/audit`, `/api/asr` |
| Governance core | `packages/governance` | `apsos` (intake packaging), `policy` (pre-model gate), `pipeline` (8-stage trace), `invoice` (schema + validation + deterministic repair), `audit` (append-only JSONL), `role` (Role Cards), `PROMPT_VERSION = "invoice-v1"` |
| Model adapter | `packages/natlas-adapter` | `OpenAICompatProvider` — talks to any OpenAI-compatible endpoint (Ollama/vLLM); native `fetch`, typed errors (timeout/http/network/malformed) |
| ASR service | `services/natlas-asr` | FastAPI shim on the owner's RTX 4060 serving the four **official gated NCAIR1 checkpoints** (Whisper-Small, ~244M params each) at `POST /v1/audio/transcriptions`; lazy per-language load, threadpool-offloaded, ffmpeg → 16 kHz mono |
| CLI runner | `scripts/neios-run.ts` | Headless governed loop: `--blocked` and `--missing` demos included |
| Eval harness | `benchmarks/eval.ts` + `fixtures/golden-requests.json` | 10 golden fixtures → real provider → scored report to `engineering/metrics/` |
| Audit store | `data/audit/audit-log.jsonl` | Append-only; written on every run including blocks and failures |
| Demo tooling | `VIDEO-RECORDINg/neios_demo/tools` | Playwright capture + cursor overlay, edge-tts narration, ffmpeg assembly (reusable via the `demo-video-production` skill) |

## The governed loop, stage by stage

`runWorkRequest` in `packages/governance/src/pipeline.ts` appends one trace entry
per stage; the UI renders the same trace live:

1. **REQUEST** — raw text (typed, or ASR transcript confirmed by the user).
2. **CONTEXT** — APSOS intake packaged for the caller's Role Card.
3. **POLICY** — deterministic rules from the Role Card: work type in
   `allowedActions`? output type in `allowedOutputTypes`? **BLOCK ends the run
   here; the model is never invoked and the audit record still lands.**
4. **MODEL** — provider call under `PROMPT_VERSION` (`invoice-v1`), JSON-only
   invoice-draft prompt.
5. **RESULT** — schema validation; malformed JSON is parser-repaired once
   (governed retry), never passed raw to the caller.
6. **EVIDENCE** — deterministic arithmetic repair (line totals → subtotal →
   total; each correction is named), provenance chips per field.
7. **APPROVAL** — lane-2 outputs park at `pending_approval`; one human decision,
   binding, recorded.
8. **AUDIT** — one JSONL record appended regardless of outcome (`ok`,
   `pending_approval`, `blocked`, `failed`).

## Benchmark — measured, not claimed

Golden set `fixtures/golden-requests.json` (10 fixtures: 4 languages, missing
supplier, ambiguous quantity, injection attempt, policy block, minimal request,
arithmetic trap). Score per fixture: parse 40 + extraction completeness 40 +
arithmetic reconciliation 20; policy-blocked fixtures pass on the block alone.

**Live run 2026-10-10** (`engineering/metrics/eval-invoice-v1-1791598995558.json`):

| Metric | Value |
|---|---|
| Pass | 10/10 (all fixtures) |
| Mean score | 93/100 |
| Mean latency | 4,369 ms |
| Prompt version | `invoice-v1` (pinned into every audit record) |
| Notable | `fx-yoruba` scored 85/100 (extraction imperfection); injection attempt produced a schema-valid draft, policy unchanged |

## Voice intake (PS2-ready wedge — honest label)

Intake's voice row: mic record **or** audio upload → `POST /api/asr` → local
official N-ATLAS ASR → editable transcript → the identical governed pipeline.
All four checkpoints verified end-to-end 2026-10-10. This is a **working wedge,
not a PS2 submission** — PS2 additionally requires a voice-first channel
(WhatsApp/USSD/IVR) and 50+ documented real user interactions
(`engineering/questions/Q-0004-ps2-voice-first.md`).

## Runtime topology

- **Model**: N-ATLaS GGUF Q4_K_M (~4.9 GB) under Ollama on a vast.ai GPU
  instance, reached over an SSH tunnel at `127.0.0.1:18000/v1` — any
  OpenAI-compatible endpoint works via `NATLAS_BASE_URL`.
- **ASR**: owner's local RTX 4060, `$0` marginal cost, ~7.8 GB free VRAM is
  enough for all four Whisper-Small checkpoints.
- **App**: Next.js dev server at `localhost:3000`; audit at `data/audit/`.

## What this system is not

- Not a general chatbot — one Role Card, one output type (invoice draft), one
  approval lane.
- Not a simulation — model calls, ASR calls, and audit writes are all real;
  the standalone HTML prototype in `NEIOS-PROJECT-REVIEW/` is labelled as such.
- Not yet production-hardened — no authn/z on the UI, single-user approver,
  file-based audit store.
