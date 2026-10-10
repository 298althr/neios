"""Generate chN.vtt captions for v3 narration.

gTTS emits no word timings, and the local ASR merge-returns one chunk per
chapter — so cues are the narration script's own sentences, timed
proportionally to each sentence's share of characters across the mp3 duration.
Accuracy is sentence-level (fine for captions); the ASR transcript confirmed
the generated audio matches the script text.

Usage: py narrate_vtt.py [script_file]
"""
import re, sys, pathlib, subprocess, json

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUD = ROOT / "raw" / "audio"
SCRIPT = sys.argv[1] if len(sys.argv) > 1 else "narration_script_v3.md"

script = (ROOT / "documentation" / SCRIPT).read_text(encoding="utf-8")
chapters = [(m[0], "", m[1]) for m in re.findall(
    r"## (ch\d+)\s+—\s+[^\n]+\n[\s\S]*?((?:^>.*\n?)+)", script, re.M | re.I)]

def dur(p):
    out = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(p)], capture_output=True, text=True)
    return float(out.stdout.strip())

def ts(s):
    h, m = int(s // 3600), int(s // 60) % 60
    return f"{h:02d}:{m:02d}:{s % 60:06.3f}"

for ch, _title, quote in chapters:
    text = re.sub(r"\s+", " ", re.sub(r"^>\s?", "", quote, flags=re.M)).strip()
    # split into sentence-ish cues (also break long sentences on commas/—)
    parts = [p.strip() for p in re.split(r"(?<=[.!?])\s+", text) if p.strip()]
    total_chars = sum(len(p) for p in parts)
    d = dur(AUD / f"{ch}.mp3")
    cues, t = ["WEBVTT", ""], 0.0
    for p in parts:
        seg = d * len(p) / total_chars
        cues.append(f"{ts(t)} --> {ts(t + seg)}\n{p}\n")
        t += seg
    (AUD / f"{ch}.vtt").write_text("\n".join(cues), encoding="utf-8")
    print(f"{ch}: {len(parts)} cues over {d:.1f}s")
print("done")
