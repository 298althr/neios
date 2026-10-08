# VLTHR HR

**Managed AI Workforce & Governance Platform**

VLTHR HR is a two-layer platform:

1. **Workforce layer (marketplace):** customers browse, hire, and assign AI employees (Data Analyst, Web Researcher, Software Engineer, etc.), paying per job on a credit system.
2. **ARWOS layer (governance & control plane):** ensures every agent action is audited, approved according to reversibility, and traceable. All agent access to external systems flows through the tool gateway. The audit log is append-only and tamper-evident.

- **Status:** Bootstrap complete — pre-Phase 0
- **Primary market:** Nigeria (Pan-Africa Phase 2, Global Phase 3)
- **Supplied product context:** [`docs/01-context/supplied/`](docs/01-context/supplied/)

## Repository structure

| Path | Contents |
|---|---|
| `apps/vlthr-hr-web/` | Customer-facing marketplace UI (Next.js 15 + shadcn/ui) |
| `apps/arwos-api/` | Governance & control plane API (FastAPI) |
| `packages/role-cards/` | Role Card schema — every AI employee is a config file |
| `packages/shared/` | Shared types/utilities |
| `docs/` | Controlled engineering documentation (00-governance → 15-handover) |
| `engineering/` | Work-management records: issues, tasks, decisions, risks, evidence, changes |
| `product/` | Problem, users, use cases, requirements, acceptance |
| `architecture/` | System, components, interfaces, integrations, security, deployment |
| `infrastructure/` | Kubernetes / deployment manifests |
| `tests/` | Integration, E2E, security, load tests |
| `scripts/`, `tools/` | Dev tooling |
| `config/`, `migrations/`, `fixtures/`, `examples/`, `benchmarks/` | See READMEs |

## Engineering workflow

This repository is governed by the Software Engineering Operating Repository model.
Before writing code, read:

1. [`docs/00-governance/README.md`](docs/00-governance/README.md) — roles, gates, reversibility lanes
2. [`docs/01-context/PROJECT-CONTEXT.md`](docs/01-context/PROJECT-CONTEXT.md) — what exists and where it came from
3. [`docs/00-governance/PROJECT-CLASSIFICATION.md`](docs/00-governance/PROJECT-CLASSIFICATION.md) — C3 / Level-2 classification
4. [`engineering/`](engineering/) — issues, tasks, decisions, risks, evidence

**Key rules:**

- No implementation without a task linked to a requirement.
- Consequential decisions are recorded as ADRs in `engineering/decisions/`.
- Corrections supersede; they do not erase history.
- Claims without evidence are marked `ASSUMPTION`, `HYPOTHESIS`, or `UNKNOWN`.
- Material conclusions from chat/email/meetings must be transferred into this repository.

## Getting started

```bash
# Frontend (Workforce layer)
cd apps/vlthr-hr-web && pnpm install && pnpm dev

# Governance API (ARWOS layer)
cd apps/arwos-api && pip install -e ".[dev]" && uvicorn app.main:app --reload
```

## License

Proprietary — license terms to be confirmed (see `LICENSE`).
