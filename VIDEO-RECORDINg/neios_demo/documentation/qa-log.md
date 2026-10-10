# QA Log — NEIOS demo video v3

Date: 2026-10-10 · Artifact: `final/neios_demo.mp4` + `final/neios_demo.srt`

## Technical verification (programmatic)

| Check | Result |
|---|---|
| Container / codecs | MP4, h264 1920x1080 + aac narration — PASS |
| Duration | 259s vs planned 259.2s (sum of segment targets) — PASS |
| SRT | 21 cues, timestamps shifted by chapter offsets — PASS |
| Segment assembly | all 11 takes re-encoded, normalized, concat clean — PASS |
| Narration alignment | adelay+amix at chapter offsets; no concat drift — PASS |
| Runtime spec | 4:19 within 3–5 min target — PASS |

## Frame-level review (`qa/v3_frames/t*.png`, `qa/id_frames/`)

| t | Chapter | Verified |
|---|---|---|
| 5s | ch1 title | "Developer infrastructure for N-ATLAS" card, PS1 tag — OK |
| 40s | ch2 tour | intake page, live voice row (Record/Upload controls, NOT offline banner) — OK |
| 75s | ch3 voice | real ASR result: "transcript received … (NCAIR1/NigerianAccentedEnglish)", editable transcript, cursor ring — OK |
| 105s | ch4 EN/Pidgin | invoice draft + provenance chips + deterministic repairs — OK |
| 129/137/146s | ch5a/b/c | Hausa/Yoruba/Igbo completed drafts; ch5c shows Igbo-numeral items (real, imperfect — kept) — OK |
| 165s | ch6 benchmark | real eval table: 10/10 PASS, 93/100, 4,369ms, invoice-v1 — OK |
| 195s | ch7 terminal | blocked-run trace: POLICY BLOCK wire_transfer, audit appended — OK |
| 215s | ch8 approvals→audit | audit log rows with real `chatcmpl-*` model ids — OK |
| 245s | ch9 outro | infra recap + `github.com/298althr/neios` (real URL) — OK |

## Claims audit

- No invented functionality narrated; every chapter maps to a real code path or real evidence file.
- Positioning consistent with ADR-0005: infrastructure first, app as reference implementation.
- ASR claims limited to the working local wedge; no PS2 validation claimed.
- Benchmark numbers on screen are the actual harness output, not staged.
- No secrets or tokens visible. One absolute local path appears (audit-path banner in intake result frames, `C:\Users\Sav-Dev\…`); disclosed in chapter-index/manifest, no credentials.

## Production incidents this session (resolved)

- edge-tts synthesis endpoint returned HTTP 403 → narration regenerated via gTTS `com.ng`.
- Dev server down mid-batch → restarted, failed chapters re-recorded.
- ch3 timed out on `select.voice-lang` because the ASR service had been killed during earlier HF-cache lock cleanup → service restarted, ch3 re-recorded.
- ch2/ch4/ch5b/ch5c first-pass takes captured the "ASR service offline" banner → all five re-recorded with service live for on-camera consistency.
- v1 outro card showed placeholder `vlthrlabs/NEIOS` repo URL → corrected to `298althr/neios` after repo creation, ch9 re-recorded, video re-assembled.

## Known imperfections (accepted, documented)

- ch1/ch7/ch8/ch9: short still-hold pads (≤3s) where narration outlasted take.
- ch5c: real model extraction imperfection kept on camera (approval lane catches it).
- Absolute local path in audit-confirmation banner (see claims audit).
- Caption timings are proportional sentence splits, not word-level forced alignment.

## Outstanding

- Owner subjective watch-through pending (pacing/voice notes; owner narration swap still possible — see `owner-narration-guide.md`).
