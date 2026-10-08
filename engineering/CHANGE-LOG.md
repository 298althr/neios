---
document_id: REG-C01
title: Change log
status: OPEN
created: 2026-10-08
---

# Change log

Material changes to the engineering system itself (structure, governance, source of
truth). Product changes are tracked via `engineering/changes/` records and CHANGELOG.md.

| Date | Change | Class | By | Ref |
|---|---|---|---|---|
| 2026-10-08 | Initial engineering scaffold generated (C3/L2 template depth) | REVERSIBLE | Devin (agent) | ADR-0002 |
| 2026-10-08 | Supplied docs relocated DOCS/ → docs/01-context/supplied/ (unmodified) | REVERSIBLE | Devin (agent) | ADR-0001 |
| 2026-10-08 | Additional supplied docs ingested: ARWOS v1.2, What Is Arwos, N-ATLAS STRATEGY | REVERSIBLE | Devin (agent) | — |
| 2026-10-08 | apps/roster-web renamed to apps/vlthr-hr-web (folder, package, all references) | REVERSIBLE | Devin (agent) | ADR-0001 |
| 2026-10-08 | NAIC 2026 official rules researched (live fetch); scope narrowed to PS1 Developer Infrastructure, artefact "ARWOS Kit for N-ATLAS" | REVERSIBLE | Devin (agent) | ADR-0003 |
| 2026-10-08 | "Roster" renamed to "Workforce" as marketplace-layer name across all docs, including supplied evidentiary documents (explicit owner exception to preserve-unmodified rule) | REVERSIBLE | Devin (agent) | ADR-0003 |
| 2026-10-08 | Consolidated handoff document written for design/project team: docs/15-handover/HANDOFF-NAIC-2026-ARWOS-KIT.md | REVERSIBLE | Devin (agent) | — |
| 2026-10-08 | Adopted owner Engineering Direction (ADR-0004); rebranded active build to NEIOS; demoted VLTHR HR to future-extension layer in active docs | REVERSIBLE | Devin (agent) | ADR-0004 |
| 2026-10-08 | Researched live N-ATLAS access paths; found most community Gradio Spaces broken, competing SDK project's demo mode is mocked; revised access priority to Ollama/local \u2192 paid HF Endpoint | REVERSIBLE | Devin (agent) | docs/03-research/N-ATLAS-ACCESS-FINDINGS.md, D-0012 |
| 2026-10-08 | ADCOS scoped to "deterministic policy-before-model" only | ACCEPTED | PROJECT OWNER | D-0011 |
| 2026-10-08 | Created engineering/ROADMAP-NAIC-2026.md master task board + TASK-0001, TASK-0004; stubbed docs/legal/N-ATLAS-LICENSING-NOTE.md and OSS-THIRD-PARTY.md | REVERSIBLE | Devin (agent) | — |
| 2026-10-08 | Owner provided vast.ai API key + HF token via .env.local; agent installed vastai CLI, registered SSH pubkey (vast key id 1514879) | REVERSIBLE | Devin (agent) | — |
| 2026-10-08 | Instance 54832982 created (vLLM image) — stalled >60 min in image extraction on slow-disk gVisor host; destroyed | IRREVERSIBLE (resource destroyed, $ billed) | Devin (agent) | D-0016, engineering/COST-LEDGER.md |
| 2026-10-08 | Serving runtime pivoted to ollama/ollama + QuantFactory/N-ATLaS-GGUF:Q4_K_M on instance 54838985; G0 PASSED (real responses EN/HA/YO) | REVERSIBLE | Devin (agent) | D-0016, TASK-0001, engineering/evidence/ |
| 2026-10-08 | Built packages/natlas-adapter + packages/governance (APSOS/policy/validation/provenance/audit/pipeline), scripts/neios-run.ts + natlas-smoke-test.ts, /api/work + /api/approve routes, playground UI | REVERSIBLE | Devin (agent) | TASK-0004 |
| 2026-10-08 | pnpm workspace install via corepack; typecheck clean across all 4 TS projects | REVERSIBLE | Devin (agent) | — |
| 2026-10-08 | SSH tunnel moved to port 18000 — local Ollama (llama3.2:1b) already owned 127.0.0.1:11434; wrong-model responses caught and corrected | REVERSIBLE | Devin (agent) | runbook note |
| 2026-10-08 | Cost ledger created (owner directive: document every dollar); $0.337 billed / $4.663 remaining of $5 credit | — | PROJECT OWNER directive, Devin (agent) | engineering/COST-LEDGER.md |
