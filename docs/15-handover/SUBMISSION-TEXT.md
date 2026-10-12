---
document_id: SUB-TXT-001
title: Submission text — application-form copy
status: DRAFT (owner pastes into portal)
version: 1.0.0
created: 2026-10-10
positioning: ADR-0005 — developer infrastructure
---

# Submission text for the application form

## Canonical one-liner (use verbatim)

> **NEIOS — developer infrastructure for integrating, testing and deploying
> N-ATLAS safely: an OpenAI-compatible TypeScript SDK, a deterministic
> governance toolkit (policy-before-model, output validation, field
> provenance, append-only audit), a golden-fixture evaluation harness, and a
> local serving shim for the official N-ATLAS ASR checkpoints — demonstrated
> by a working multilingual procurement reference application.**

## Short description (~150 words)

N-ATLAS is downloadable, but integrating it into a controlled workflow still
means rebuilding the same machinery: request intake, permission checks,
output validation, provenance, approval, audit. NEIOS ships that machinery
as developer infrastructure.

Four components, each independently usable: `natlas-adapter` (typed SDK over
any OpenAI-compatible endpoint), `packages/governance` (deterministic policy
gate that runs before the model, schema validation, deterministic arithmetic
repair, provenance, append-only audit), a golden-fixture evaluation harness
(10 fixtures, 4 languages, scored report, prompt-version pinning), and a
local FastAPI shim serving the four official NCAIR1 ASR checkpoints at the
official `/v1/audio/transcriptions` shape.

A multilingual procurement reference app proves the stack end-to-end: live
benchmark 10/10 fixtures, mean 93/100, ~4.4 s model latency on real N-ATLaS,
with the full request→policy→model→validation→approval→audit trace visible
in the UI.

## Component checklist mapping (what to attach/answer per field)

| Required component | Where it lives |
|---|---|
| Working artefact | This repository — `README.md` quickstart reproduces it. Public mirror: **https://github.com/298althr/neios** |
| N-ATLAS integration evidence | `engineering/metrics/eval-invoice-v1-*.json`, `engineering/evidence/*.json`, `data/audit/audit-log.jsonl`, README §quickstart |
| Real-world validation | `engineering/validations/` (benchmark report now; 2 beta reports pending — see roadmap G3) |
| Technical documentation | `docs/04-architecture/NEIOS-CURRENT-SYSTEM.md`, `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`, package/service READMEs |
| Video demonstration | GitHub Release asset — https://github.com/298althr/neios/releases/tag/v1.0-naic-2026 (`neios_demo.mp4` + SRT captions) |
| Team profile | Owner supplies |
| Endorsement/registration | Owner's valid Nigerian ID (Track B individual) |

## Phrasing rules for anything you write yourself

- Lead with the four infrastructure components; the procurement app is
  always "the reference implementation / demonstration", never "the product".
- Say "developer infrastructure for N-ATLAS", not "enterprise integration OS",
  in the application's own fields. (The repo may keep the product name NEIOS;
  the *framing* is infrastructure — see ADR-0005.)
- Voice feature = "official N-ATLAS ASR checkpoints served locally" — true.
  Never call the narration TTS "N-ATLAS voice".
- Numbers must match the committed report: 10/10, mean 93/100, ~4.4 s,
  `invoice-v1`. Don't round up.
