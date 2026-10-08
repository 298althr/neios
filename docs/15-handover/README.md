---
document_id: HND-DIR
title: Handover
status: ACTIVE
version: 0.1.0
created: 2026-10-08
---

# 15-handover

Handover standard — a competent new engineer must be able to understand, run, test,
modify, deploy, monitor, troubleshoot, and safely change the system **without
undocumented tribal knowledge**.

## Handover packet order (for agent/agent or human/human transitions)

1. Status and current gate first
2. Decisions made (ADR references)
3. Open items
4. Do-not-touch list
5. Open questions
6. Evidence last

Incoming agent/engineer reads in that order and does not override prior decisions
without a superseding ADR.
