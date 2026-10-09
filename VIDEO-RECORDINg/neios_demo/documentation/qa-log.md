# QA Log — NEIOS demo video

## Checks performed
- [x] Final MP4 probes: 181.4s, h264 1920x1080, aac audio present (neios_demo.mp4)
- [x] All 10 segments mapped and present (ch1–ch8 incl. ch4b/ch4c cutaways)
- [x] Frame inspection at 12s/32s/60s/97s/107s/113s/125s/140s/155s/175s — correct chapter content at each offset
- [x] Cursor overlay visible in live-UI frames (amber ring); click ripples triggered on chip/Run/Approve interactions
- [x] Live-model evidence: trace shows `http://127.0.0.1:18000/v1` + `hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M`, real `chatcmpl-*` ids in audit log
- [x] Narration placed at segment offsets (adelay+amix), video length preserved (no -shortest truncation bug — fixed)
- [x] SRT generated: 33 cues, timings offset to chapter starts
- [x] No secrets in frames: no API keys, no .env values; audit path shown is relative
- [x] Old `VLTHR-HR` absolute path removed from rendered evidence page (rebuilt via build_pages.py)

## Known cosmetic issues (accepted)
- ch1/ch8 rendered cards sit on a plain dark-gray frame — content is legible, styling is minimal.
- Still-hold pads (ch2 +5.6s, ch3 +8.4s, ch6 +4.2s, ch7 +4.6s) freeze the final frame while narration finishes — reads as intentional dwell.
- Yoruba take shows imperfect model extraction (see production-manifest honesty notes) — kept as genuine evidence of the approval lane's value.

## Not verified
- Human watch-through for pacing/audio subjective quality — owner to do one pass.
