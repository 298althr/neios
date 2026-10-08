---
document_id: RDM-001
title: NEIOS implementation roadmap — NAIC 2026 (now → submission)
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER + Agent (Devin)
created: 2026-10-08
source_of_truth: docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md (plan,
  priorities, gates) — this document operationalizes it into tracked tasks.
---

# NEIOS Roadmap — NAIC 2026 Submission

Deadline: **2026-10-12, 23:59 WAT** (internal target: submit by 20:00 WAT).
Today: 2026-10-08.

This is the master task board. Each row links to a `TASK-NNNN` file in
`engineering/tasks/` once started. Status values: `TODO / IN_PROGRESS / BLOCKED /
REVIEW / DONE`. Update this table as tasks move — it is the single place to check
current state.

## Quality gates (from direction doc §19 — must pass in order)

| Gate | Condition | Status |
|---|---|---|
| G0 | Real N-ATLAS request/response captured, with endpoint + timestamp | **BLOCKED** — see TASK-0001 |
| G1 | No UI-to-N-ATLAS direct calls; single controlled path | TODO |
| G2 | Blocked action demonstrated without N-ATLAS executing it | TODO |
| G3 | Valid structured JSON or deterministic parser recovery | TODO |
| G4 | Model-derived fields labelled as such (provenance) | TODO |
| G5 | At least one execution path stops for human approval | TODO |
| G6 | Execution history reconstructable (audit) | TODO |
| G7 | Two external testers complete and document the flow | TODO |
| G8 | All seven official submission components complete | TODO |

**Rule: do not start meaningful UI work before G0 passes.** If G0 fails, escalate
to the owner immediately (per direction doc §20) — do not spend hours elsewhere.

---

## Day 1 — 2026-10-08 (today): Fundamental risk day

Objective: prove N-ATLAS integration and lock the architecture.

| ID | Task | Owner | Status |
|---|---|---|---|
| TASK-0001 | Resolve N-ATLAS access path (Ollama local vs paid HF Inference Endpoint) and get one real response captured — **Gate G0** | Owner decision + Agent build | BLOCKED on owner input (see docs/03-research/N-ATLAS-ACCESS-FINDINGS.md) |
| TASK-0002 | Confirm HF account + `NCAIR1/N-ATLaS` gate acceptance complete | Owner | OPEN (committed 2026-10-08, status unconfirmed) |
| TASK-0003 | Confirm NAIC Track B registration started/complete | Owner | OPEN (committed 2026-10-08, status unconfirmed) |
| TASK-0004 | Implement `NAtlasProvider` interface + first concrete implementation, using `openai` npm package against chosen backend's OpenAI-compatible endpoint | Agent | TODO (depends on TASK-0001) |
| TASK-0005 | Record successful smoke-test output (real request + real response, saved as integration evidence) | Agent | TODO (depends on TASK-0004) |
| TASK-0006 | Create `docs/legal/N-ATLAS-LICENSING-NOTE.md` and `docs/legal/OSS-THIRD-PARTY.md` stubs | Agent | TODO |
| TASK-0007 | Set up `config/role-cards/procurement-assistant.json` (Role Card per direction doc §13) | Agent | TODO |
| TASK-0008 | Decide: retain `apps/arwos-api` (FastAPI) or drop it for NEIOS (direction doc §18: "only retain if useful") | Owner + Agent recommendation | TODO |

---

## Day 2 — 2026-10-09: Core system day

Objective: complete the governed end-to-end workflow locally, request → audit.

| ID | Task | Status |
|---|---|---|
| TASK-0010 | APSOS intake object (who/what/why/when envelope, §4.1) | TODO |
| TASK-0011 | Role Card loader (reads `config/role-cards/*.json`, §13) | TODO |
| TASK-0012 | Policy gate — deterministic, ADCOS principle (D-0011): role exists, operation permitted, mandatory fields present, high-risk → approval, unsupported → blocked | TODO |
| TASK-0013 | Context builder (composes APSOS + role card + known facts into model request, §14) | TODO |
| TASK-0014 | Output structurer + deterministic validator (arithmetic, required fields, duplicates — §5.F/G) | TODO |
| TASK-0015 | Single approval-lane state machine (lane 0/1/2+, §5.H) | TODO |
| TASK-0016 | Audit event writer, append-only semantics (§5.I) | TODO |
| TASK-0017 | Minimal UI execution trace (01 REQUEST → 09 AUDIT, §7.1/§17) | TODO |
| TASK-0018 | SQLite data layer (organizations/users/role_cards/work_requests/execution_runs/policy_decisions/artifacts/approvals/audit_events, §11) | TODO |
| TASK-0019 | API routes per §12 contract (`/api/work-requests/:id/execute` is the critical path — single controlled call) | TODO |

