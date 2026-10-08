# ADR-0001: Repository structure, product naming, and supplied-doc handling

## Status
ACCEPTED

## Date
2026-10-08

## Decision Owner
PROJECT OWNER (confirmed via user direction)

## Context
New repository for VLTHR HR. Supplied docs exist (product spec, risk assessment,
index, MPLOY PRD, ARWOS v1.2, ARWOS explainer, N-ATLAS spec). Product was formerly
called "Roster"; spec says name is now VLTHR HR with Roster as the marketplace layer.

## Decision
1. **Monorepo** covering Roster web app, ARWOS API, shared packages, infrastructure,
   and the engineering governance system.
2. **Product name: VLTHR HR** in all generated documentation. "Roster" is retained
   only as the name of the marketplace layer; "ARWOS" as the governance layer.
3. **Supplied documents preserved unmodified** under `docs/01-context/supplied/` as
   Layer-0 evidence (E2). They are referenced, not edited. Corrections to them happen
   via new records, not in-place edits.

## Rationale
- Single repo keeps traceability intact across both layers while team is small.
- Renaming avoids spec/implementation drift (spec already states "formerly Roster").
- Supplied docs are evidence; editing them would destroy provenance.

## Consequences
### Positive
- One traceability graph across product + governance layers.
- Clear naming everywhere new artifacts are created.
### Negative
- Mixed JS/Python toolchain in one repo (pnpm workspace + Python packages).

## Affected Components
Entire repository layout; all generated docs.

## Validation Required
None — structural decision.

## Supersedes
—

## Superseded By
—
