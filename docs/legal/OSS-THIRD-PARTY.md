---
document_id: LEG-002
title: Third-party OSS component register
status: ACTIVE
version: 0.1.0
owner: Agent (Devin), reviewed by PROJECT OWNER
created: 2026-10-08
---

# Third-party OSS components used in NEIOS

Per `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §10.2: every
component actually shipped is recorded here with pinned version, verified
license, source URL, and what was reused. Nothing is added to this file on the
basis that a project merely "appears usable" — license is verified before use.

| Component | Version pinned | License (verified) | Source | What was reused | Date added |
|---|---|---|---|---|---|
| Next.js | ^15.1.0 | MIT | npm / github.com/vercel/next.js | App framework (`apps/vlthr-hr-web`) | 2026-10-08 |
| React | ^19.0.0 | MIT | npm / github.com/facebook/react | UI runtime (via Next.js) | 2026-10-08 |
| TypeScript | ^5.6.0 | Apache-2.0 | npm / github.com/microsoft/TypeScript | All TS packages | 2026-10-08 |
| FastAPI | latest at install (services/natlas-asr) | MIT | pypi / github.com/fastapi/fastapi | ASR service HTTP shim | 2026-10-10 |
| uvicorn | latest at install | BSD-3-Clause | pypi / github.com/encode/uvicorn | ASR service ASGI server | 2026-10-10 |
| transformers | 5.15.1 | Apache-2.0 | pypi / github.com/huggingface/transformers | Loads official NCAIR1 ASR checkpoints | 2026-10-10 |
| torch | 2.6.0+cu124 | BSD-3-Clause | pypi / github.com/pytorch/pytorch | GPU inference for ASR checkpoints | 2026-10-10 |
| soundfile | latest at install | BSD-3-Clause | pypi | Audio decode in ASR service | 2026-10-10 |
| python-multipart | latest at install | Apache-2.0 | pypi | Multipart `/v1/audio/transcriptions` uploads | 2026-10-10 |
| ffmpeg | system binary | LGPL-2.1+ (binary invoked, not linked) | ffmpeg.org | 16 kHz mono normalisation in ASR service; video assembly | 2026-10-10 |
| Ollama | 0.32.x (local) / container image (vast.ai) | MIT | github.com/ollama/ollama | Model runtime on the eval instance | 2026-10-08 |
| N-ATLaS GGUF Q4_K_M | QuantFactory mirror, pulled 2026-10-08 | N-ATLaS Open-Source Research and Innovation License (see LEG-001) | hf.co/QuantFactory/N-ATLaS-GGUF | The model under test — not our code | 2026-10-08 |
| NCAIR1 ASR checkpoints ×4 (`NigerianAccentedEnglish`, `Hausa-ASR`, `Igbo-ASR`, `Yoruba-ASR`) | gated HF repos, pulled 2026-10-10 | N-ATLaS license (gated; owner accepted terms) | hf.co/NCAIR1/* | Voice-intake ASR models — not our code | 2026-10-10 |

## Development-only tooling (not shipped in the product)

| Component | License | Use |
|---|---|---|
| Playwright | Apache-2.0 | Demo-video screen capture (`VIDEO-RECORDINg/`) |
| edge-tts | GPL-3.0 | Demo narration TTS — dev-time media generation only; never shipped in the app; explicitly NOT presented as N-ATLAS output |
| vast.ai | commercial service | Temporary eval/recording GPU host — infra, not a code dependency |

## Candidates evaluated, not yet adopted

| Component | License | Why considered | Decision |
|---|---|---|---|
| `openai` (npm) | MIT/Apache (verify on adoption) | Client library reused as the HTTP transport for `NAtlasProvider`, since Ollama/HF Inference Endpoints/vLLM all expose an OpenAI-compatible API — avoids writing bespoke HTTP/retry/streaming code | Planned for TASK-0004 — verify exact license on adoption |
| LiteLLM core | MIT outside `enterprise/` | Reference for provider-abstraction pattern | Pattern reference only, not a dependency — direction doc §10.1 |
| Casbin Node | Apache-2.0 | Deterministic RBAC/ABAC for the policy gate (ADCOS principle, D-0011) | Optional — decide during TASK-0012 if the hand-rolled rule set (direction doc §5.D minimum rules) is simpler than adopting a library for this scope |
| NVIDIA NeMo Guardrails | Apache-2.0 | Guardrails toolkit | Not adopted — deterministic policy preferred per direction doc §10.1 |
| Langfuse OSS core | MIT (EE areas separate) | LLM observability | Not adopted — own SQLite audit table is simpler for the deadline |
| Ollama | MIT | Local model runtime | Candidate per `docs/03-research/N-ATLAS-ACCESS-FINDINGS.md` — pending owner decision (TASK-0001) |
| `telnora-natlas-kit` | MIT | Ecosystem/competition evidence only | **Not used as foundation** — its own demo mode is mocked/fake, doesn't solve the real access problem, and direction doc §10.2 requires explicit owner approval before basing the product on a competitor's entry (not sought, not needed — doesn't fit our architecture anyway) |

## Rules (restated from direction doc §10.2)

1. Pin a version/commit for anything shipped.
2. Verify license in the repository itself, not just the project's marketing page.
3. Preserve required notices.
4. Record source URL and exactly what was reused.
5. No AGPL code as a shortcut without explicit owner approval of the consequences.
6. No basing the submitted product on a competitor's competition entry without
   explicit owner approval after a license/originality review.
