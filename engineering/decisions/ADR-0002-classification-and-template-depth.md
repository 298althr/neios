# ADR-0002: Project classification C3 / consequence Level 2 and template depth

## Status
PROPOSED — awaiting PROJECT OWNER ratification

## Date
2026-10-08

## Decision Owner
Agent (Devin) proposing; PROJECT OWNER to ratify.

## Context
Template depth must scale with complexity and consequence. Supplied spec describes a
multi-tenant marketplace + governance control plane handling enterprise data,
payments, and an immutable audit trail, with NDPA obligations.

## Decision
Classify as **C3 (complex)** product type (SaaS + marketplace + AI platform +
governance plane) at **consequence Level 2 (high)** — full template depth: ADRs,
threat model, risk register, change control, release governance, runbooks, DR,
reproducibility. Not C4: no formal V&V/regulated-infrastructure controls yet.

## Rationale
- Under-governing would leave the product's own governance claims unsupported.
- C4 ceremony (formal verification, regulated change control) is not yet warranted.

## Consequences
### Positive
- Governance rigor matches what the product promises customers.
### Negative
- Heavier record-keeping burden for a small team.

## Risks
- If N-ATLAS challenge scope merges in (U-003), classification may need revision.

## Affected Components
All of `docs/`, `engineering/`, `product/`, `architecture/`.

## Validation Required
Owner sign-off; revisit at Phase 0 exit or scope change.

## Supersedes
—

## Superseded By
—
