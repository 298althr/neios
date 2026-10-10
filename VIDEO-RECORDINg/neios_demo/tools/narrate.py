"""Generate narration MP3 + VTT subtitles per chapter from a narration script.

Usage: py narrate.py [script_file] [voice]
Default script: documentation/narration_script_v2.md
Default voice: en-NG-AbeoNeural (Nigerian English, male).
Outputs raw/audio/chN.mp3 + raw/audio/chN.vtt per chapter.
"""
import re, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "raw" / "audio"
OUT.mkdir(parents=True, exist_ok=True)
SCRIPT = sys.argv[1] if len(sys.argv) > 1 else "narration_script_v2.md"
VOICE = sys.argv[2] if len(sys.argv) > 2 else "en-NG-AbeoNeural"

script = (ROOT / "documentation" / SCRIPT).read_text(encoding="utf-8")
# chapters: "## chN — Title" ... narration = the "> " blockquote lines that follow
chapters = re.findall(r"## (ch\d+)\s+—\s+([^\n]+)\n[\s\S]*?((?:^>.*\n?)+)", script, re.M | re.I)
if not chapters:
    sys.exit("no chapters parsed from narration_script.md")

for ch, title, quote in chapters:
    text = " ".join(l.lstrip("> ").strip() for l in quote.splitlines() if l.strip())
    text = re.sub(r"\s+", " ", text).strip()
    mp3, vtt = OUT / f"{ch.lower()}.mp3", OUT / f"{ch.lower()}.vtt"
    subprocess.run(
        [sys.executable, "-m", "edge_tts", "--voice", VOICE,
         "--text", text, "--write-media", str(mp3), "--write-subtitles", str(vtt)],
        check=True)
    print(f"{ch} ({title.strip()}): {len(text)} chars -> {mp3.name} + {vtt.name}")

print(f"done — voice {VOICE}, {len(chapters)} chapters")
