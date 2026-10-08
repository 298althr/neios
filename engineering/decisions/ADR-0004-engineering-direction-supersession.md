# ADR-0004: Adopt owner-supplied Engineering Direction; supersede prior product framing

## Status
ACCEPTED

## Date
2026-10-08

## Decision Owner
PROJECT OWNER (document authored by owner/design-project team, adopted here)

## Context
Following the handoff package request (`docs/15-handover/HANDOFF-NAIC-2026-ARWOS-KIT.md`,
ADR-0003), the owner/design team returned a complete, highly prescriptive engineering
direction document, placed at `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`.
It supersedes several decisions in ADR-0003.

## Decision
Adopt the Engineering Direction document as the controlling product/architecture/
execution reference for the NAIC 2026 submission. Specifically supersede:

| Topic | ADR-0003 (superseded) | New direction (controlling) |
|---|---|---|
| Product category/name | "ARWOS Kit for N-ATLAS" | **"N-ATLAS Enterprise Integration OS"** — governed integration layer for organisations, not an SDK/playground |
| Positioning | SDK + playground + one example, dev-infra framing | Organisational control layer: work intake → context → policy → model → validation → evidence → approval → audit |
| Worked example | Voice/text → structured invoice (simplified) | Nigerian SME procurement request → invoice draft, same spirit, now embedded in a full governed pipeline (APSOS intake, deterministic policy gate, provenance, approval, audit) |
| Future extension | Not specified | "AI Workforce Infrastructure" (i.e. the fuller VLTHR HR/ARWOS vision) is the explicit longer-term layer, not the competition deliverable |
| Buyer | Not specified | B2G primary, B2B secondary |
| Architecture | TypeScript full-stack (carried over, confirmed) | TypeScript/Next.js modular monolith with explicit provider interfaces (ModelProvider, PolicyProvider, ApprovalProvider, AuditStore, ArtifactValidator, ContextProvider) |
| N-ATLAS access path | Community Space / paid endpoint / self-host, ranked | Same ranking, now specific: Priority 1 = live Gradio Space `/gradio_api/openapi.json` adapter |

**Not superseded** (reaffirmed by the new document): PS1 Developer Infrastructure as
the chosen problem statement, local-artefact-first posture, 2 external testers
already available, Oct 12 submission deadline, TypeScript-first technical posture.

## Rationale
The new direction is more deeply researched (includes OSS reuse survey, licensing
constraints, a competing N-ATLAS SDK project already in the ecosystem, and a
day-by-day execution plan with explicit quality gates G0–G8) and avoids the
"generic SDK" positioning risk the owner's design team identified as weak
differentiation. It keeps the ARWOS/VLTHR HR governance philosophy as architectural
DNA without exposing the full 138-requirement specification.

## Consequences
### Positive
- Submission has a sharper, more defensible differentiation ("organisational
  control layer," not "another N-ATLAS wrapper").
- Explicit quality gates and a locked owner-decision table (§33 of the direction
  doc) reduce scope-creep risk inside the 4-day window.

### Negative
- Prior ADR-0003 naming work ("ARWOS Kit for N-ATLAS") and the simplified
  invoice-only worked example are discarded — some rework of already-renamed
  artifacts is needed.
- Introduces new internal framework references (APSOS explicit; PURF, ADCOS, CITM,
  UNPF, UIOS/UIK as architectural influences) that must not be fabricated beyond
  the behavioral principles the direction document itself specifies.

## Risks
- Root repository folder rename (VLTHR-HR → new product name) requested by owner
  separately — operational risk to current session/IDE state, tracked as its own
  decision pending owner confirmation (see Q&A in conversation, not yet an ADR).
- See `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §28 for the full
  risk register specific to this build.

## Affected Components
`docs/15-handover/HANDOFF-NAIC-2026-ARWOS-KIT.md` (now SUPERSEDED),
`engineering/DECISION-LOG.md`, all future implementation work under
`apps/`, `packages/`, `config/`, `data/`, `scripts/` per the direction doc's §18
repository structure.

## Validation Required
Owner confirmation that this adoption is correct (it is based on a document the
owner/team themselves produced, so treated as pre-validated unless corrected).

## Review Date
2026-10-09 (daily, per the 4-day execution plan).

## Supersedes
ADR-0003 (product category, naming, worked-example, positioning sections only —
PS1 choice and artefact-target sections of ADR-0003 remain valid and are reaffirmed).

## Superseded By
—
