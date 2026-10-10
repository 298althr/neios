"""NEIOS local N-ATLAS ASR shim.

Exposes the official OpenAI-compatible transcription shape:
    POST /v1/audio/transcriptions   (multipart: file, language, response_format)

Serves the four official NCAIR1 Whisper-Small checkpoints on the local GPU:
    en -> NCAIR1/NigerianAccentedEnglish
    ha -> NCAIR1/Hausa-ASR
    ig -> NCAIR1/Igbo-ASR
    yo -> NCAIR1/Yoruba-ASR

Checkpoints are lazy-loaded on first use per language (~1 GB each, fp16).
Audio is converted to 16 kHz mono via ffmpeg, matching the official serving
kit's preprocessing. Long audio is chunked by the transformers pipeline.
"""

from __future__ import annotations

import os
import subprocess
import tempfile
from pathlib import Path

# Minimal .env loader (HF_TOKEN) — keeps the gated-checkpoint token out of
# the repo and out of command lines.
_env = Path(__file__).parent / ".env"
if _env.exists():
    for line in _env.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

import soundfile as sf
import torch
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from starlette.concurrency import run_in_threadpool
from transformers import pipeline

MODELS = {
    "en": "NCAIR1/NigerianAccentedEnglish",
    "ha": "NCAIR1/Hausa-ASR",
    "ig": "NCAIR1/Igbo-ASR",
    "yo": "NCAIR1/Yoruba-ASR",
}

DEVICE = 0 if torch.cuda.is_available() else -1
DTYPE = torch.float16 if torch.cuda.is_available() else torch.float32

app = FastAPI(title="neios-natlas-asr", version="0.1.0")
_pipes: dict[str, object] = {}


def get_pipe(lang: str):
    if lang not in MODELS:
        raise HTTPException(
            status_code=400,
            detail=f"unsupported language '{lang}'; expected one of {sorted(MODELS)}",
        )
    if lang not in _pipes:
        _pipes[lang] = pipeline(
            "automatic-speech-recognition",
            model=MODELS[lang],
            device=DEVICE,
            torch_dtype=DTYPE,
            chunk_length_s=30,
        )
    return _pipes[lang]


def to_16k_mono(src: Path, dst: Path) -> None:
    proc = subprocess.run(
        ["ffmpeg", "-y", "-i", str(src), "-ac", "1", "-ar", "16000", str(dst)],
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise HTTPException(status_code=400, detail=f"ffmpeg conversion failed: {proc.stderr[-300:]}")


@app.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "device": "cuda" if DEVICE == 0 else "cpu",
        "gpu": torch.cuda.get_device_name(0) if DEVICE == 0 else None,
        "loaded": sorted(_pipes),
        "languages": sorted(MODELS),
    }


def _transcribe_sync(lang: str, data: bytes, suffix: str) -> str:
    """Blocking part: model load (first call) + inference. Runs in a
    threadpool so downloads/inference don't freeze /health."""
    pipe = get_pipe(lang)
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / f"in{suffix}"
        dst = Path(tmp) / "in_16k.wav"
        src.write_bytes(data)
        to_16k_mono(src, dst)
        audio, sr = sf.read(str(dst), dtype="float32")
        result = pipe({"array": audio, "sampling_rate": sr})
    return result["text"].strip() if isinstance(result, dict) else str(result).strip()


@app.post("/v1/audio/transcriptions")
async def transcribe(
    file: UploadFile = File(...),
    language: str = Form("en"),
    response_format: str = Form("json"),
):
    lang = (language or "en").lower()[:2]
    if lang not in MODELS:
        raise HTTPException(
            status_code=400,
            detail=f"unsupported language '{lang}'; expected one of {sorted(MODELS)}",
        )
    data = await file.read()
    suffix = Path(file.filename or "audio.bin").suffix or ".bin"
    text = await run_in_threadpool(_transcribe_sync, lang, data, suffix)
    if response_format == "text":
        return text
    return {"text": text, "language": lang, "model": MODELS[lang]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=int(os.environ.get("NEIOS_ASR_PORT", "8765")))
