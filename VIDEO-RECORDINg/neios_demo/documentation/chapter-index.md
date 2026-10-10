# Chapter Index — NEIOS demo v2 (final/neios_demo.mp4, ~176s, 1920x1080)

Produced 2026-10-10. v2 = ported light design system, real voice intake,
benchmark results chapter, live eval evidence.

| # | Segment | Offset | Length | Content | Source |
|---|---------|--------|--------|---------|--------|
| 1 | ch1 | 0:00 | 15.0s | Title card: NEIOS — N-ATLAS Enterprise Integration OS, "voice and text work requests, in four Nigerian languages, governed end to end" | rendered page |
| 2 | ch2 | 0:15 | 22.0s | Intake console tour (light design system): nav sweep, voice row, language chips, request box, Run | live UI (`?cursor=1`) |
| 3 | ch3 | 0:37 | 24.5s | Voice intake: audio upload → local official N-ATLAS ASR (`NCAIR1/NigerianAccentedEnglish` on RTX 4060) → editable transcript | live UI + local GPU ASR (last 8.1s still-hold: transcript landed faster than narration) |
| 4 | ch4 | 1:02 | 22.0s | English/Pidgin live run: chip → Run → policy → N-ATLaS → repairs → provenance → pending_approval | live UI + live model via SSH tunnel |
| 5a | ch5a | 1:24 | 7.0s | Hausa run (tail): completed draft | live UI + live model |
| 5b | ch5b | 1:30 | 5.5s | Yoruba run (tail): completed draft | live UI + live model |
| 5c | ch5c | 1:36 | 5.5s | Igbo run (tail): completed draft + provenance | live UI + live model |
| 6 | ch6 | 1:42 | 24.5s | Benchmark results: 10/10 golden fixtures PASS, mean 93/100, mean latency 4,369ms, prompt `invoice-v1` | rendered page from real `engineering/metrics/eval-invoice-v1-*.json` |
| 7 | ch7 | 2:06 | 17.0s | Policy block terminal: `wire_transfer` blocked before model call, audit still appended | rendered page from real blocked-run evidence |
| 8 | ch8 | 2:23 | 17.0s | Approvals queue: real pending lane-2 drafts incl. eval-harness records, Approve/Reject | live UI |
| 9 | ch9 | 2:40 | 15.5s | Outro: real N-ATLAS inference · official N-ATLAS ASR · deterministic controls · auditable evidence | rendered page |

Narration: `en-NG-AbeoNeural` (Nigerian English) via edge-tts — TTS for the video
soundtrack, NOT the same as the on-screen N-ATLAS ASR (speech-to-text) feature.
Captions: `final/neios_demo.srt` (29 cues, chapter offsets applied).
