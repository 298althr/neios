"""Build styled HTML pages for chapters recorded as rendered views (not live UI):
ch1/ch8 title cards, ch5 blocked-run terminal trace (real evidence JSON),
ch7 audit-log table (real audit-log.jsonl). Run from repo root:
  py VIDEO-RECORDINg/neios_demo/tools/build_pages.py
"""
import json, html, pathlib, glob, re

ROOT = pathlib.Path(__file__).resolve().parent.parent          # neios_demo/
REPO = ROOT.parent.parent                                       # repo root
PAGES = ROOT / "raw" / "pages"
PAGES.mkdir(parents=True, exist_ok=True)

CSS = """<style>
body{background:#0b0b0b;color:#e8e8e8;font-family:Consolas,monospace;margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh}
.card{max-width:1500px;padding:60px}
h1{font-size:64px;margin:0 0 24px}
h2{font-size:34px;color:#888;font-weight:normal;margin:8px 0}
.sub{color:#fc6;font-size:26px;margin-top:36px}
.line{font-size:24px;padding:6px 0;white-space:pre}
.ok{color:#6c6}.warn{color:#fc6}.fail{color:#f66}.skip{color:#555}
table{border-collapse:collapse;font-size:18px}
td,th{border:1px solid #333;padding:8px 12px;text-align:left}
th{color:#888}
.dim{color:#888}
</style>"""

def write(name, body):
    (PAGES / name).write_text(f"<!doctype html><meta charset=utf-8>{CSS}<body>{body}", encoding="utf-8")
    print("wrote", name)

# --- ch1 title card ---
write("ch1_title.html", """<div class=card>
<h1>NEIOS</h1>
<h2>N-ATLAS Enterprise Integration OS</h2>
<h2 class=dim>Turning N-ATLAS intelligence into governed, auditable work</h2>
<div class=sub>NAIC 2026 &middot; PS1 &mdash; Developer Infrastructure</div>
</div>""")

# --- ch8 outro card ---
write("ch8_outro.html", """<div class=card>
<h1>NEIOS</h1>
<h2>Real N-ATLAS inference &middot; deterministic controls &middot; auditable evidence</h2>
<h2 class=dim>Full demo ran on &lt; $1 of rented GPU &mdash; cost ledger in repo</h2>
<div class=sub>github.com/vlthrlabs/NEIOS</div>
</div>""")

# --- ch5: blocked-run trace from real evidence ---
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
        d = re.sub(r"[A-Z]:[\\/].*?(?=data[\\/]audit)", "…/", s["detail"])  # hide local abs path on screen
        rows.append(f'<div class="line {CLS[s["status"]]}">{ICON[s["status"]]} {s["stage"]:9} {html.escape(d[:96])}</div>')
    rows.append(f'<div class="line dim">final: {html.escape(blocked["auditRecord"]["finalState"])} &nbsp; approval: {html.escape(blocked["approval"])}</div>')
else:
    rows.append('<div class="line fail">no blocked-run evidence found</div>')
write("ch5_terminal.html", f"""<div class=card style="justify-content:flex-start;align-items:flex-start">
<div class="line dim">$ node scripts/neios-run.ts --blocked</div>
{''.join(rows)}
</div>""")

# --- ch7: audit log table from real JSONL ---
logf = REPO / "data/audit/audit-log.jsonl"
recs = [json.loads(l) for l in logf.read_text(encoding="utf-8").splitlines() if l.strip()][-12:]
trs = "".join(
    f'<tr><td class=dim>{r["timestamp"][11:19]}</td><td>{r["requestId"][:8]}…</td>'
    f'<td>{html.escape(r["role"])}</td><td>{html.escape(r["policyResult"])}</td>'
    f'<td class=dim>{html.escape(str(r["modelRequestId"])[:20])}</td>'
    f'<td>{html.escape(r["validationResult"])}</td><td>{html.escape(r["approvalResult"])}</td>'
    f'<td><b>{html.escape(r["finalState"])}</b></td></tr>' for r in reversed(recs))
write("ch7_audit.html", f"""<div class=card>
<h2 style="font-size:28px">data/audit/audit-log.jsonl — append-only, every run</h2>
<table><tr><th>time</th><th>request</th><th>role</th><th>policy</th><th>model req</th><th>validation</th><th>approval</th><th>final</th></tr>{trs}</table>
<div class="dim" style="margin-top:20px;font-size:20px">{len(recs)} most recent of all records &middot; input/output SHA-256 hashes recorded per run</div>
</div>""")
print("done")
