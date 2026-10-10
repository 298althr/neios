# QA Log — NEIOS demo video v2

Date: 2026-10-10 · Artifact: `final/neios_demo.mp4` + `final/neios_demo.srt`

## Technical verification (programmatic)

| Check | Result |
|---|---|
| Container / codecs | MP4, h264 1920x1080 + aac narration — PASS |
| Duration | ~176s vs planned ~175.5s (sum of segment targets) — PASS |
| SRT | 29 cues, timestamps shifted by chapter offsets — PASS |
| Segment assembly | all 11 takes re-encoded, normalized, concat clean — PASS |
| Narration alignment | adelay+amix at chapter offsets; no back-to-back mp3 concat drift — PASS |

## Frame-level review (one+ frame per chapter, `raw/qa/v2_f*.png`)

| t | Chapter | Verified |
|---|---|---|
| 7s | ch1 title | NEIOS card, voice+text tagline, PS1 tag — OK |
| 25s | ch2 tour | intake page light theme, nav sweep — OK |
| 45s | ch3 voice | voice row visible, "transcribing uploaded audio…" state, cursor ring — OK |
| 72s | ch4 EN/Pidgin | live "Running…" state, real request text — OK |
| 87s | ch5a Hausa | run result — OK |
| 93s | ch5b Yoruba | run result — OK |
| 99s | ch5c Igbo | completed draft, provenance chips, Approve/Reject — OK (qty 1/1/1 imperfection, see manifest) |
| 114s | ch6 benchmark | real eval table: 10/10 PASS, 93/100 mean, invoice-v1 — OK |
| 134s | ch7 terminal | blocked-run trace, POLICY BLOCK line — OK |
| 150s | ch8 approvals | real queue, pending_approval rows incl. eval-harness entries — OK |
| 168s | ch9 outro | outro card, repo URL — OK |

## Claims audit

- No invented functionality narrated; every chapter maps to a real code path or real evidence file.
- ASR claims limited to the working local wedge; no PS2 validation claimed.
- Benchmark numbers on screen are the actual harness output, not staged values.
- No secrets, tokens, or absolute local paths visible in any sampled frame (tunnel shown as `127.0.0.1:18000/v1`, no credentials).

## Known imperfections (accepted, documented)

- ch3 tail: 8.1s still-hold (transcript completed before narration finished).
- ch5c: real model qty extraction imperfection kept on camera (approval lane catches it).
- `fx-yoruba` eval score 85/100 shown honestly in benchmark table (not hidden).

## Outstanding

- Owner subjective watch-through pending (pacing/voice notes).
