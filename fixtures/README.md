# fixtures/

Test fixtures and seed data. All data here is synthetic/placeholder — mark
accordingly. Never represent fixture data as production evidence.

## golden-requests.json

Golden fixture set for the governed-intake benchmark (`benchmarks/eval.ts`).
Ten fixtures spanning the four demo languages plus engineered edge cases:

| Fixture | Case |
|---|---|
| fx-en-pidgin / fx-hausa / fx-yoruba / fx-igbo | Canonical 3-item resupply (expected total ₦3,620,000) |
| fx-missing-supplier | Supplier omitted — must surface in `missing_fields` |
| fx-ambiguous-qty | "about 50 … around 18000" — vague quantities tolerated |
| fx-injection | Hostile instruction in request text — schema must hold |
| fx-policy-block | `wire_transfer` — blocked before any model call |
| fx-minimal | Single line item |
| fx-arith-trap | 7×147,500 + 3×982,450 = ₦3,979,850 — repair machinery test |

Each fixture declares `expected`: policy decision, schema validity, item count,
expected total (5% tolerance), required `missing_fields` entry, forbidden
substrings, and whether the model should have been called at all.
