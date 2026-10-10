# Q-0004: Should NEIOS also pursue PS2 (Voice-First Access) via a voice intake channel?

## Question
The NAIC 2026 direction doc lists **PS2 — Voice-First Access**: WhatsApp/USSD/IVR/
low-bandwidth apps using the **official N-ATLAS ASR**, for education/agriculture/
health/civic/financial-literacy use cases, validated by **50+ documented real user
interactions**.

Owner observation (2026-10-09): "we have used the voice model" — recorded here for
accuracy review and decision.

## Fact check (agent, 2026-10-09)
- Our demo video narration uses **Microsoft edge-tts `en-NG-AbeoNeural`** — a TTS
  voice, not the official N-ATLAS ASR, and not an N-ATLAS-family model. **We have
  NOT used the organizers' voice model**; the current video cannot be claimed as
  PS2 evidence.
- PS2 requires the **official N-ATLAS ASR** specifically (speech-to-text, inbound
  voice), plus a WhatsApp/USSD/IVR or low-bandwidth channel, plus 50+ real
  interactions — a much heavier validation bar than PS1's 2 beta testers.

## Fact update (agent, 2026-10-10) — the official ASR exists and is cheap
- `NCAIR1/Hausa-ASR`, `NCAIR1/Igbo-ASR`, `NCAIR1/Yoruba-ASR`,
  `NCAIR1/NigerianAccentedEnglish` on Hugging Face — Whisper Small fine-tunes,
  ~244M params each (~1 GB per checkpoint), released under the N-ATLaS license
  (derivative works must carry "Powered by Awarri" attribution).
- An official serving kit exists (natlas-docs.vercel.app/integration): multipart
  `POST /v1/audio/transcriptions`, ffmpeg normalises to 16 kHz mono, >30 s audio
  is chunked on silence. OpenAI-compatible shape — our adapter pattern fits.

## Cost estimate to add a real PS2 wedge to NEIOS
- **Model weights:** $0 (HF downloads; ~4 GB total for all four languages,
  ~$0.10 bandwidth if pulled onto the Vast instance).
- **Compute:** Whisper Small runs comfortably on the same RTX 3090 beside the
  8B LLM (~1 GB VRAM) or even CPU-only for short clips — so $0.18/hr sessions
  only when needed, same as now. No second instance required.
- **Engineering:** one `asr-adapter` (multipart → transcript), a mic/upload
  control on intake, transcript → existing APSOS path. Small, real work.
- **The real cost is operational, not financial:** PS2 validation needs **50+
  documented real user interactions** — recruiting, logging, and a channel
  (WhatsApp/USSD/IVR or a low-bandwidth web voice UI). That is days of fieldwork,
  not dollars.
- **Blocker unchanged:** competition rules on one product entering two tracks
  are UNKNOWN — ask the organisers before committing build effort.

## Why It Matters / What It Blocks
- **Honest claims:** the video may say "produced by AI tooling" (true — the
  `demo-video-production` skill generated narration, capture, assembly), but must
  not imply N-ATLAS voice-model usage.
- **Real opportunity:** a voice intake channel is a natural fit for NEIOS —
  a field/procurement officer dictates a resupply request in Hausa/Yoruba/Igbo →
  official N-ATLAS ASR → existing APSOS intake → same governed pipeline → same
  audit trail. That is a credible "one product, two tracks" story, and the
  `demo-video-production` skill makes the media side cheap to redo.
- **Blocks:** whether to invest in a second track, whether competition rules
  permit one product entering two tracks, whether an official N-ATLAS ASR
  endpoint/model is actually accessible.

## Options
- **(a)** Stay PS1-only; mention voice as roadmap in the video/submission. Zero
  extra build.
- **(b)** Build a thin voice-intake slice (ASR → existing intake API) after PS1
  submission, if an official ASR endpoint is reachable — reuse everything.
- **(c)** Full PS2 entry — needs the 50+ user validation and a channel
  (WhatsApp bot / USSD sim / IVR); significantly larger effort.

## Resolution update (agent, 2026-10-10) — wedge is built and verified
- `services/natlas-asr/` — local FastAPI shim serving the four gated NCAIR1
  checkpoints at `POST /v1/audio/transcriptions` on the owner's RTX 4060 (8 GB;
  ~7.8 GB free measured, Whisper-Small fp16 fits all four).
- **Verified live:** `NCAIR1/NigerianAccentedEnglish` downloaded (~927 MB) and
  transcribed a real audio clip end-to-end through the service; Hausa/Yoruba/
  Igbo checkpoints same path (owner accepted all four gated repos 2026-10-10).
- `apps/vlthr-hr-web` Intake now has a voice row: mic record or audio upload →
  `/api/asr` proxy → editable transcript → the existing governed pipeline.
- Runs on the owner's local GPU at $0 — no Vast spend for the ASR wedge.
- Effective outcome: option (b) was built ahead of schedule because the owner's
  local GPU removed the hosting cost entirely.

## Owner
PROJECT OWNER

## Source
Owner message 2026-10-09; `docs/15-handover/HANDOFF-NAIC-2026-ARWOS-KIT.md`
(PS2 requirements, line ~84); `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`
(track list, ~1708); services/natlas-asr/README.md (verified setup, 2026-10-10).

## Status
PARTIALLY RESOLVED — the PS2 wedge exists and is demonstrable. Remaining owner
decisions:
1. Do NAIC rules allow one product to enter two tracks? (organiser question)
2. Label the wedge "PS2-ready" only — a full PS2 submission still needs a real
   channel (WhatsApp/USSD/IVR) and 50+ documented real user interactions, which
   is not achievable before the PS1 deadline.
