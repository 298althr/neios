# NEIOS — N-ATLAS Enterprise Integration OS

**A governed integration layer for organisations deploying N-ATLAS-powered AI.**

NEIOS standardises how work is requested, contextualised, authorised, executed,
validated and recorded — so developers move from a raw N-ATLAS model call to
controlled organisational workflows, rather than rebuilding the same mechanisms
every time. First worked example: an oil & gas procurement request →
structured, validated, approved invoice draft. Requests can be typed or spoken —
the voice-intake wedge runs the official N-ATLAS ASR checkpoints locally.

- **Status:** Working vertical slice — real N-ATLaS inference through the full governed loop (Gate G0 passed 2026-10-08; see `engineering/evidence/`)
- **Current objective:** NAIC 2026 submission ("Build with N-ATLAS"), PS1 — Developer Infrastructure, deadline 2026-10-12 23:59 WAT
- **Controlling direction:** [`docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`](docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md) — read this before changing anything
- **Future extension layer:** the fuller "AI Workforce Infrastructure" vision (originally scaffolded under the working name "VLTHR HR" — Workforce marketplace + ARWOS governance control plane) is *not* this competition deliverable. Its original specification is preserved as context in [`docs/01-context/supplied/`](docs/01-context/supplied/) and its architectural DNA (gateway, single call path, audit, reversibility lanes) shapes NEIOS's design without being fully implemented here.

## What NEIOS is NOT

- Not another SDK/prompt-wrapper/playground (explicitly avoided — see direction doc §3).
- Not a claim of official N-ATLAS/NITDA/Awarri affiliation.
- Not the full ARWOS specification (138 requirements) or the full Workforce marketplace.
- Not a system that lets the model itself decide policy, authority, or approval.

## Repository structure

| Path | Contents |
|---|---|
| `apps/vlthr-hr-web/` | Next.js 15 app — NEIOS control-first UI + API routes (`/api/work`, `/api/approve`, `/api/audit`, `/api/asr`) (folder name is legacy from the original scaffold; see direction doc §18) |
| `services/natlas-asr/` | Local ASR shim — official NCAIR1 Whisper-Small checkpoints (en/ha/yo/ig) behind `/v1/audio/transcriptions` on a local GPU |
| `apps/arwos-api/` | Governance API skeleton — retained only if useful per direction doc §18 |
| `packages/natlas-adapter/` | `NAtlasProvider` interface + OpenAI-compatible implementation (endpoint/model/key all env-configurable) |
| `packages/governance/` | Core governed loop: APSOS intake, deterministic policy gate, invoice schema + arithmetic validation/repair, field provenance, approval, JSONL audit |
| `packages/role-cards/` | Role Card config schema — reused for NEIOS Role Cards (config, not authority) |
| `packages/shared/` | Shared types/utilities |
| `scripts/` | `natlas-smoke-test.ts` (direct provider test), `neios-run.ts` (full governed loop, incl. `--blocked`/`--missing` demo modes) |
| `benchmarks/` | `eval.ts` — golden-request benchmark scoring the live pipeline (parse/extraction/arithmetic composite + policy match), reports to `engineering/metrics/` |
| `fixtures/` | `golden-requests.json` — 10 scored fixtures: 4 languages + injection, missing-field, ambiguous-quantity, policy-block and arithmetic-trap edge cases |
| `data/audit/` | Append-only JSONL audit trail written by every run (prompt version pinned per record) |
| `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` | **Primary source of truth** for NEIOS: product, architecture, plan, risks |
| `docs/` | Controlled engineering documentation (00-governance → 15-handover) |
| `engineering/` | Work-management records: issues, tasks, decisions (ADRs), risks, evidence, changes |
| `product/` | Problem, users, use cases, requirements, acceptance (currently describes the future-layer product; NEIOS-specific requirements are being extracted from the direction doc) |
| `architecture/` | Structured architecture record (currently describes the future-layer product; superseded for NEIOS by the direction doc) |

## Engineering workflow

This repository is governed by the Software Engineering Operating Repository model.
Before writing code, read, in order:

1. [`docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`](docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md) — the controlling NEIOS direction
2. [`docs/00-governance/README.md`](docs/00-governance/README.md) — roles, gates, reversibility lanes
3. [`engineering/decisions/`](engineering/decisions/) — ADR-0001 through ADR-0004 (naming/scope history, read in order — later ADRs supersede earlier ones where they conflict)
4. [`engineering/UNCERTAINTY-REGISTER.md`](engineering/UNCERTAINTY-REGISTER.md) — open blockers

**Key rules:**

- No implementation without a task linked to a requirement.
- Consequential decisions are recorded as ADRs in `engineering/decisions/`.
- Corrections supersede; they do not erase history — do not retroactively edit old ADRs/decision-log entries, including ones that use the former "VLTHR HR" product name.
- Claims without evidence are marked `ASSUMPTION`, `HYPOTHESIS`, or `UNKNOWN`.
- Material conclusions from chat/email/meetings must be transferred into this repository.

## Getting started

**Requirements:** Node.js 24+, pnpm 9 (via `corepack enable`), and an N-ATLaS
endpoint. We use Ollama serving `hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M` on a
rented GPU — the full setup, including the SSH tunnel, is in
[`engineering/runbooks/VASTAI-NATLAS.md`](engineering/runbooks/VASTAI-NATLAS.md).
Any OpenAI-compatible endpoint works; nothing is hardcoded.

```bash
# 1. tunnel to the model endpoint (example: vast.ai instance)
ssh -N -L 18000:localhost:11434 -p <port> root@<host>   # leave running

# 2. install + verify
corepack pnpm install
corepack pnpm -r typecheck

# 3. smoke-test the provider directly (optional)
node --experimental-strip-types scripts/natlas-smoke-test.ts

# 4. run the governed loop from the CLI (policy-blocked + missing-field demos too)
node --experimental-strip-types scripts/neios-run.ts [--blocked|--missing]

# 5. or run the web UI
corepack pnpm --filter vlthr-hr-web dev    # http://localhost:3000

# 6. optional — local voice intake (official N-ATLAS ASR, needs HF token
#    for the gated NCAIR1 checkpoints + ffmpeg; ~7 GB free VRAM)
pip install -r services/natlas-asr/requirements.txt
python services/natlas-asr/main.py        # http://127.0.0.1:8765

# 7. optional — golden-request benchmark against the live model
node benchmarks/eval.ts                   # report -> engineering/metrics/
```

Config (`.env.local`, never committed): `NATLAS_BASE_URL` (default
`http://127.0.0.1:18000/v1`), `NATLAS_MODEL`, `NATLAS_API_KEY`, `NEIOS_AUDIT_DIR`,
`NEIOS_ASR_URL` (default `http://127.0.0.1:8765`), `HF_TOKEN` (ASR checkpoints).

The UI walks the full request → context → policy → model → result →
evidence → approval → audit trace, with one-click example requests in English
(Pidgin), Hausa, Yoruba and Igbo, plus a voice-intake row (record or upload
audio → official N-ATLAS ASR transcript → editable request). Views: Intake,
Approvals queue, Audit explorer.

## License

[MIT](LICENSE) — covers this repository's own code and documentation.
Use of the N-ATLaS model itself is subject to the model's own license
terms — see `docs/legal/N-ATLAS-LICENSING-NOTE.md`.
