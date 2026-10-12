---
document_id: PUB-001
title: NEIOS — Governed Developer Infrastructure for N-ATLAS (open research note)
status: PUBLICATION DRAFT
version: 1.0.0
created: 2026-10-12
repository: https://github.com/298althr/neios
license: MIT
---

# NEIOS: governed developer infrastructure for N-ATLAS

*An open research note and call for contribution — published alongside the
NAIC 2026 (Problem Statement 1: Developer Infrastructure) submission.*

## Abstract

N-ATLAS arrived as downloadable weights — multilingual LLM and ASR checkpoints
covering Hausa, Yoruba, Igbo and Nigerian-accented English — but a model file
is not a system. Between a raw endpoint and an organisation's workflow sits
machinery that every team currently rebuilds privately: structured intake,
permission checks, output validation, provenance, approval routing and audit.

NEIOS (N-ATLAS Enterprise Integration OS) is that machinery, published as open
developer infrastructure under MIT. Its governing principle:

> **The LLM does not run the show; the code does.** Model output is data, not
> authority — a deterministic pipeline decides what runs, what is repaired,
> and what waits for a human.

This note describes the context, the design, the evidence, the honest limits,
and where contribution would matter most.

## 1. Context and motivation

### The gap

N-ATLAS is significant precisely because it is *Nigerian*: four languages and
the accent pattern of the actual user base, not a multilingual model that
happens to cover them. But for a Nigerian enterprise or government team, the
question after downloading the weights is immediately practical: how do we let
staff (or agents) use this *inside a controlled work process* — where some
requests are allowed, some are forbidden, outputs must be verified before they
become invoices or letters, and an auditor must be able to reconstruct what
happened?

Today's answer is "build it yourself, per team, per use case." NEIOS proposes
that this layer is infrastructure and should be built once, openly.

### History: how this project got here

NEIOS is a deliberate scoping of a larger, older design.

