# Chapter Index — NEIOS demo v3 (final/neios_demo.mp4, 259s / 4:19, 1920x1080)

Produced 2026-10-10 (evening). v3 = ADR-0005 reframe: developer-infrastructure
positioning throughout — title/outro cards, narration, and submission text all
lead with "SDK · governance toolkit · evaluation harness · ASR shim"; the app
is presented as the reference implementation/playground.

| # | Segment | Offset | Length | Content | Source |
|---|---------|--------|--------|---------|--------|
| 1 | ch1 | 0:00 | 27.5s | Title card: "NEIOS — Developer infrastructure for N-ATLAS · SDK · governance toolkit · evaluation harness · local ASR shim" · NAIC 2026 PS1 | rendered page |
| 2 | ch2 | 0:28 | 35.0s | Reference-app tour: nav sweep (Approvals/Audit/Intake), live voice row, language chips, request box, Run | live UI (`?cursor=1`) |
| 3 | ch3 | 1:02 | 33.5s | Voice intake: audio upload → local official N-ATLAS ASR (`NCAIR1/NigerianAccentedEnglish` on RTX 4060) → editable transcript in intake box | live UI + local GPU ASR |
| 4 | ch4 | 1:36 | 28.8s | English/Pidgin live run: chip → Run → policy → N-ATLaS → repairs → provenance → pending_approval | live UI + live model via SSH tunnel |
| 5a | ch5a | 2:05 | 8.6s | Hausa run (tail): completed draft | live UI + live model |
| 5b | ch5b | 2:13 | 8.3s | Yoruba run (tail): completed draft | live UI + live model |
| 5c | ch5c | 2:22 | 8.5s | Igbo run (tail): completed draft + provenance | live UI + live model |
| 6 | ch6 | 2:30 | 33.0s | Benchmark results: 10/10 golden fixtures PASS, mean 93/100, mean latency 4,369ms, prompt `invoice-v1` | rendered page from real `engineering/metrics/eval-invoice-v1-*.json` |
| 7 | ch7 | 3:03 | 23.0s | Policy block terminal: `wire_transfer` blocked before model call, audit still appended | rendered page from real blocked-run evidence |
| 8 | ch8 | 3:26 | 23.5s | Approvals queue → Approve → Audit log (real `chatcmpl-*` ids, named repairs) | live UI |
| 9 | ch9 | 3:50 | 29.5s | Outro: infra recap · real N-ATLAS inference throughout · `github.com/298althr/neios` | rendered page |

Narration: gTTS with Nigerian domain (`tld='com.ng'`) — TTS for the video
soundtrack, NOT the same as the on-screen N-ATLAS ASR (speech-to-text) feature.
(edge-tts `en-NG-AbeoNeural` was used for v2; Microsoft's synthesis endpoint
began returning HTTP 403 during v3 production, so narration was regenerated.)

Captions: `final/neios_demo.srt` (21 cues). Sentence-level timing distributed
proportionally across each chapter's measured MP3 duration — approximate, not
forced alignment.

Known cosmetic item (accepted, code frozen): the intake result banner shows
the audit path as `C:\Users\Sav-Dev\Documents\NEIOS\data\audit\audit-log.jsonl`
— an absolute local path containing the machine username. No secrets; recorded
here rather than edited out.
