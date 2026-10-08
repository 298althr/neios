---
document_id: LEG-002
title: Third-party OSS component register
status: ACTIVE
version: 0.1.0
owner: Agent (Devin), reviewed by PROJECT OWNER
created: 2026-10-08
---

# Third-party OSS components used in NEIOS

Per `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §10.2: every
component actually shipped is recorded here with pinned version, verified
license, source URL, and what was reused. Nothing is added to this file on the
basis that a project merely "appears usable" — license is verified before use.

| Component | Version pinned | License (verified) | Source | What was reused | Date added |
|---|---|---|---|---|---|
| *(none shipped yet)* | — | — | — | — | — |

## Candidates evaluated, not yet adopted

| Component | License | Why considered | Decision |
|---|---|---|---|
| `openai` (npm) | MIT/Apache (verify on adoption) | Client library reused as the HTTP transport for `NAtlasProvider`, since Ollama/HF Inference Endpoints/vLLM all expose an OpenAI-compatible API — avoids writing bespoke HTTP/retry/streaming code | Planned for TASK-0004 — verify exact license on adoption |
| LiteLLM core | MIT outside `enterprise/` | Reference for provider-abstraction pattern | Pattern reference only, not a dependency — direction doc §10.1 |
| Casbin Node | Apache-2.0 | Deterministic RBAC/ABAC for the policy gate (ADCOS principle, D-0011) | Optional — decide during TASK-0012 if the hand-rolled rule set (direction doc §5.D minimum rules) is simpler than adopting a library for this scope |
| NVIDIA NeMo Guardrails | Apache-2.0 | Guardrails toolkit | Not adopted — deterministic policy preferred per direction doc §10.1 |
| Langfuse OSS core | MIT (EE areas separate) | LLM observability | Not adopted — own SQLite audit table is simpler for the deadline |
| Ollama | MIT | Local model runtime | Candidate per `docs/03-research/N-ATLAS-ACCESS-FINDINGS.md` — pending owner decision (TASK-0001) |
| `telnora-natlas-kit` | MIT | Ecosystem/competition evidence only | **Not used as foundation** — its own demo mode is mocked/fake, doesn't solve the real access problem, and direction doc §10.2 requires explicit owner approval before basing the product on a competitor's entry (not sought, not needed — doesn't fit our architecture anyway) |

## Rules (restated from direction doc §10.2)

1. Pin a version/commit for anything shipped.
2. Verify license in the repository itself, not just the project's marketing page.
3. Preserve required notices.
4. Record source URL and exactly what was reused.
5. No AGPL code as a shortcut without explicit owner approval of the consequences.
6. No basing the submitted product on a competitor's competition entry without
   explicit owner approval after a license/originality review.
