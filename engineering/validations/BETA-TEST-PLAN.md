---
document_id: VAL-BT-004
title: Beta test plan — two external testers (PS1 requirement)
status: ACTIVE
version: 0.1.0
owner: PROJECT OWNER
created: 2026-10-12
---

# Beta test plan — NEIOS (PS1: Developer Infrastructure)

PS1 requires **at least 2 external beta testers**. This plan assigns each
tester a different job, because NEIOS is two things: developer tooling AND a
working governed workflow. Tester 1 validates the "developer" half; Tester 2
validates the "it actually works for a real user" half.

Pairs with: `BETA-TESTER-SESSION-SCRIPT.md` (facilitator script, T0–T8),
`BETA-TESTER-REPORT-TEMPLATE.md` (what gets filled in), `BETA-TESTER-ONBOARDING.md`
(recruiting + access methods).

---

## Rules for testing (both testers — read/send this verbatim)

1. **You are testing the product, not yourself.** Anything confusing or broken
   is a finding we want — not your fault.
2. **Work in your own words.** No script tells you what to type or say into it.
   Use a request that is realistic *to you*.
3. **Think aloud.** Say what you expect before you click; say what surprised
   you after.
4. **No coaching.** The facilitator will not explain or correct during tasks —
   they only observe. If you get stuck, say so and move on when ready.
5. **Try to break it.** Weird input, wrong language, nonsense text — all valid.
6. **Honesty over politeness.** "I wouldn't trust this" is a top-value answer.
7. **Consent:** the session may be screen-recorded for evidence; no real names
   go into the repository — you are `BT-01` / `BT-02`.
8. **Time:** 20–40 minutes total, plus ~10 min to fill the report immediately
   after (not later from memory).

---

## TESTER 1 — Technical / Developer (BT-01)

### Skills required

- Comfortable with `git clone`, Node.js + pnpm, running a dev server.
- Can read a README and follow setup steps unaided.
- No AI/ML experience needed; no Nigerian language needed.
- Has never seen NEIOS before.

### What they do (~40 min)

| Step | Task | What it proves |
|---|---|---|
| D1 | **Cold start:** receive only the repo link + `.env.example`. Clone and get the app to `localhost:3000` using the README alone. Note every missing/unclear step. | README truthfulness — the "a stranger can run this" claim |
| D2 | **SDK probe:** from `packages/natlas-adapter` + `packages/governance`, figure out how to send one governed request via `scripts/neios-run.ts` (or the UI if scripts are opaque). Say out loud where the model call actually happens. | The packages are consumable as developer infrastructure, not just app internals |
| D3 | **Policy probe:** try a request that should be blocked (e.g. asking the system for a wire transfer / anything outside the role). Confirm it stops *before* the model runs. | Deterministic policy is real, discoverable |
| D4 | **Evidence probe:** open `data/audit/audit-log.jsonl` and `engineering/metrics/`. Can they tell which entries are theirs? Do they believe the eval report is real? | Audit/provenance credibility |
| D5 | **Break it (optional):** kill the model endpoint or use a bad URL. What does the system do — crash, lie, or report honestly? | Failure honesty |
| D6 | **MCP live test (optional, preferred if time):** follow `packages/neios-mcp/README.md` — add the server to their MCP client (Claude Desktop/Windsurf) or run `pnpm --filter @neios/mcp test` for the stub suite, `pnpm --filter @neios/mcp test:live` if a live `NATLAS_BASE_URL` is available. Call `neios_submit_request` with a procurement request, confirm `pending_approval`, then `neios_record_decision` + `neios_audit_tail`. **No live endpoint on the tester's machine?** Run `pnpm --filter @neios/mcp test` (stub) instead — full governed path without a model. For a live run, owner provides `NATLAS_BASE_URL` (Vast instance, or local Ollama only on a machine with ~8-12 GB free VRAM — the model is an 8B GGUF; owner's laptop 4060 is not a target). | The agent-facing entry point actually works end-to-end for an outsider |

### Their deliverable

`engineering/validations/BETA-TEST-RESULT-BT-01.md` — report template filled
(Sections A–D required): per-step result, time-stuck, verbatim comments,
friction list (severity-rated), 1–5 ratings, free text. **Include the exact
command or step where setup failed or confused** — that's the gold.

---

## TESTER 2 — Operations / Business user (BT-02)

### Skills required

- Works in procurement, admin, operations, SME management, or field work.
- Basic computer use only — **no coding, no terminal**.
- Bonus (not required): can phrase a request in Pidgin, Hausa, Yoruba, or Igbo —
  makes the multilingual test real.
- Has never seen NEIOS before.

### What they do (~20–30 min, facilitator runs T0–T8)

| Step | Task | What it proves |
|---|---|---|
| U0 | First look: "what do you think this does?" | Value prop comprehension without explanation |
| U1 | Read the sample request; say what's being asked | Domain readability |
| U2 | **Their own request:** type (or voice-record/upload) a purchase/work request in their own words — English, Pidgin, or their own language | Real-use input, voice wedge |
| U3 | Run the pipeline; explain back what happened at each stage | The governed loop is understandable, not magic |
| U4 | The draft waits for them — approve or reject, and say why | Human-in-the-loop is understood and felt |
| U5 | (If they can) same request in their own language | Multilingual claim with a real speaker |
| U6 | Open Audit; find everything they just did | Audit trail credibility |
| U7 | Trust probe: "would you let this draft invoices at your organisation? what would need to be true first?" | The impact quote for the submission |

### Their deliverable

`engineering/validations/BETA-TEST-RESULT-BT-02.md` — same template. Verbatim
quotes matter most here (especially U7). Failures count as findings — a
confused tester on camera is worth more than a smooth one.

---

## What "counts" as a completed session (acceptance)

- Tester is genuinely external (not the owner, not a contributor).
- BT-01: attempted D1–D4, reported at least one friction point OR clean pass
  with timings.
- BT-02: attempted U0–U6 in their own words; U7 answer recorded verbatim.
- Report filed within 1 hour of the session; dated; tester ID not real name.
- Facilitator notes (Section E) added by the owner.

## Time-boxed fallback (same-day deadline)

If a tester can't do the full session: **do U2→U7 only** (Tester 2) or
**D1+D3 only** (Tester 1). A 20-minute honest session with a dated report
satisfies the requirement far better than a perfect plan never run.
If the model endpoint is down that hour, the failure path itself is a valid
finding — record it and keep going (ASR is local, so voice still works).
