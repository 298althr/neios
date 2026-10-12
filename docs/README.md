# docs/ — Controlled engineering documentation

Every document here carries status metadata (DRAFT / PROPOSED / APPROVED / ACTIVE /
SUPERSEDED / DEPRECATED / RETIRED) and an owner. Corrections supersede — they never
erase history.

## Directory map

| Dir | Contents |
|---|---|
| `00-governance/` | Roles, workflow, gates, lanes, classification |
| `01-context/` | Project context + supplied source documents (evidence, E2) |
| `02-requirements/` | Requirements index and templates |
| `03-research/` | Research findings, spikes, evaluations |
| `04-architecture/` | Architecture narratives (system of record: `architecture/`) |
| `05-design/` | Design docs, API contracts, UX specs |
| `06-data/` | Data contracts, schemas, lineage, retention, privacy |
| `07-security/` | Security model, threat model, secrets, incident response |
| `08-testing/` | Test strategy, test plans, V&V criteria |
| `09-operations/` | Runbooks, observability, on-call |
| `10-deployment/` | Deployment model, environments, rollout |
| `11-decisions/` | Index → `engineering/decisions/` (ADRs) |
| `12-risks/` | Index → `engineering/risks/` + RISK-REGISTER |
| `13-releases/` | Release records, release notes, approvals |
| `14-incidents/` | Incident reports, postmortems |
| `15-handover/` | Handover docs, operational maturity checklist |

## Source-of-truth map

| Artifact | Source of truth |
|---|---|
| Product requirements | maintained in the local archive (not published) |
| Historical product context | private context pack, available to evaluators on request |
| Architecture decisions | `engineering/decisions/` (ADRs) |
| System architecture | `architecture/system/` |
| Implementation | `apps/`, `packages/` |
| Database schema | `migrations/` |
| Operational procedure | `docs/09-operations/` |
| Security policy | `docs/07-security/` |
| Test evidence | `engineering/validations/` |
| Release state | `docs/13-releases/` |
| Issues / tasks | `engineering/issues/`, `engineering/tasks/` |

**Conflict rule:** if two sources disagree, open a discrepancy issue in
`engineering/issues/`. Do not silently choose one.