**End-of-day target:** complete workflow runs locally, request → audit, via API calls (no UI polish yet).

---

## Day 3 — 2026-10-10: Product + validation day

Objective: turn the core system into a judge-readable product.

| ID | Task | Status |
|---|---|---|
| TASK-0020 | Polish primary screen (§7.1 layout: role/status, work request, execution trace, result, evidence, approve/reject) | TODO |
| TASK-0021 | Evidence/provenance panel (field → input_fact / model_derived / system_derived / human_confirmed) | TODO |
| TASK-0022 | Bilingual/local-context worked example wired end-to-end (Nigerian SME procurement → invoice draft, §6) — test English, Hausa, Igbo, Yoruba; pick most reliable for demo | TODO |
| TASK-0023 | Developer API/SDK example in docs (satisfies PS1's "working examples" ask) | TODO |
| TASK-0024 | Run internal test suite (15 test classes, §15.2) | TODO |
| TASK-0025 | **External beta tester 1 (technical) session** — see `engineering/validations/BETA-TESTER-ONBOARDING.md` | **Owner must schedule** |
| TASK-0026 | **External beta tester 2 (ops/business) session** — see `engineering/validations/BETA-TESTER-ONBOARDING.md` | **Owner must schedule** |
| TASK-0027 | Fix only high-severity failures found above | TODO |

---

## Day 4 — 2026-10-11: Freeze + demo day

Objective: stop feature development, produce submission evidence.

| ID | Task | Status |
|---|---|---|
| TASK-0030 | Freeze feature scope — no new features past this point except blocking defects | TODO |
| TASK-0031 | Full smoke/regression test | TODO |
| TASK-0032 | Verify setup from a clean machine/environment (true "N commands to run") | TODO |
| TASK-0033 | Generate validation metrics (success_rate, structured_output_rate, policy_block_rate, validation_catch_rate, manual_review_rate, p50/p95 latency, provider_error_rate — §15.2) | TODO |
| TASK-0034 | Complete README per §26 structure | TODO |
| TASK-0035 | Complete architecture documentation (can largely point to the direction doc) | TODO |
| TASK-0036 | Complete N-ATLAS integration evidence (real request/response, endpoint, timestamps) | TODO |
| TASK-0037 | Complete `docs/legal/OSS-THIRD-PARTY.md` and `docs/legal/N-ATLAS-LICENSING-NOTE.md` | TODO |
| TASK-0038 | **Record 3–5 minute demo video** (sequence per direction doc §16) | **Owner + Agent** (owner likely narrates/appears) |
| TASK-0039 | Review demo for timing/failure points, re-record if needed | TODO |

---

## Day 5 — 2026-10-12: Submission buffer day

Objective: submit by 20:00 WAT.

| ID | Task | Status |
|---|---|---|
| TASK-0040 | Final repository test | TODO |
| TASK-0041 | Submission checklist walkthrough (all 7 official components, §3 of handoff / direction doc) | TODO |
| TASK-0042 | Video verification (plays correctly, right length, uploaded where required) | TODO |
| TASK-0043 | **Identity/registration evidence** (owner's valid Nigerian ID, NAIC application) | **Owner** |
| TASK-0044 | URL verification (any links referenced actually work) | TODO |
| TASK-0045 | Final README review | TODO |
| TASK-0046 | Backup archive of the full submission | TODO |
| TASK-0047 | **Submit** | **Owner** (submission portal requires owner's registered account) |

---

## What this roadmap deliberately excludes (per direction doc §21 P3)

Full ARWOS, full Workforce marketplace, complex multi-agent systems, payment
processing, real ERP integration, real financial transaction execution, full
voice/WhatsApp channel, fine-tuning, large-scale cloud deployment, enterprise SSO,
complex analytics, Kubernetes. Do not add these even if time appears to allow it —
see direction doc §30 ("Do not do these things") and §28 risk table ("scope
explosion" is rated Critical).
