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

## Owner
PROJECT OWNER

## Source
Owner message 2026-10-09; `docs/15-handover/HANDOFF-NAIC-2026-ARWOS-KIT.md`
(PS2 requirements, line ~84); `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`
(track list, ~1708).

## Status
OPEN — awaiting owner decision. Sub-questions for owner:
1. Do NAIC rules allow one product to enter two tracks?
2. Is an official N-ATLAS ASR endpoint/model available to us (auth, cost)?
3. If yes to both: option (a), (b), or (c)?
