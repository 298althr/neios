"""Build styled HTML pages for chapters recorded as rendered views (not live UI):
ch1/ch9 title+outro cards (light design system), ch6 benchmark results (real
eval JSON), ch7 blocked-run terminal trace (real evidence JSON, dark terminal).
Run from repo root:
  py VIDEO-RECORDINg/neios_demo/tools/build_pages.py
"""
import json, html, pathlib, glob, re

ROOT = pathlib.Path(__file__).resolve().parent.parent          # neios_demo/
REPO = ROOT.parent.parent                                       # repo root
PAGES = ROOT / "raw" / "pages"
PAGES.mkdir(parents=True, exist_ok=True)

LIGHT = """<style>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=Newsreader:wght@500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
body{background:#f5f3ec;color:#1f1e1d;font-family:Inter,system-ui,sans-serif;margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh}
.card{max-width:1560px;padding:56px 72px;background:#fff;border:1px solid #e6e3d8;border-radius:20px;box-shadow:0 1px 2px #0000000a}
h1{font:800 84px 'Bricolage Grotesque',sans-serif;letter-spacing:-.04em;margin:0 0 18px}
h1 b{color:#1f5bff}
h2{font:500 36px Newsreader,Georgia,serif;margin:8px 0;color:#1f1e1d}
.dim{color:#73726c}
.sub{font:500 15px 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#1f5bff;margin-top:34px}
table{border-collapse:collapse;font-size:17px;width:100%}
td,th{padding:9px 14px;border-bottom:1px solid #e6e3d8;text-align:left}
th{font:500 11px 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em;color:#73726c}
.pass{color:#0f9d6b;font-weight:600}
.failt{color:#d93a52;font-weight:600}
.mono{font-family:'JetBrains Mono',monospace;font-size:15px}
.kpi{font:800 40px 'Bricolage Grotesque',sans-serif;color:#1f5bff}
</style>"""

DARK = """<style>
body{background:#0b0b0b;color:#e8e8e8;font-family:Consolas,'Cascadia Code',monospace;margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh}
.card{max-width:1500px;padding:60px}
.line{font-size:24px;padding:6px 0;white-space:pre}
.ok{color:#6c6}.warn{color:#fc6}.fail{color:#f66}.skip{color:#555}.dim{color:#888}
</style>"""

def write(name, body, css=LIGHT):
    (PAGES / name).write_text(f"<!doctype html><meta charset=utf-8>{css}<body>{body}", encoding="utf-8")
    print("wrote", name)

# --- ch1 title card ---
write("ch1_title.html", """<div class=card>
<h1>NEI<b>OS</b></h1>
<h2>Developer infrastructure for N-ATLAS</h2>
<h2 class=dim>SDK &middot; governance toolkit &middot; evaluation harness &middot; local ASR shim &mdash; demonstrated by a working reference app</h2>
<div class=sub>NAIC 2026 &middot; PS1 &mdash; Developer Infrastructure</div>
</div>""")

# --- ch9 outro card ---
write("ch9_outro.html", """<div class=card>
<h1>NEI<b>OS</b></h1>
<h2>SDK &middot; governance toolkit &middot; eval harness &middot; ASR shim &mdash; real N-ATLAS inference throughout</h2>
<h2 class=dim>Voice-first wedge included &mdash; PS2-ready architecture</h2>
<div class=sub>github.com/298althr/neios</div>
</div>""")

# --- ch6: benchmark results from the real eval report ---
reports = sorted(glob.glob(str(REPO / "engineering/metrics/eval-*.json")))
rows = []
meta = ""
if reports:
    rep = json.loads(pathlib.Path(reports[-1]).read_text(encoding="utf-8"))
    for r in rep["rows"]:
        cls = "pass" if r["pass"] and r["policyOk"] else "failt"
        lat = f'{r["latencyMs"]:,} ms' if r["latencyMs"] else "—"
        rows.append(
            f'<tr><td class=mono>{r["fixture"]}</td><td>{html.escape(r["label"].split("—")[0].strip())}</td>'
            f'<td class="mono dim">{lat}</td><td class="mono">{r["score"]}/100</td>'
            f'<td class="{cls}">{"PASS" if r["pass"] and r["policyOk"] else "FAIL"}</td></tr>')
    meta = (f'<div class="dim" style="margin-top:22px;font-size:18px">'
            f'{rep["passed"]}/{rep["total"]} fixtures pass &middot; mean score {rep["meanScore"]}/100 '
            f'&middot; mean latency {rep["meanLatencyMs"]:,} ms &middot; prompt <b class=mono>{rep["promptVersion"]}</b> '
            f'&middot; {html.escape(rep["provider"].split("//")[-1])}</div>')
else:
    rows.append('<tr><td class=failt>no eval report found — run node benchmarks/eval.ts first</td></tr>')
write("ch6_benchmark.html", f"""<div class=card>
<div class=sub style="margin:0 0 10px">Golden-request benchmark &middot; live N-ATLaS</div>
<h2 style="margin-top:0">Every fixture is a real governed run</h2>
<table><tr><th>fixture</th><th>case</th><th>latency</th><th>score</th><th>result</th></tr>{''.join(rows)}</table>
{meta}
</div>""")

# --- ch7: blocked-run trace from real evidence (terminal aesthetic on purpose) ---
ev = sorted(glob.glob(str(REPO / "engineering/evidence/run-*.json")))
blocked = None
for f in ev:
    d = json.loads(pathlib.Path(f).read_text(encoding="utf-8"))
    if d.get("policy", {}).get("decision") == "BLOCK":
        blocked = d
        break
ICON = {"ok": "✓", "warn": "!", "fail": "✗", "skipped": "·"}
CLS = {"ok": "ok", "warn": "warn", "fail": "fail", "skipped": "skip"}
rows = []
if blocked:
    for s in blocked["trace"]:
        d = re.sub(r"[A-Z]:[\\/].*?(?=data[\\/]audit)", "…/", s["detail"])
        rows.append(f'<div class="line {CLS[s["status"]]}">{ICON[s["status"]]} {s["stage"]:9} {html.escape(d[:96])}</div>')
    rows.append(f'<div class="line dim">final: {html.escape(blocked["auditRecord"]["finalState"])} &nbsp; approval: {html.escape(blocked["approval"])}</div>')
else:
    rows.append('<div class="line fail">no blocked-run evidence found</div>')
write("ch7_terminal.html", f"""<div class=card style="justify-content:flex-start;align-items:flex-start">
<div class="line dim">$ node scripts/neios-run.ts --blocked</div>
{''.join(rows)}
</div>""", css=DARK)

print("done")
