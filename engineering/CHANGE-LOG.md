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
| 2026-10-08 | Deterministic arithmetic repair added to validation layer (model emitted 20×8000=1,600,000 on Hausa run — corrected + surfaced in trace/audit) | REVERSIBLE | Devin (agent) | packages/governance/src/invoice.ts |
| 2026-10-08 | /api/audit endpoint + audit-log viewer in playground UI; EN/HA/YO one-click example requests added; approve/reject verified end-to-end (audit shows linked approval event) | REVERSIBLE | Devin (agent) | apps/vlthr-hr-web/ |
| 2026-10-08 | README rewritten with real quickstart (tunnel, install, smoke test, governed loop, UI); VALIDATION-METRICS.md created from evidence + audit data | REVERSIBLE | Devin (agent) | README.md, engineering/validations/ |
| 2026-10-09 | Owner directive: restart instance, record full interactive demo with cursor/clicks — video v1 produced (181s, 8 chapters, live model) | REVERSIBLE | PROJECT OWNER + Devin | VIDEO-RECORDINg/ |
| 2026-10-09 | Instance 55001750 created on fast-disk host after 54838985 failed to restart (queued >4 min, host resources unavailable); model re-pulled (~$0.08 bandwidth) | REVERSIBLE | Devin (agent) | COST-LEDGER.md |
| 2026-10-09 | Instance 54838985 DESTROYED on explicit owner approval — ended ~$0.44/day storage bleed; instance was redundant after 55001750 got its own model copy | IRREVERSIBLE (resource destroyed) | PROJECT OWNER approval, Devin executed | COST-LEDGER.md |
| 2026-10-09 | Global `demo-video-production` skill written to ~/.devin-equivalent skills dir — Playwright capture, cursor overlay, edge-tts, ffmpeg assembly, QA; reusable across projects | REVERSIBLE | Devin (agent) | SKILL.md |
| 2026-10-09 | Q-0004 opened: PS2 voice-first question; fact-check established our video narration is edge-tts TTS, NOT N-ATLAS ASR | REVERSIBLE | Devin (agent) | engineering/questions/Q-0004 |
| 2026-10-10 | Standalone prototype built (`NEIOS-PROJECT-REVIEW/neios-workflow-prototype.html`) from supplied workflow-template engine — compose → policy → draft → approval → dispatch/audit, 3 domains, 4 languages, seeded cases | REVERSIBLE | Devin (agent) | TASK-0048 |
| 2026-10-10 | 19-slide PRD/architecture review deck built (`neios-prd-review.html`) per owner's PROJECT-REVIEW-SKILL format | REVERSIBLE | Devin (agent) | TASK-0049 |
| 2026-10-10 | Owner feedback: prototype too busy (accessibility fatigue), too lean on real-life/engineered cases, no prompt-engineering or benchmark evidence → declutter + scenario/score pass | ACCEPTED | PROJECT OWNER | TASK-0052, TASK-0053 |
| 2026-10-10 | Tester kit written: session script + report template; later retargeted to the ported app (owner decision) | REVERSIBLE | Devin (agent) | TASK-0054, engineering/validations/ |
| 2026-10-10 | G1 DONE: light design system ported into apps/vlthr-hr-web (cream/blue, single nav, voice-intake row); typecheck clean; screenshot-verified on all views | REVERSIBLE | Devin (agent) | commit b98986b |
| 2026-10-10 | `services/natlas-asr` built: FastAPI shim serving 4 gated NCAIR1 checkpoints at official `/v1/audio/transcriptions` shape on owner's RTX 4060 ($0); threadpool offload for model load + inference | REVERSIBLE | Devin (agent) | services/natlas-asr/ |
| 2026-10-10 | Owner accepted all 4 gated NCAIR1 HF repos; HF_TOKEN already present in `.env.local`, mirrored to service `.env` (gitignored) | — | PROJECT OWNER | — |
| 2026-10-10 | All four ASR languages verified end-to-end on local GPU (en/ha real transcription; yo/ig transcribe English clip into native-phoneme output as expected) | REVERSIBLE | Devin (agent) | /health + transcript responses |
| 2026-10-10 | G2 DONE: eval harness + 10 golden fixtures; LIVE run vs N-ATLaS: 10/10 pass, mean 93/100, 4,369 ms mean latency, prompt `invoice-v1` pinned into audit | REVERSIBLE | Devin (agent) | engineering/metrics/eval-invoice-v1-*.json |
| 2026-10-10 | G4 RECORDED: video v2 (~176s, 9 chapters) — adds voice-intake (real ASR) + benchmark chapters; assembled, QA'd, docs written; owner watch-through pending | REVERSIBLE | Devin (agent) | VIDEO-RECORDINg/ |
| 2026-10-10 | HF cache lock incident: killed ig download left stale .lock blocking all pipeline loads; resolved by removing lock + resuming via snapshot_download with HF_HUB_DISABLE_XET=1; documented in service README | REVERSIBLE | Devin (agent) | services/natlas-asr/README.md |
| 2026-10-10 | Instance 55129880 created as provisioning fallback, destroyed before first run ($0); 55001750 reused, stopped after session per owner directive | IRREVERSIBLE (resource destroyed) | Devin (agent) | COST-LEDGER.md |
| 2026-10-10 | OSS-THIRD-PARTY.md filled with actual shipped components (runtime, ASR service, models, dev tooling) | REVERSIBLE | Devin (agent) | docs/legal/ |
| 2026-10-10 | Documentation backfill: NEIOS-CURRENT-SYSTEM.md (as-built), docs/05–10 + 13/14 filled with real content, 5 incident records added | REVERSIBLE | Devin (agent) | docs/ |
| 2026-10-10 | PS1 fit assessment vs official page (verbatim quotes mapped word-by-word); finding: right substance, wrong emphasis | REVERSIBLE | Devin (agent) | engineering/reviews/PS1-FIT-ASSESSMENT.md |
| 2026-10-10 | **Positioning reframed: developer infrastructure, reference app as demonstration** — README rewritten, narration_script_v3.md, SUBMISSION-TEXT.md (canonical one-liner + form copy), video cards updated. Zero code changes. | ACCEPTED (owner directive) | PROJECT OWNER + Devin | ADR-0005 |
