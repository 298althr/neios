---
document_id: LEG-001
title: N-ATLaS licensing note
status: DRAFT
version: 0.1.0
owner: PROJECT OWNER
created: 2026-10-08
---

# N-ATLaS licensing note

Required per `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §25.

## Attribution

> "N-ATLaS is an initiative of the Federal Ministry of Communications, Innovation
> and Digital Economy, and powered by Awarri Technologies."

If renamed/rebranded, derivatives must carry the suffix **"Powered by Awarri."**
NEIOS satisfies this via its own naming and this note.

## License name

"Open-Source Research and Innovation License" (Awarri Technologies / Federal
Ministry of Communications, Innovation and Digital Economy), inspired by
Apache 2.0/MIT with additional restrictions. Full terms:
private context pack model-card fetch, 2026-10-08 (see
`docs/03-research/N-ATLAS-ACCESS-FINDINGS.md` for source).

## User cap

1,000 active end-users (rolling 30-day window) before a commercial license from
Awarri Technologies is required. NEIOS, as a competition entry, is not expected
to approach this cap.

## Permitted use categories (as stated in the license)

Academic/non-profit research; accessibility; language/cultural preservation;
civic technology and public benefit applications; education/training/community
innovation.

## Current limitations relevant to NEIOS

Dialectal/accent bias; reduced accuracy with code-switching; degraded performance
in noisy environments; human-evaluation scores vary materially by language
(English 4.21/5.0, Hausa 3.98/5.0, Igbo 3.87/5.0, Yoruba 2.69/5.0 per the model card).
NEIOS surfaces review requirements rather than hiding this uncertainty (direction
doc §6).

## Statement on commercial rights

This submission does not claim, and should not be read as claiming, any
commercial licensing rights to N-ATLaS beyond what the stated Open-Source Research
and Innovation License already grants. Any future commercial deployment of NEIOS
at scale requires a separate conversation with Awarri Technologies — tracked as
open item U-016 in `engineering/UNCERTAINTY-REGISTER.md`.
