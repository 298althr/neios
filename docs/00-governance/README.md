---
document_id: GOV-000
title: Governance overview
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER (placeholder)
created: 2026-10-08
---

# Governance

The governing method is `software-engineering-template-generation-skill.md` (repo root).

## Documents

- `PROJECT-CLASSIFICATION.md` — project classification and required rigor
- `team-model.md` — roles and authority
- `engineering-workflow.md` — lifecycle, gates, communication and evidence rules

## Governance gates

| Gate | Question | Applies |
|---|---|---|
| G0 Intake | What is being built, why, who owns it, what is unknown? | every work item |
| G1 Context | Is reality captured? Boundaries and sources known? | phase entry |
| G2 Requirements | Requirements clear, testable, conflicts resolved? | before build |
| G3 Architecture | Boundaries, failure modes, security built in? | before build |
| G4 Build | Tasks traceable, dependencies known, changes recorded? | during build |
| G5 Validation | Works, satisfies requirements, evidence sufficient? | before release |
| G6 Release | Authorized, operational controls ready, rollback defined? | every release |
| G7 Operations | Observable, incidents managed, changes controlled? | ongoing |

## Reversibility lanes (also the product's own model)

- **Lane 0** read-only — auto-approve
- **Lane 1** reversible — auto-approve + log
- **Lane 2** expensive to undo — human/reviewer approval
- **Lane 3** irreversible — human + org-level approval, verified preconditions, rollback plan
