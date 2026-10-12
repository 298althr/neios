# AGENTS.md — Instructions for AI agents working in this repository

You are an accountable participant in this engineering system, not just a code generator.

## Mandatory first reads

1. `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` — the controlling direction for the current build (NEIOS)
2. `archive/docs/00-governance/README.md` — roles, gates, reversibility lanes, action classes *(local archive, untracked — not in the public repo)*
3. `engineering/decisions/ADR-0001` through `ADR-0004` — naming/scope decision history, in order
4. `engineering/UNCERTAINTY-REGISTER.md` — what is NOT known; do not fill these gaps by guessing
5. The original, larger product vision (formerly "VLTHR HR") — historical/future-layer evidence, not the current build target. **Private context pack: held in the owner's private store (`NEIOS-PRIVATE/`), not published in the public repo.**

## Action classes

- **Class A (informational):** read, summarize, propose — always allowed.
- **Class B (reversible engineering):** create/edit files, run tests, branches — allowed, record your work.
- **Class C (consequential):** merges, deploys, schema changes, permission changes — require explicit authorization.
- **Class D (irreversible):** destructive deletion, irreversible migration — require named human approval. Never proceed silently.

## Rules

- Every consequential decision → ADR in `engineering/decisions/` (see `_templates/`).
- Never disguise placeholders as facts. Use `TBD`, `UNKNOWN`, `ASSUMPTION`, `PROPOSED`.
- Attribute your work: record agent identity, task, and evidence used where practical.
- The current build's product name is **NEIOS** (N-ATLAS Enterprise Integration OS).
  "VLTHR HR" (Workforce + ARWOS) was the original, larger product vision — it is now
  the documented future-extension layer, not the active build target. Do not conflate
  the two: do not describe NEIOS using VLTHR HR's two-layer marketplace/governance
  framing, and do not retroactively rename "VLTHR HR" inside historical ADRs,
  decision-log entries, or supplied documents (Rule 5 — corrections supersede, they
  do not erase history).
- If required context is missing, ask or record a question in `engineering/questions/`. Do not hallucinate it.
- Supplied documents are evidence of the original
  VLTHR HR vision — reference them, do not edit them. They live in the private
  context pack (not the public repo); for agent work they remain readable from
  the owner's local store (exception already recorded:
  ADR-0003's "Roster"→"Workforce" layer-naming correction, which does not apply here).

## Agent-specific governance

ARWOS's control-plane philosophy (single call path, permissions enforce/prompts
inform, content never grants authority, append-only audit, reversibility lanes)
shapes NEIOS's architecture without NEIOS implementing the full ARWOS specification.
This repository applies the same principles to its own development process:
auditability, explicit authority, reversibility lanes.
