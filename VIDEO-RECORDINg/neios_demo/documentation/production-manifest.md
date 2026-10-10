# Production Manifest — NEIOS demo video v3

Produced 2026-10-10 evening (supersedes v2; earlier takes retained as
`old_*.webm` / `v2_*.webm` / `ch*.webm` in `raw/`).

v3 implements ADR-0005: the video now presents NEIOS as **developer
infrastructure for N-ATLAS** (SDK · governance toolkit · evaluation harness ·
local ASR shim) with the procurement console shown explicitly as the
reference implementation/playground — matching PS1's brief.

## Deliverables
- `final/neios_demo.mp4` — 259s (4:19), 1920x1080, H.264 video + AAC narration
- `final/neios_demo.srt` — 21 caption cues, offsets applied per chapter
- `documentation/narration_script_v3.md` — 9-chapter script (infra-first)
- `documentation/chapter-index.md` — segment offsets and sources
- `raw/` — 11 source takes (WebM/VP9 1920x1080, `v3_*.webm`), per-chapter MP3 + VTT, QA frames in `qa/`

## Toolchain
- Screen capture: Playwright `recordVideo`, Chromium, 1920x1080, `?cursor=1` overlay cursor + click ripples
- Rendered pages (title, benchmark, policy-block terminal, outro): `tools/build_pages.py` from real eval JSON / blocked-run evidence
- Narration: `tools/narrate_gtts.py` → **gTTS, `tld='com.ng'`** (Nigerian-domain English TTS — video soundtrack only). edge-tts `en-NG-AbeoNeural` used for v1/v2 was abandoned after its synthesis endpoint started returning HTTP 403.
- Captions: `tools/narrate_vtt.py` — sentence-level timing distributed over measured MP3 durations (approximate, not forced alignment)
- Assembly: `tools/assemble.py` → ffmpeg (per-segment normalize, still-hold pad, adelay+amix narration, concat)
- LLM: N-ATLaS GGUF Q4_K_M via Ollama on vast.ai instance 55001750, SSH tunnel :18000 (instance stopped after recording)
- ASR (on-screen feature, ch3): local FastAPI shim `services/natlas-asr` → official `NCAIR1/NigerianAccentedEnglish` checkpoint on RTX 4060 Laptop (CUDA), `/v1/audio/transcriptions` shape

## Honesty notes (per system doc: no invented functionality)
- ch3 shows the real ASR path: uploaded audio → `POST /api/asr` → local official N-ATLAS ASR checkpoint → transcript in the editable request box (transcript visible: "supply 12. butterfly valves dn 150 at n185,000…").
- ch4/ch5a/ch5b/ch5c show real live model calls (`chatcmpl-*` ids land in the audit log, visible in ch8).
- ch5c (Igbo) shows real imperfect extraction (Igbo-numeral item names, arithmetic repaired deterministically, draft held for human approval) — kept intentionally: demonstrates why the approval lane exists.
- ch6 renders the REAL eval report (`engineering/metrics/eval-invoice-v1-*.json`): 10/10 pass, mean 93/100, mean latency 4,369ms, prompt `invoice-v1`. Not a mocked table.
- ch7 terminal is rendered from real blocked-run evidence; ch8 shows the real live approvals queue and audit log.
- The narration voice is gTTS TTS. The N-ATLAS ASR shown on screen is a different thing (speech-to-text, official checkpoints). The video does not claim PS2 validation — voice is presented as a working wedge; PS2 still needs 50+ documented real user interactions and a voice-first channel (see `engineering/questions/Q-0004-ps2-voice-first.md`).
- Dashboard is local-only; no public deployment is claimed anywhere in the video.
- Known cosmetic item: ch4/ch5a-ch5c frames show the intake result banner's audit path as an absolute local path (`C:\Users\Sav-Dev\…\audit-log.jsonl`). No secrets disclosed; product code is frozen, so it was left as-is and documented.
