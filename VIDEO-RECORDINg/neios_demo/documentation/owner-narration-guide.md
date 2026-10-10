# Owner narration guide — replacing the TTS voice

The v2 video currently uses edge-tts `en-NG-AbeoNeural` for narration. To replace
it with owner narration:

## What to record

Read **only the `>` blockquote line under each chapter** in
`narration_script_v2.md` — 9 chapters, ~171s of speech total.

| File | Chapter | Approx. length |
|---|---|---|
| `voice_ch1.mp3` | Title | ~14 s |
| `voice_ch2.mp3` | Product tour | ~21 s |
| `voice_ch3.mp3` | Voice intake | ~23 s |
| `voice_ch4.mp3` | Live governed run | ~20 s |
| `voice_ch5.mp3` | Multilingual runs | ~17 s |
| `voice_ch6.mp3` | Benchmark | ~23 s |
| `voice_ch7.mp3` | Policy block | ~16 s |
| `voice_ch8.mp3` | Approvals + audit | ~16 s |
| `voice_ch9.mp3` | Outro | ~14 s |

## How to record

- Any phone voice recorder or mic; quiet room; natural pace — **do not try to
  match the video timing**, the assembler stretches/holds video to your audio.
- ~1 s of silence at the start and end of each chapter (clean trim points).
- Flub a line? Pause ~2 s, repeat it — the flub gets cut.
- mp3/m4a/wav all fine — they'll be converted.

## Easiest alternative: one continuous take

Record all 9 chapters in one file (`voice_all.mp3`) with ~3 s of silence between
chapters. The assembler splits on silence — slightly less precise, still works.

## Where to drop files

`VIDEO-RECORDINg/neios_demo/raw/audio/` — any filename containing `ch1`…`ch9`
(or `voice_all`) is picked up. Then say "swap narration" and the pipeline
re-times segments, regenerates captions (via the local ASR — dogfooding), and
re-muxes `final/neios_demo.mp4`.