- **The original vision** — VLTHR HR was a two-layer product: a workforce
  platform on top of ARWOS, a governance control plane whose philosophy
  ("permissions enforce, prompts inform; content never grants authority;
  append-only audit; reversibility lanes") was specified in detail before any
  NEIOS code existed.
- **The competition** — NAIC 2026's Problem Statement 1 asked for developer
  infrastructure for N-ATLAS: SDKs, playgrounds, fine-tuning kits,
  documentation. Rather than ship the whole vision, the project scoped down
  to a narrow but *deployable* slice: apply the ARWOS control-plane
  philosophy to N-ATLAS integration, prove it end-to-end, and publish the
  machinery as the artefact. The naming and scope decisions are recorded as
  ADR-0001 through ADR-0005 in the repository — the reframe to
  developer-infrastructure-first (ADR-0005) was itself a documented decision,
  not drift.
- **What survived the scoping** — the governance ideas. What did not: the
  marketplace, the roster layer, the larger product surface. Those remain
  future work, documented but deliberately not shipped.

The build ran early October 2026 to submission (2026-10-12) on roughly
$4.59 of rented GPU credit — the full cost ledger is in the repo.

## 2. Design

### The governed loop

Every request — from the web UI, a script, or an MCP client — takes one path:

```
REQUEST → CONTEXT → POLICY → MODEL → RESULT → EVIDENCE → APPROVAL → AUDIT
```

| Property | Mechanism |
|---|---|
| Policy before model | Deterministic deny-by-default gate *before* the provider call. A `wire_transfer` request is blocked in ~0 ms — the model never sees it, and the block is still audited. |
| Model as draft engine | N-ATLaS produces JSON conforming to a strict schema. One bounded retry on malformed output. |
| Deterministic repair | Arithmetic is verified by code and corrected where provable; each correction is named in trace and audit (e.g. a model's `subtotal`/`total` slips repaired to the correct values). |
| Field provenance | Every output field tagged `input_fact` / `model_derived` / `system_derived` — claims vs. verified inputs stay distinguishable. |
| Human lane | Consequential output is `pending_approval` until a person decides; the decision is itself an audit record. |
| Append-only audit | Every run — success, block, failure, approval, rejection — appends a hash-linked JSONL record. |

### Components (each independently usable)

| Component | What it is |
|---|---|
| `packages/natlas-adapter` | Typed provider interface over any OpenAI-compatible endpoint. `NATLAS_BASE_URL` is the only knob — Ollama, vLLM, or a future hosted N-ATLAS API, zero code changes. |
| `packages/governance` | The governed loop: APSOS intake, policy engine, schema validation + arithmetic repair, provenance, approval routing, JSONL audit. |
| `packages/neios-mcp` | MCP server (stdio) exposing 5 tools — `neios_submit_request`, `neios_pending_approvals`, `neios_record_decision`, `neios_get_request`, `neios_audit_tail` — with `structuredContent` results. The tool contract caps at `pending_approval`: **no tool can execute work.** |
| `benchmarks/` | Golden-fixture harness: 10 cases across 4 languages plus injection, missing-field and arithmetic-trap cases, scored and pinned to a prompt version. |
| `services/natlas-asr` | FastAPI shim serving the four official NCAIR1 Whisper-Small checkpoints (`NigerianAccentedEnglish`, `Hausa-ASR`, `Igbo-ASR`, `Yoruba-ASR`) at the official `/v1/audio/transcriptions` shape — verified on an 8 GB laptop GPU. |
| `apps/vlthr-hr-web` | Reference implementation: a multilingual procurement console with voice intake, the live 8-stage trace, approvals queue and audit viewer. |

## 3. Evidence

All artefacts below are committed in the repository.

- **Benchmark** — 10/10 fixtures pass against live N-ATLaS, mean score 93/100,
  mean model latency 4,369 ms, prompt `invoice-v1`
  (`engineering/metrics/eval-invoice-v1-*.json`).
- **Multilingual** — real work requests in English/Pidgin, Hausa, Yoruba and
  Igbo produced governed drafts; the Hausa and Pidgin MCP-session invoices
  parsed with deterministic arithmetic repairs applied.
- **Policy-before-model** — `wire_transfer` blocked in 0 ms with no model
  call, in both the app path and the MCP session.
- **Injection containment** — a prompt-injection-style request produced a
  draft that remained `pending_approval`; never executed.
- **MCP live session** — full stdio transcript vs live N-ATLaS:
  submit → pending → decision → lookup → audit round trip
  (`engineering/evidence/mcp-live-session-2026-10-12.txt`).
- **Audit trail** — 83 append-only records in `data/audit/audit-log.jsonl`.
- **Demo** — ~3-minute video (release `v1.0-naic-2026`): the governed
  workflow end-to-end, including evidence drawn from real live sessions.
- **Failure honesty** — endpoint-unreachable produces a labelled MODEL
  failure with downstream stages skipped and the audit still appended.

## 4. Current status — stated honestly

- The governed loop, all five components, the benchmark, the stub test suite
  (15 assertions) and the live scenario suite are committed and passing.
- **Live endpoint:** runs were made on a rented GPU, since stopped — the
  compute budget is exhausted and no hosted N-ATLAS API exists yet. The
  system is endpoint-agnostic; `NATLAS_BASE_URL` is the only configuration.
- **External beta validation is incomplete** at publication — the session
  protocol and report templates are ready
  (`engineering/validations/BETA-TEST-PLAN.md`); the stub suite lets a tester
  exercise the entire governed path with no endpoint at all.
- **Scope limits:** one Role Card (`procurement-assistant`), one output
  schema (invoice drafts), a small fixture set, single-tenant file audit.
  These are deliberate slice boundaries, not bugs.

## 5. Where contribution matters

Open directions, roughly in order of leverage:

1. **External beta runs** — developers and operations users exercising the
   governed path cold; the report format exists.
2. **More Role Cards** — the role registry is config; procurement is one card.
   Compliance review, HR intake, and grant-application drafting are natural
   second cards for Nigerian organisations.
3. **Policy language** — the gate is deterministic code today; a small
   declarative policy DSL (or OPA-style rules) would let organisations write
   their own gates without touching the pipeline.
4. **Evaluation coverage** — more fixtures, adversarial cases, and a
   regression CI that reruns the benchmark on prompt-version changes.
5. **A hosted-endpoint story** — when NCAIR ships an official API, the
   adapter needs zero changes; conformance tests against it would be the
   contribution.
6. **Audit backends** — the JSONL writer is intentionally simple; hash-chained
   or database-backed append-only stores are a designed-for extension.

## 6. Reproduce

```bash
git clone https://github.com/298althr/neios
corepack pnpm install

# governed path without any model endpoint (stub)
pnpm --filter @neios/mcp test

# against a real N-ATLaS endpoint
set NATLAS_BASE_URL=http://<your-endpoint>/v1
pnpm --filter @neios/mcp test:live
node --experimental-strip-types scripts/neios-run.ts --blocked
```

## 7. Licensing and citation

Code and documentation: **MIT** (see `LICENSE`). The historical product
specifications referenced in the design history are held privately by the
authors and are not part of the open release.

If you use or build on this work, please cite the repository and this note:

> NEIOS — governed developer infrastructure for N-ATLAS (open research note),
> 2026. https://github.com/298althr/neios

## Links

- Repository: https://github.com/298althr/neios
- Demo video: https://github.com/298althr/neios/releases/tag/v1.0-naic-2026
- Technical documentation (PDF): `docs/13-releases/naic-2026/TECHNICAL-DOCUMENTATION-NEIOS.pdf`
- Submission form copy: `docs/15-handover/SUBMISSION-TEXT.md`
- Cost transparency: `engineering/COST-LEDGER.md`
