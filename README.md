# NEIOS — N-ATLAS Enterprise Integration OS

**A governed integration layer for organisations deploying N-ATLAS-powered AI.**

NEIOS standardises how work is requested, contextualised, authorised, executed,
validated and recorded — so developers move from a raw N-ATLAS model call to
controlled organisational workflows, rather than rebuilding the same mechanisms
every time. First worked example: a Nigerian SME procurement request →
structured, validated, approved invoice draft.

- **Status:** Pre-build — engineering direction locked, implementation starting
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
| `apps/vlthr-hr-web/` | Next.js 15 app — reused as the NEIOS UI/playground (folder name is legacy from the original scaffold; see direction doc §18) |
| `apps/arwos-api/` | Governance API skeleton — retained only if useful per direction doc §18 |
| `packages/role-cards/` | Role Card config schema — reused for NEIOS Role Cards (config, not authority) |
| `packages/shared/` | Shared types/utilities |
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

Build has not started yet. Quickstart instructions will be written per direction doc
§26 once the core N-ATLAS integration path (Gate G0) is proven.

## License

Proprietary — license terms to be confirmed (see `LICENSE`). NEIOS's use of the
N-ATLAS model is subject to N-ATLaS's own license terms — see
`docs/legal/N-ATLAS-LICENSING-NOTE.md` (to be created per direction doc §25).
