# Contributing to VLTHR HR

This repository operates under the Software Engineering Operating Repository model
(`software-engineering-template-generation-skill.md`).

## Before you write code

1. Find or create a **requirement** in `product/requirements/` (or the spec in `docs/01-context/supplied/`).
2. Find or create a **task** in `engineering/tasks/` linked to that requirement.
3. Check `engineering/UNCERTAINTY-REGISTER.md` and `engineering/assumptions/` for anything your work depends on.
4. If your work involves a consequential choice (schema, protocol, dependency, security boundary), propose an **ADR** in `engineering/decisions/` before committing to it.

## Change classes

| Class | Examples | Gate |
|---|---|---|
| Reversible | local code change, draft doc, non-prod experiment | record and proceed |
| Consequential | schema migration, permission change, production config, public release | reason + authorized role + validation + review |
| Irreversible | destructive migration, permanent data deletion, externally binding commitment | named approval + verified preconditions + backup + rollback plan |

## Commits and PRs

- Link every PR to a task or issue ID (`TASK-0007`, `ISSUE-0003`).
- Do not silently rewrite history — supersede records instead (`status: SUPERSEDED`, `superseded_by:`).
- Secrets never enter the repo. Use Infisical. See `docs/07-security/secrets-management.md`.

## Where things live

See the source-of-truth map in `docs/README.md`. If two sources disagree, open a discrepancy issue — do not silently pick one.
