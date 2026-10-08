---
document_id: REG-A01
title: Assumption register
status: OPEN
created: 2026-10-08
---

# Assumption register

Assumptions currently being relied upon. High-impact items need validation tasks
before irreversible implementation. Template: `_templates/ASSUMPTION-TEMPLATE.md`.

| ID | Statement | Source | Confidence | Impact if false | Status |
|---|---|---|---|---|---|
| ASM-001 | Repo is a monorepo covering Roster web, ARWOS API, role cards, infra | User decision 2026-10-08 | HIGH | MEDIUM | VALIDATED (ADR-0001) |
| ASM-002 | Stack: Next.js 15 + shadcn/ui + socket.io; FastAPI + Postgres; OPA/Rego; Infisical; LiteLLM | Supplied spec/INDEX | MEDIUM | MEDIUM | OPEN — confirm in Phase 0 architecture |
| ASM-003 | Phase 0 scope = ARWOS P0 requirements (38 per INDEX) | Supplied INDEX | MEDIUM | HIGH | OPEN — verify count against ARWOS v1.2 §21 |
| ASM-004 | Nigeria-first market; Paystack for NGN payments | Supplied spec | MEDIUM | MEDIUM | OPEN |
| ASM-005 | Credit pricing: ₦40/credit (~$0.10); agents 20–40 credits/hr | Supplied INDEX/spec | MEDIUM | HIGH | OPEN — validate vs confirmed vendor pricing (U-010) |
| ASM-006 | Team of ~6.3 FTE available per spec §10 | Supplied spec | LOW | HIGH | OPEN — see U-008 |
| ASM-007 | OpenHands is the Devin-runtime alternative for agent execution | Supplied INDEX | LOW | MEDIUM | OPEN — verify fitness in Phase 0 spike |
