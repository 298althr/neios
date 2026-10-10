# services/natlas-asr — local N-ATLAS ASR shim

Local transcription service exposing the official OpenAI-compatible shape:

```
POST /v1/audio/transcriptions   (multipart: file, language, response_format)
GET  /health
```

Serves the four official NCAIR1 Whisper-Small checkpoints on the local GPU:

| `language` | Checkpoint |
|---|---|
| `en` | `NCAIR1/NigerianAccentedEnglish` |
| `ha` | `NCAIR1/Hausa-ASR` |
| `ig` | `NCAIR1/Igbo-ASR` |
| `yo` | `NCAIR1/Yoruba-ASR` |

Checkpoints lazy-load per language (~1 GB each, fp16). Verified on an RTX 4060
Laptop GPU (8 GB) — all four fit comfortably. Audio is converted to 16 kHz mono
via ffmpeg, matching the official serving kit's preprocessing; >30 s audio is
chunked by the transformers pipeline.

## Setup

```bash
pip install -r requirements.txt
```

The NCAIR1 checkpoints are **gated on HuggingFace** — accept the terms on each
model page, then put a read token in `.env` here (gitignored):

```
HF_TOKEN=hf_...
```

## Run

```bash
python main.py          # listens on 127.0.0.1:8765 (NEIOS_ASR_PORT overrides)
```

The web app proxies `/api/asr` → this service (`NEIOS_ASR_URL` overrides the
default `http://127.0.0.1:8765`). The Intake page's voice row shows
"ASR service offline" when the shim is not running — text intake is unaffected.

## Troubleshooting

- **Downloads stall / a language load hangs forever:** killed downloads leave a
  stale `*.lock` + `*.incomplete` blob in
  `%USERPROFILE%\.cache\huggingface\hub\.locks\models--NCAIR1--<repo>\` —
  every subsequent `pipeline()` load blocks on that lock. Fix: stop the service,
  delete the repo's `.lock` files, then resume with
  `HF_HUB_DISABLE_XET=1` + `snapshot_download("NCAIR1/<repo>")` — the plain-HTTPS
  path is more reliable on this machine than the xet backend.
- **`torch_dtype` deprecation warning** under transformers 5.x is cosmetic.
- Windows symlink warning (no Developer Mode) is cosmetic — the cache works in
  degraded mode (more disk, slower).

## Positioning

This is the **PS2-ready voice wedge**: mic or uploaded audio → official N-ATLAS
ASR → editable transcript → the same governed pipeline as typed requests. It is
real ASR evidence, not a PS2 submission — see `engineering/questions/
Q-0004-ps2-voice-first.md` for what a full PS2 entry would still require
(channel + 50+ documented interactions).
