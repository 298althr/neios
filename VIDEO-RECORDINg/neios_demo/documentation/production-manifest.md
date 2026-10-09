# Production Manifest — NEIOS demo video

## Deliverables
- `final/neios_demo.mp4` — 181.4s, 1920x1080, H.264 video + AAC narration, 9.6 MB
- `final/neios_demo.srt` — 33 caption cues, offsets applied per chapter
- `documentation/narration_script.md` — 8-chapter script (claims verified against evidence)
- `documentation/chapter-index.md` — segment offsets and sources
- `raw/` — 10 source takes (WebM/VP9 1920x1080), per-chapter MP3 + VTT, QA frames

## Toolchain
- Screen capture: Playwright `recordVideo`, Chromium, 1920x1080, `?cursor=1` overlay cursor + click ripples
- Rendered pages (title, policy-block terminal, outro): `tools/build_pages.py` from real evidence JSON / audit JSONL
- Narration: `tools/narrate.py` → edge-tts `en-NG-AbeoNeural`
- Assembly: `tools/assemble.py` → ffmpeg (per-segment normalize, still-hold pad, adelay+amix narration, concat)
- Model: N-ATLaS GGUF Q4_K_M via Ollama on vast.ai instance 55001750 (RTX 3090), SSH tunnel :18000

## Honesty notes (per system doc: no invented functionality)
- ch3/ch4/ch4b/ch4c show real live model calls (chatcmpl ids in audit log).
- The Yoruba take (ch4b) shows a real imperfect extraction (unit price parsed as 18,500 not 185,000, qty 42) — kept intentionally: deterministic repair corrected the total and the draft correctly waits for human approval. This demonstrates why the approval lane exists.
- ch5 terminal is rendered from real blocked-run evidence; ch7 audit view is the live `/audit` page.
- Dashboard is local-only; no public deployment is claimed anywhere in the video.
