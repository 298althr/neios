# Validation Metrics — NEIOS vertical slice

Measured 2026-10-08 against the live vast.ai deployment (instance 54838985,
RTX 3090, Ollama serving `hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M` via SSH
tunnel on `127.0.0.1:18000`). Sources: `engineering/evidence/*.json` (raw
responses) and `data/audit/audit-log.jsonl` (every pipeline run).

## Model latency

| Metric | Value |
|---|---|
| Cold (first call after model load) | 45,674 ms |
| Warm min / median / max | 1,757 / 3,658 / 4,147 ms |
| Warm runs measured | 6 |

Cold-start guidance for the demo: fire one warm-up request before recording.

## Pipeline outcomes (22 audit records)

| Final state | Count |
|---|---|
| pending_approval | 11 |
| approved | 3 |
| rejected | 1 |
| blocked (policy, pre-model) | 3 |
| failed (parse/network) | 4 |

Failure mode verified intentionally: with the endpoint unreachable the
pipeline degrades gracefully — MODEL fails, downstream stages skip, an
audit record is still appended (`final: failed`), no unhandled error.

## Validation behaviour

- 11 runs passed schema + arithmetic with zero issues.
- Malformed-JSON output (numeric expression like `2250000 + 160000`):
  caught by parser repair; on unrecoverable cases the governed one-shot
  retry succeeded. No raw model text ever reaches the caller.
- Arithmetic error (`20×8000` emitted as `1,600,000`): caught by
  `validateInvoiceDraft`; `repairInvoiceArithmetic` corrects line_total/
  subtotal/total deterministically and each correction is named in the
  trace + audit (`pass (N arithmetic repairs)`). Unit-verified:
  repair produced `160000 / 2410000 / 2410000`, 0 residual issues.
- Languages exercised: English/Pidgin, Hausa, Yoruba, Igbo — correct
  extraction + NGN arithmetic on structured tasks; Igbo probe returned
  well-formed Igbo with correct diacritics (1,037 ms).

## Cost to date

See `engineering/COST-LEDGER.md` — $0.337 billed, $4.663 of $5 remaining.
