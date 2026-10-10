"""v3 narration via gTTS (edge-tts WSS is 403-blocked 2026-10-10).

Reads documentation/narration_script_v3.md, writes raw/audio/chN.mp3 per
chapter using gTTS lang=en tld=com.ng (Nigerian-accented English).
VTT captions are generated separately by narrate_vtt.py via local ASR.

Usage: py narrate_gtts.py [script_file]
"""
import re, sys, pathlib
from gtts import gTTS

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCRIPT = sys.argv[1] if len(sys.argv) > 1 else "narration_script_v3.md"
OUT = ROOT / "raw" / "audio"
OUT.mkdir(parents=True, exist_ok=True)

script = (ROOT / "documentation" / SCRIPT).read_text(encoding="utf-8")
chapters = re.findall(r"## (ch\d+)\s+—\s+([^\n]+)\n[\s\S]*?((?:^>.*\n?)+)", script, re.M | re.I)
if not chapters:
    sys.exit("no chapters parsed")

for ch, title, quote in chapters:
    text = re.sub(r"\s+", " ", re.sub(r"^>\s?", "", quote, flags=re.M)).strip()
    gTTS(text, lang="en", tld="com.ng").save(str(OUT / f"{ch}.mp3"))
    print(f"{ch}: {len(text)} chars -> {ch}.mp3")

print(f"done — gTTS en/com.ng, {len(chapters)} chapters")
