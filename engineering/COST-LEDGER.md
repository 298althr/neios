---
document_id: REG-C02
title: Cost ledger — all spend, every dollar
status: OPEN
created: 2026-10-08
owner: PROJECT OWNER (budget); Agent records every transaction
---

# Cost ledger

**Rule (owner directive, 2026-10-08): every dollar spent is recorded here — no
exceptions, including bandwidth/storage micro-charges and failed/abandoned
resources.** API/service spend belongs to this project and is auditable.

## Budget

| Source | Amount | Notes |
|---|---|---|
| vast.ai credit | **$5.00** | Only budget. Zero other spend capacity. |
| Hugging Face | $0.00 | Free account + gated-model gate; unused for serving (GGUF mirror is ungated) |
| All other tooling | $0.00 | Ollama/vLLM images free; no paid APIs |

## Running totals (verified against `vastai show user` / `show invoices`)

| Metric | Value | As of |
|---|---|---|
| Total billed | **$0.518** | 2026-10-08 ~14:15 UTC (instance stopped) |
| Credit remaining | **$4.481** | 2026-10-08 ~14:15 UTC |
| Live instance rate | ~$0.195/hr all-in while running; ~$0.0185/hr storage while stopped | — |
| Instance state | **STOPPED** (disk/model preserved) | 2026-10-08 |

## Transactions

| Date (UTC) | Item | Vendor | Type | Amount | Cum. | Notes |
|---|---|---|---|---|---|---|
| 2026-10-08 | Instance 54832982 — GPU compute (vLLM image, ~70 min, stalled in image-extract, destroyed) | vast.ai | compute | *pending invoice* | — | Wedged first attempt; GPU charge not yet posted in last invoice batch — expected ~$0.16 |
| 2026-10-08 | Instance 54832982 — storage | vast.ai | storage | $0.074 | $0.074 | billed |
| 2026-10-08 | Instance 54838985 — GPU compute (neios-ollama, 1.609 hr total, stopped) | vast.ai | compute | $0.283 | $0.357 | billed; instance stopped 2026-10-08 ~14:10 UTC — GPU accrual halted |
| 2026-10-08 | Instance 54838985 — storage (40 GB disk, 1.678 hr billed to date) | vast.ai | storage | $0.031 | $0.388 | ~$0.0185/hr continues while stopped (disk preserved incl. model) |
| 2026-10-08 | Instance 54838985 — download bandwidth (4.96 GB model pull @ $0.026/GB) | vast.ai | bandwidth | $0.129 | $0.517 | one-time per instance |
| 2026-10-08 | Instance 54838985 — upload bandwidth | vast.ai | bandwidth | $0.001 | $0.518 | trivial |

## Known recurring / future cost drivers

- GPU compute ~$0.176/hr **only while instance is running** — stop when idle.
- Storage ~$0.0185/hr **billed even while stopped** (disk kept) — destroys cost ~$0.44/day.
- Download bandwidth $0.026/GB on every fresh model pull (~$0.13 for 4.9 GB) — avoided while the same instance's disk is preserved.
- Day-4 demo: warm the model before recording (cold-load ≈ 45 s) — keep this same on-demand instance.
- Estimated budget headroom at current usage pattern: days of intermittent dev + full demo day, provided the instance is stopped between sessions.

## How to verify

```bash
vastai show user        # 'credit' field = remaining balance
vastai show invoices    # itemized per-instance charges
```
