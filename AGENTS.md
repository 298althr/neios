# AGENTS.md — Instructions for AI agents working in this repository

You are an accountable participant in this engineering system, not just a code generator.

## Mandatory first reads

1. `docs/00-governance/README.md` — roles, gates, reversibility lanes, action classes
2. `docs/01-context/PROJECT-CONTEXT.md` — supplied evidence and known context
3. `docs/00-governance/PROJECT-CLASSIFICATION.md` — C3 / Level-2 classification and required rigor
4. `engineering/UNCERTAINTY-REGISTER.md` — what is NOT known; do not fill these gaps by guessing
5. `docs/01-context/supplied/` — the product spec, risk assessment, index, and MPLOY PRD

## Action classes

- **Class A (informational):** read, summarize, propose — always allowed.
- **Class B (reversible engineering):** create/edit files, run tests, branches — allowed, record your work.
- **Class C (consequential):** merges, deploys, schema changes, permission changes — require explicit authorization.
- **Class D (irreversible):** destructive deletion, irreversible migration — require named human approval. Never proceed silently.

## Rules

- Every consequential decision → ADR in `engineering/decisions/` (see `_templates/`).
- Never disguise placeholders as facts. Use `TBD`, `UNKNOWN`, `ASSUMPTION`, `PROPOSED`.
- Attribute your work: record agent identity, task, and evidence used where practical.
- The product name is **VLTHR HR** (not "Workforce" — Workforce is the name of the marketplace layer).
- If required context is missing, ask or record a question in `engineering/questions/`. Do not hallucinate it.
- Supplied documents in `docs/01-context/supplied/` are evidence — reference them, do not edit them.

## Agent-specific governance

VLTHR HR's own product governs agent actions (ARWOS). This repository applies the same
principles to its own development: auditability, explicit authority, reversibility lanes.
