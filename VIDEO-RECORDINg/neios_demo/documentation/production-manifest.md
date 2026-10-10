# Production Manifest — NEIOS demo video v2

Produced 2026-10-10 (supersedes v1; v1 raw takes retained as `old_*.webm`).

## Deliverables
- `final/neios_demo.mp4` — ~176s, 1920x1080, H.264 video + AAC narration
- `final/neios_demo.srt` — 29 caption cues, offsets applied per chapter
- `documentation/narration_script_v2.md` — 9-chapter script (claims verified against evidence)
- `documentation/chapter-index.md` — segment offsets and sources
- `raw/` — 11 source takes (WebM/VP9 1920x1080, `v2_*.webm`), per-chapter MP3 + VTT, QA frames

## Toolchain
- Screen capture: Playwright `recordVideo`, Chromium, 1920x1080, `?cursor=1` overlay cursor + click ripples
- Rendered pages (title, benchmark, policy-block terminal, outro): `tools/build_pages.py` from real eval JSON / blocked-run evidence
- Narration: `tools/narrate.py` → edge-tts `en-NG-AbeoNeural` (Nigerian English TTS — video soundtrack only)
- Assembly: `tools/assemble.py` → ffmpeg (per-segment normalize, still-hold pad, adelay+amix narration, concat)
- LLM: N-ATLaS GGUF Q4_K_M via Ollama on vast.ai instance 55001750, SSH tunnel :18000
- ASR (on-screen feature, ch3): local FastAPI shim `services/natlas-asr` → official `NCAIR1/NigerianAccentedEnglish` checkpoint on RTX 4060 Laptop (CUDA), `/v1/audio/transcriptions` shape

## Honesty notes (per system doc: no invented functionality)
- ch3 shows the real ASR path: uploaded audio → `POST /api/asr` → local official N-ATLAS ASR checkpoint → transcript in the editable request box. The take ended early (16.4s vs 24.5s slot); the last 8.1s is a still-hold on the completed transcript frame.
- ch4/ch5a/ch5b/ch5c show real live model calls (`chatcmpl-*` ids land in the audit log).
- The ch5c (Igbo) tail shows a real imperfect extraction — quantities read as 1/1/1; deterministic repair reconciled subtotal/total to the extracted lines and the draft correctly waits for human approval. Kept intentionally: demonstrates why the approval lane exists.
- ch6 renders the REAL eval report (`engineering/metrics/eval-invoice-v1-*.json`): 10/10 pass, mean 93/100, mean latency 4,369ms, prompt `invoice-v1`. Not a mocked table.
- ch7 terminal is rendered from real blocked-run evidence; ch8 shows the real live approvals queue including eval-harness records.
- The narration voice is Microsoft edge-tts TTS. The N-ATLAS ASR shown on screen is a different thing (speech-to-text, official checkpoints). The video does not claim PS2 validation — voice is presented as a working wedge; PS2 still needs 50+ documented real user interactions and a voice-first channel (see `engineering/questions/Q-0004-ps2-voice-first.md`).
- Dashboard is local-only; no public deployment is claimed anywhere in the video.
