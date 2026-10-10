# ADR-0005: Submission positioning — developer infrastructure, not enterprise product

## Status
ACCEPTED

## Date
2026-10-10

## Decision Owner
PROJECT OWNER (directive received 2026-10-10); Agent executes

## Context

The official PS1 text (ncair.nitda.gov.ng/naic, fetched 2026-10-10) asks for
**"tools that make N-ATLAS easy to build with"** for **developers** moving from
accessing the model to "integrating, testing, adapting and deploying it." Our
artefact was built as exactly that — adapter SDK, governance toolkit, eval
harness, ASR serving shim, reference app — but the README, docs and video
narration led with "NEIOS: Enterprise Integration OS" and framed the
procurement console as the product.

Independent review (owner-commissioned) reached the same conclusion:
"we may have framed it around our own system architecture instead of the
specific problem the competition needs solved."

Full mapping and scoring: `engineering/reviews/PS1-FIT-ASSESSMENT.md`
(fit 7/10 as positioned; 9/10 ceiling after reframe + beta sessions).

## Problem

Judges scoring "developer infrastructure" will look for what a *developer*
gets: SDK, playground, evaluation tools, docs. Our framing made them work to
find it — a real risk under deadline, not a code defect.

## Decision

**Reposition the submission artefact as developer infrastructure for
governed N-ATLAS integration; reposition the procurement app as the reference
implementation/demonstration of that infrastructure.**

Canonical one-liner:

> NEIOS — developer infrastructure for integrating, testing and deploying
> N-ATLAS safely: an OpenAI-compatible adapter, a deterministic governance
> toolkit (policy-before-model, validation, provenance, audit), a
> golden-fixture evaluation harness, and a local official-ASR serving shim —
> demonstrated by a working procurement reference application.

## Scope of the change

Documentation and narrative only — **zero code changes**:
- `README.md` reordered: packages/SDK first, reference app as demonstration
- `docs/04-architecture/NEIOS-CURRENT-SYSTEM.md` — already written in this
  framing (components-first); headline aligned
- `narration_script_v3.md` — narration reframed per chapter
- Submission-facing text (any application-form description) follows the
  canonical one-liner above.

## What does NOT change

- Product name stays **NEIOS** (per ADR-0004); tagline shifts from
  "Enterprise Integration OS" to "developer infrastructure for N-ATLAS."
- No features added, no rebuild — ADR-0003 scope freeze stands.
- The governance/enterprise story stays as *content* inside the pipeline —
  it is our differentiation inside PS1, just not the headline.
- PS2 wedge stays honestly labelled (Q-0004).

## Consequences

- Judges see the PS1 checklist immediately (SDK ✓ playground ✓ eval tools ✓
  docs ✓) instead of inferring it from a product pitch.
- Any doc or narration that still leads with "enterprise product" is now
  stale relative to this ADR.
- Beta session framing unchanged — testers exercise the app; the *story* to
  judges is what changed.
