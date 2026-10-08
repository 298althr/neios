---
document_id: DPL-DIR
title: Deployment
status: ACTIVE
version: 0.1.0
created: 2026-10-08
---

# 10-deployment

## Known constraints (from supplied docs)

- Kubernetes on Fly.io or DigitalOcean — provider choice unresolved (uncertainty register).
- Cross-region backups required before public beta.
- Environments: dev → staging → prod (staging mandatory for C3).

## Release workflow

```
Idea → Context → Classification → Problem → Requirements → Evidence → Architecture
→ Design → Implementation → Testing → Review → Release Candidate → Validation
→ Approval → Release → Observation → Feedback → Change
```

Release requires gate G6: authorized release, operational controls ready,
rollback/recovery defined. Records in `docs/13-releases/`.
