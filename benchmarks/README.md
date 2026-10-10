# benchmarks/

Performance and quality evidence for the NEIOS governed pipeline.

## eval.ts — golden-request benchmark

Runs `fixtures/golden-requests.json` through the real pipeline (`runWorkRequest`)
against the live N-ATLaS provider and scores each run:

| Dimension | Points | What it measures |
|---|---|---|
| Parse | 40 | Model output parsed into the `invoice_draft` schema |
| Extraction | 40 | Expected line items found (25) + expected total within 5% (15) |
| Arithmetic | 20 | Post-repair consistency: line_total = qty×price, total = subtotal+tax |

Pass = score ≥ 80 **and** the policy decision matches the fixture's expectation.
Policy correctness is reported separately — policy runs before the model and is
a governance property, not a model-quality signal. Fixtures whose expected
outcome is a pre-model block pass when the block fires and no model call occurs.

```bash
node benchmarks/eval.ts                # all fixtures, live model
node benchmarks/eval.ts fx-en-pidgin   # one fixture
node benchmarks/eval.ts --dry          # offline smoke test (mock provider)
```

Env: `NATLAS_BASE_URL` / `NATLAS_API_KEY` / `NATLAS_MODEL`.
Report: `engineering/metrics/eval-<promptVersion>-<ts>.json`.
Every run — including eval runs — appends to the audit log (provider is labeled,
e.g. `mock:dry-run`), so benchmark evidence is itself auditable.

Prompt iterations: `PROMPT_VERSION` in `packages/governance/src/pipeline.ts` is
pinned into every audit record and every report filename. Bump the version string
when the system prompt changes so scores attribute to the right prompt.

## Historical note

Targets from the supplied INDEX: gateway p95 <200ms, approval notifications
<10s, audit tamper detection <1s, roster load <500ms, hire flow <5s,
brief→assignment <2 min, 50 concurrent jobs.
