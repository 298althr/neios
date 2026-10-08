# product/requirements/

Source of truth for product requirements once extracted. Until extraction completes
(a Phase 0 task), the supplied spec is authoritative:

| Range | Source |
|---|---|
| FR-R01–R07 (Roster) | `docs/01-context/supplied/VLTHR-HR-Complete-Product-Spec.md` §3.1 |
| FR-A01–A10 (ARWOS) | spec §3.2 |
| FR-I01–I05 (integrations) | spec §3.3 |
| NFRs | spec §3.4 |
| ARWOS normative requirements (138, P0–P3) | `docs/01-context/supplied/ARWOS v1.2.md` |

Extraction rule: preserve source IDs and section references in each REQ file
(`_templates/REQUIREMENT-TEMPLATE.md`). Do not paraphrase away acceptance criteria.
