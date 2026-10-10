"""Assemble the NEIOS demo: normalize segments to 1080p30 h264, fit each
chapter to narration length (clone-pad or trim), concat, mux narration,
and merge per-chapter VTTs into one SRT with cumulative offsets.

Run from repo root:  py VIDEO-RECORDINg/neios_demo/tools/assemble.py
"""
import json, re, subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / "raw"
FINAL = ROOT / "final"
FINAL.mkdir(exist_ok=True)
SEG_DIR = RAW / "segments"
SEG_DIR.mkdir(exist_ok=True)

# (video_file, narration_mp3|None, target_secs, mode)
#   mode "full"  — take from t=0 (trim or still-hold to target)
#   mode "seek:N"— take target secs starting at N
#   mode "tail"  — take the LAST target secs (completed-result dwell)
# ch5.mp3 narrates across the Hausa/Yoruba/Igbo segments. Targets are narration
# duration + ~1.5 s padding, adjusted per segment mode below.
SEGMENTS = [
    ("v2_ch1.webm",  "ch1.mp3", 15.0, "full"),
    ("v2_ch2.webm",  "ch2.mp3", 22.0, "full"),
    ("v2_ch3.webm",  "ch3.mp3", 24.5, "full"),
    ("v2_ch4.webm",  "ch4.mp3", 22.0, "full"),
    ("v2_ch5a.webm", "ch5.mp3",  7.0, "tail"),
    ("v2_ch5b.webm", None,       5.5, "tail"),
    ("v2_ch5c.webm", None,       5.5, "tail"),
    ("v2_ch6.webm",  "ch6.mp3", 24.5, "full"),
    ("v2_ch7.webm",  "ch7.mp3", 17.0, "full"),
    ("v2_ch8.webm",  "ch8.mp3", 17.0, "full"),
    ("v2_ch9.webm",  "ch9.mp3", 15.5, "full"),
]

def ffprobe_dur(f):
    out = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(f)], capture_output=True, text=True)
    return float(out.stdout.strip())

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("FAILED:", " ".join(map(str, cmd))[:200]); print(r.stderr[-800:]); sys.exit(1)

# --- 1. normalize + fit each segment ---
VF = ("scale=1920:1080:force_original_aspect_ratio=decrease,"
      "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p")
segs, offsets = [], []
t = 0.0
for vfile, audio, target, mode in SEGMENTS:
    src = RAW / vfile
    if not src.exists():
        sys.exit(f"missing take: {src}")
    dur = ffprobe_dur(src)
    out = SEG_DIR / f"{src.stem}.mp4"
    if mode.startswith("seek:"):
        ss = float(mode.split(":")[1])
        run(["ffmpeg", "-y", "-ss", str(ss), "-i", str(src), "-t", str(target),
             "-vf", VF, "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-an", str(out)])
        action = f"window {ss}->{ss+target}s"
    elif mode == "tail":
        run(["ffmpeg", "-y", "-sseof", f"-{target}", "-i", str(src), "-t", str(target),
             "-vf", VF, "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-an", str(out)])
        action = f"tail {target}s"
    elif dur >= target:
        run(["ffmpeg", "-y", "-i", str(src), "-t", str(target), "-vf", VF,
             "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-an", str(out)])
        action = f"trim {dur:.1f}->{target}"
    else:
        pad = target - dur
        # normalize the take, then append a still-frame hold (last frame) for `pad` secs
        frame = SEG_DIR / f"{src.stem}_last.png"
        run(["ffmpeg", "-y", "-sseof", "-0.2", "-i", str(src), "-update", "1",
             "-frames:v", "1", str(frame)])
        hold = SEG_DIR / f"{src.stem}_hold.mp4"
        run(["ffmpeg", "-y", "-loop", "1", "-framerate", "30", "-t", f"{pad:.2f}",
             "-i", str(frame), "-vf", VF,
             "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-an", str(hold)])
        run(["ffmpeg", "-y", "-i", str(src), "-vf", VF,
             "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-an", str(out)])
        action = f"pad {dur:.1f}+{pad:.1f}s still-hold"
    segs.append(out)
    if mode == "full" and dur < target:
        segs.append(hold)
    offsets.append((vfile, audio, t, target))
    t += target
    print(f"{vfile}: {action} (offset {offsets[-1][2]:.0f}s)")

# --- 2. concat video ---
clist = SEG_DIR / "concat.txt"
clist.write_text("".join(f"file '{s.as_posix()}'\n" for s in segs))
vcat = SEG_DIR / "video_only.mp4"
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(clist), "-c", "copy", str(vcat)])
print("concat ->", vcat.name)

# --- 3. narration track: delay each mp3 to its chapter offset, mix ---
audio_inputs, delays = [], []
for _v, afile, off, _dur in offsets:
    if afile:
        audio_inputs += ["-i", str(RAW / "audio" / afile)]
        delays.append((len(delays), int(off * 1000)))
mix = ";".join(f"[{i}:a]adelay={d}|{d}[a{i}]" for i, d in delays)
mix += ";" + "".join(f"[a{i}]" for i in range(len(delays))) + \
       f"amix=inputs={len(delays)}:normalize=0,alimiter=limit=0.95[aout]"
narr = SEG_DIR / "narration.m4a"
run(["ffmpeg", "-y", *audio_inputs, "-filter_complex", mix,
     "-map", "[aout]", "-c:a", "aac", "-b:a", "160k", str(narr)])
print("narration ->", narr.name)

# --- 4. mux ---
final_mp4 = FINAL / "neios_demo.mp4"
run(["ffmpeg", "-y", "-i", str(vcat), "-i", str(narr), "-c:v", "copy",
     "-c:a", "aac", "-shortest", str(final_mp4)])
print("FINAL:", final_mp4)

# --- 5. merge VTT -> SRT ---
def v2s(ts):  # vtt ts -> srt ts
    return ts.replace(".", ",")

def add_ms(ts, ms):
    h, m, rest = ts.replace(",", ".").split(":")
    s = float(rest)
    total = (int(h) * 3600 + int(m) * 60 + s) * 1000 + ms
    h, rem = divmod(total, 3600000)
    m, rem = divmod(rem, 60000)
    s, ms2 = divmod(rem, 1000)
    return f"{int(h):02}:{int(m):02}:{int(s):02},{int(ms2):03}"

srt_entries = []
for _v, afile, off, _dur in offsets:
    if not afile:
        continue
    vtt = (RAW / "audio" / afile.replace(".mp3", ".vtt")).read_text(encoding="utf-8")
    for block in re.split(r"\n\s*\n", vtt):
        m = re.search(r"(\d+:\d+:\d+[\.,]\d+)\s*-->\s*(\d+:\d+:\d+[\.,]\d+)", block)
        if not m:
            continue
        text = " ".join(l for l in block.splitlines() if "-->" not in l and not l.startswith("WEBVTT") and l.strip())
        srt_entries.append((add_ms(m.group(1), off * 1000), add_ms(m.group(2), off * 1000), text.strip()))

srt = "\n\n".join(f"{i}\n{st} --> {en}\n{tx}" for i, (st, en, tx) in enumerate(srt_entries, 1))
(FINAL / "neios_demo.srt").write_text(srt, encoding="utf-8")
print("SRT:", FINAL / "neios_demo.srt", f"({len(srt_entries)} cues)")
print("total runtime:", f"{t:.0f}s")
