# ADR-0003: NAIC 2026 submission scope — problem statement, product cut, naming

## Status
ACCEPTED

## Date
2026-10-08

## Decision Owner
PROJECT OWNER

## Context
NAIC 2026 ("Build with N-ATLAS") deadline is 2026-10-12 23:59 WAT. Official rules
(ncair.nitda.gov.ng/naic/, confirmed via live fetch) require choosing exactly one of
three fixed problem statements, each with a different validation bar:

- PS1 Developer Infrastructure — 2+ external beta testers
- PS2 Voice-First Access — 50+ documented real user interactions
- PS3 Sectoral Fine-Tuning — 500+ example benchmark vs base model

Full "N-ATLAS API credentials" are an acceleration-phase perk for shortlisted teams
only (post-deadline); at submission time, access is self-service via the gated
Hugging Face model (`NCAIR1/N-ATLaS`) — no dedicated hosted inference API exists yet.

Team is solo (PROJECT OWNER + this agent). Prior ADR-0001 named the marketplace layer
"Roster"; this ADR supersedes that naming in all documents.

## Decision
1. **Problem statement: PS1 (Developer Infrastructure).** ARWOS's gateway + Role Card
   pattern is repositioned, honestly, as a governed SDK/abstraction over N-ATLAS
   endpoints; the Next.js app becomes the "interactive browser-based playground"
   PS1 names as an example solution.
2. **Framing: branded.** The submission is explicitly positioned as a cut-down
   release of the larger ARWOS/VLTHR HR governed-workforce product, not a disposable
   hackathon artifact — ties directly to NAIC's own winner perks (government
   procurement review, ONDI incubation, investor intros).
3. **Artefact name: "ARWOS Kit for N-ATLAS"** (full form carries the N-ATLaS license's
   required attribution: "ARWOS Kit for N-ATLAS — Powered by Awarri").
4. **Worked example: simplified.** One clean flow — voice/text input (local language)
   → structured invoice output — not the fuller invoicing+compliance-paperwork hybrid
   originally proposed. Reduces build risk inside the 4-day window.
5. **Working artefact target: local-only + video.** No live deployment commitment;
   the official rules accept a repository as a valid artefact, and the N-ATLAS
   strategy doc explicitly warns against burning days on deployment infra. A true
   "3 commands to run" local quick-start is mandatory.
6. **Marketplace-layer rename: "Roster" → "Workforce."** Since "VLTHR HR" now names
   the whole product, the upper marketplace layer is renamed "Workforce" everywhere
   (supplied docs included, per explicit owner instruction — see Rule 5 exception
   below). "Workforce + ARWOS" replaces "Roster + ARWOS" throughout.
7. **Beta testers:** 2 external testers already available to the PROJECT OWNER;
   sourcing is not a blocked item.
8. **AI-tooling disclosure:** not mentioned in the Team Profile submission component.

## Rationale
PS1 has the lowest, most achievable validation bar for a solo 4-day build, and is
also the *best product fit* — not a forced one. PS2/PS3 both require capabilities
(a live user base, or ML fine-tuning + benchmarking) the team does not have time or
tooling to produce credibly by the deadline.

## Consequences
### Positive
- Submission scope is now bounded and achievable.
- Competition narrative and long-term VLTHR HR commercial narrative are unified,
  not parallel efforts.

### Negative
- Full ARWOS Phase 0 (38 requirements) is explicitly NOT built for this submission —
  "ARWOS Kit" implements only the slice needed to demonstrate the governance pattern
  (gateway stub, audit log, one approval lane), not production ARWOS.
- Supplied evidentiary documents are edited in place for naming (see exception below),
  which is a deliberate, recorded deviation from the general "preserve unmodified"
  rule in `docs/00-governance/engineering-workflow.md`, authorized here by explicit
  owner instruction.

## Risks
- N-ATLAS model access (Hugging Face gate acceptance) is still pending confirmation
  — see `engineering/UNCERTAINTY-REGISTER.md` U-013.
- NAIC Track B registration (ondi.innox.africa) still pending — U-014.

## Affected Components
`docs/`, `product/`, `architecture/`, `apps/vlthr-hr-web/`, `engineering/`, all
supplied documents under `docs/01-context/supplied/`.

## Validation Required
Confirm HF model access and NAIC registration complete (owner action, today).

## Review Date
2026-10-09 (daily, given 4-day window).

## Supersedes
ADR-0001 (naming section only — monorepo/structure decisions in ADR-0001 stand).

## Superseded By
—
