---
document_id: GOV-003
title: Engineering workflow
status: ACTIVE
version: 0.1.0
owner: TECHNICAL LEAD (placeholder)
created: 2026-10-08
---

# Engineering workflow

## Lifecycle

```
INTAKE → DISCOVERY → REQUIREMENTS → DESIGN → BUILD → TEST → REVIEW → RELEASE → OPERATE → IMPROVE
```

## Work rules

1. **Definition of Ready:** clear objective, owner, context, known dependencies,
   acceptance criteria, material unknowns identified, acceptable risk, required design.
2. **Definition of Done:** implementation complete, acceptance criteria met, tests pass,
   evidence recorded, reviewed, docs updated, decisions recorded, risks recorded,
   source of truth updated. *"Code exists" ≠ DONE.*
3. Every task is outcome-oriented and links to a requirement. No "work on backend" tasks.
4. Material conclusions from chat/calls/meetings are transferred into `engineering/`
   records. Discussion channels are not the record.

## Evidence rules

Every important claim carries an evidence level:

- **E0** unknown · **E1** assertion · **E2** documentary · **E3** demonstrated ·
  **E4** independently verified · **E5** operationally validated

Never upgrade evidence level because a claim sounds plausible.
Simulated/placeholder data is always marked as such — never presented as production data.

## Records

Templates in `engineering/_templates/`. Record types: issue, task, ADR, deliberation,
assumption, question, risk, change, review, evidence, experiment, validation.

## No silent failure

Failed tests, blocked tasks, rejected decisions, failed experiments, security findings,
and broken assumptions are recorded in `engineering/` when material.
