---
document_id: CTX-001
title: Project context
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER (placeholder)
created: 2026-10-08
confidence: HIGH (for documented items)
---

# Project context — VLTHR HR

## What exists

- 7 supplied documents (`supplied/`) — product spec, risk assessment, index,
  normative ARWOS v1.2 spec, ARWOS explainer, earlier PRD, N-ATLAS spec.
- Empty code repository (this scaffold). No implementation yet.
- Product name: **VLTHR HR**. Layers: **Roster** (marketplace) + **ARWOS** (governance).

## Actors (per supplied spec)

- Customers: enterprises, HR companies, consultancies; VLTHR ventures internally.
- Platform roles: Admin (+Deputy), Project Manager, reviewer agents, specialist agents.
- Target market: Nigeria first, Pan-Africa Phase 2, global Phase 3.

## System boundary (per spec §2)

- Upper layer: Roster marketplace (browse → hire → brief → workspace → billing).
- Lower layer: ARWOS control plane (identity, gateway, approvals, audit, compliance).
- External integrations: GitHub, Slack, Postgres/DuckDB, email, MCP servers, Paystack.

## Known constraints (from supplied docs)

- ARWOS v1.2 is **normative**: 138 requirements, 26 open issues must be answered by a
  named owner before the phase they gate. Agents MUST NOT self-answer open issues.
- Cognition AUP: resale of Devin prohibited — Devin access model (BYO key / partner
  agreement / OpenAI-only) is unresolved (Q-0001).
- NDPA 2023 compliance required; counsel review pending.
- Prepaid credits only for MVP (subscriptions later) — margin-risk driven.

## Open questions

Tracked in `engineering/questions/`. Unknowns in `engineering/UNCERTAINTY-REGISTER.md`.

## What is NOT known

See `engineering/UNCERTAINTY-REGISTER.md` — cloud provider choice, team assignments,
legal review status, N-ATLAS relationship, pricing confirmation.
