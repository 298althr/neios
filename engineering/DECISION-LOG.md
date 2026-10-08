---
document_id: REG-D01
title: Decision log
status: OPEN
created: 2026-10-08
---

# Decision log

Index of record. Full records: `engineering/decisions/ADR-*.md`.
Corrections supersede; they do not erase history.

| ID | Decision | Status | Date | Owner | Record |
|---|---|---|---|---|---|
| D-0001 | Monorepo for entire VLTHR HR product (web, API, packages, infra) | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0001 |
| D-0002 | Product name is VLTHR HR; "Workforce" retained only as marketplace-layer name | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0001 |
| D-0003 | Template depth C3 / consequence Level 2 | PROPOSED | 2026-10-08 | Agent (Devin) | ADR-0002 |
| D-0004 | Supplied documents preserved unmodified under docs/01-context/supplied/ | SUPERSEDED (naming only) | 2026-10-08 | PROJECT OWNER | ADR-0001, see ADR-0003 |
| D-0005 | NAIC 2026 submission: PS1 (Developer Infrastructure), branded as ARWOS/VLTHR HR cut-down, artefact named "ARWOS Kit for N-ATLAS" | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0003 |
| D-0006 | Worked example simplified to voice/text \u2192 structured invoice only | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0003 |
| D-0007 | Working artefact target: local-only + video, no live deployment commitment | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0003 |
| D-0008 | Marketplace layer renamed "Roster" \u2192 "Workforce" throughout, including supplied docs | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0003 |
| D-0009 | Adopted owner-supplied Engineering Direction document; superseded ADR-0003's product category/naming/worked-example (PS1 choice + local-artefact posture reaffirmed) | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0004 |
| D-0010 | Product renamed "N-ATLAS Enterprise Integration OS"; VLTHR HR/ARWOS retained as "AI Workforce Infrastructure" future-extension layer, not the competition deliverable | ACCEPTED | 2026-10-08 | PROJECT OWNER | ADR-0004 |
| D-0011 | ADCOS treated as "deterministic policy-before-model" only (request \u2192 policy evaluation \u2192 model call, never model decides its own authority) \u2014 no fuller ADCOS spec available or needed for this build | ACCEPTED | 2026-10-08 | PROJECT OWNER | this entry; implemented via the Policy Gate module |
| D-0012 | N-ATLAS access priority revised: Ollama/local quantized model \u2192 paid HF Inference Endpoint \u2192 community Space (deprioritized, evidence shows most are broken) \u2192 self-hosted vLLM. All options exposed via OpenAI-compatible API, so NAtlasProvider reuses the `openai` npm package instead of bespoke HTTP code. | PROPOSED | 2026-10-08 | Agent (Devin), pending owner confirmation | docs/03-research/N-ATLAS-ACCESS-FINDINGS.md |
| D-0013 | Owner has no local machine capable of running an 8B model \u2014 access path is paid HF Inference Endpoint, L4 x1 ($0.80/hr) preferred over T4 ($0.50/hr, needs quantization) given $5\u20137 budget allows ~6\u20138.75hrs if paused between sessions | **SUPERSEDED by D-0015** | 2026-10-08 | PROJECT OWNER | superseded same-day once real budget constraint (vast.ai only, no HF billing) was clarified |
| D-0014 | Beta tester onboarding workflow defined (access method, briefing script, capture fields, timing) | ACCEPTED | 2026-10-08 | PROJECT OWNER | engineering/validations/BETA-TESTER-ONBOARDING.md |
| D-0015 | Access path changed to vast.ai GPU rental (RTX 3090/4090, interruptible) + self-hosted vLLM Docker, using owner's existing $5 vast.ai credit \u2014 zero HF billing. Live pricing: $0.08\u20130.15/hr interruptible gives 30\u201360+ hrs; on-demand (~$0.40/hr) reserved for Day-4 demo recording only. Supersedes D-0013. | ACCEPTED | 2026-10-08 | PROJECT OWNER | docs/03-research/N-ATLAS-ACCESS-FINDINGS.md |
| D-0016 | Serving runtime pivoted vLLM → Ollama + `QuantFactory/N-ATLaS-GGUF` Q4_K_M after instance 54832982 stalled >60 min extracting the 18 GB vLLM image on a slow-disk gVisor host (~$0.23 lost, destroyed). Ollama image ~1.5 GB boots in ~3 min on a fast-disk host; the GGUF mirror is ungated so no HF token needed; same OpenAI-compatible /v1 API so the adapter is unchanged. Instance 54838985 live; Gate G0 PASSED — real responses in English, Hausa, Yoruba (engineering/evidence/). Rule learned: filter offers by disk_bw>300 MB/s. | ACCEPTED | 2026-10-08 | Agent (Devin), under owner's vast.ai budget mandate | TASK-0001, engineering/runbooks/VASTAI-NATLAS.md |
| D-0017 | Standing rule: ALL spend recorded in engineering/COST-LEDGER.md — every charge incl. micro-charges (bandwidth, storage) and failed/abandoned resources. Verified periodically against `vastai show invoices`. | ACCEPTED | 2026-10-08 | PROJECT OWNER directive | engineering/COST-LEDGER.md |
