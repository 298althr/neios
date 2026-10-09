# NEIOS Demo — Narration Script & Chapter Plan (v2 — oil & gas use case)

Target: NAIC 2026, PS1 Developer Infrastructure. Runtime ≈ 4–5 min.
Recording: Playwright 1920×1080 viewport capture of `localhost:3000` with visible
demo cursor (`?cursor=1`), plus rendered-evidence title/terminal pages.
Voice: en-NG-AbeoNeural (Nigerian English, male) — edge-tts. No Hausa/Yoruba/Igbo
TTS exists; narration stays English, *inputs* demo all four languages.
Use case: **oil & gas procurement** — Energy Procurement Officer role, flowstation
resupply request (12 butterfly valves + 40 gasket kits + 50 PPE coveralls).
All claims verified against `engineering/evidence/` and `data/audit/audit-log.jsonl`.

---

## CH1 — Title & Problem (~20 s)

**Visual:** Title card — "NEIOS — N-ATLAS Enterprise Integration OS" /
"Turning N-ATLAS intelligence into governed, auditable work" / NAIC 2026 · PS1.

**Narration:**
> "N-ATLAS gives Nigeria a language model built for its languages and context.
> But an enterprise can't put a raw model call inside a real work process —
> there's no policy, no validation, no approval, no audit trail.
> NEIOS is the integration layer that fixes that. This demo shows a real
> oil-and-gas procurement request running through the full governed pipeline,
> live, on actual N-ATLAS inference."

## CH2 — The Console (~25 s)

**Visual:** Intake view — nav (Intake / Approvals / Audit), status pill
"N-ATLaS Q4_K_M · GOVERNED", role line, four language chips, request box.

**Narration:**
> "This is the console — a control surface, not a chat box. Intake is where
> requests are raised; Approvals is where consequential drafts wait for a human;
> Audit is the append-only record of everything the system did.
> The role on screen is the Energy Procurement Officer — a role card that fixes
> what this agent may do, in which languages, and what must be approved."

## CH3 — Live run, Nigerian English (~60 s)

**Visual:** "English (Pidgin)" chip → Run. Trace populates live. Model stage
shows provider + latency + model ID. Invoice table renders: butterfly valves,
gasket kits, PPE coveralls → ₦3,620,000. Provenance chips below.

**Narration:**
> "A field request, in Nigerian business English: twelve butterfly valves at a
> hundred and eighty-five thousand, forty gasket kits at twelve-five, fifty
> coveralls at eighteen thousand.
> Watch the trace. Policy runs first — before the model — and puts this in
> lane two: consequential, human approval required. Then the real N-ATLAS call —
> about three and a half seconds on a rented RTX 3090.
> The output isn't prose. It's a validated invoice draft — three million six
> hundred and twenty thousand naira, arithmetic checked deterministically, never
> by the model. Every field carries provenance: what came from the request,
> what the model inferred, what the system computed."

## CH4 — Same workflow, three more languages (~45 s)

**Visual:** Hausa chip → Run (full trace). Then quick cuts: Yoruba and Igbo
runs, invoice tables landing correctly.

**Narration:**
> "Now the same governed workflow in Hausa — the model extracts the line items
> and the validator enforces the arithmetic.
> Yoruba. Igbo. Four languages, one pipeline, identical controls.
> If the model ever miscalculates — and small models do — the system repairs the
> arithmetic deterministically and names every correction in the trace. Nothing
> is silently fixed."

## CH5 — Policy block (~30 s)

**Visual:** Terminal-style trace: `neios-run.ts --blocked` → POLICY ✗ red,
MODEL·RESULT·EVIDENCE·APPROVAL skipped, AUDIT ✓ still appended, final: blocked.

**Narration:**
> "Governance only matters if it can say no. Here a request to move funds hits
> the policy gate and is blocked — before the model is ever called. The model
> never sees it; it can't be talked around. And the block itself is audited."

## CH6 — Human approval (~35 s)

**Visual:** Approvals view — pending draft row with request id; cursor clicks
Approve; row clears; cut to Audit where the linked `approved` record appears.

**Narration:**
> "Nothing consequential ships itself. The invoice draft waits in the approvals
> queue. Approving appends a second audit record under the same request ID —
> the human decision is part of the trail, not a side-channel. Rejection works
> the same way."

## CH7 — Audit & evidence (~30 s)

**Visual:** Live `/audit` page — table of real records: blocked, failed,
pending, approved — scroll, model request IDs and validation results visible.

**Narration:**
> "Every run — success, block, or failure — lands in this append-only log: who
> asked, which policy decided, which model answered, the hash of its output,
> and the final state. Including the failures. An auditor can replay the whole
> session."

## CH8 — Wrap (~25 s)

**Visual:** Outro card — repo URL, "full demo ran on < $1 of rented GPU".

**Narration:**
> "That's NEIOS: real N-ATLAS inference inside deterministic controls, with
> evidence a regulator could read. The whole demo ran on less than a dollar of
> rented GPU — and the cost ledger is in the repository, because every dollar
> was documented too."

---

## Shot list (recording order)

| # | Take | Source | Needs model? |
|---|---|---|---|
| 1 | Title card | rendered HTML (build_pages.py) | no |
| 2 | Console tour (nav, chips, panels) | Playwright + cursor | no |
| 3 | English/Pidgin run | Playwright live | YES |
| 4 | Hausa run (+YO/IG cutaways) | Playwright live | YES |
| 5 | Blocked-run terminal | rendered from real evidence JSON | no |
| 6 | Approvals queue → approve → audit link | Playwright live | YES (needs a pending run) |
| 7 | Audit explorer | Playwright live page | no |
| 8 | Outro card | rendered HTML | no |

## Pre-flight checklist

- [ ] Instance `54838985` started + tunnel on 18000 + warm-up call (~45 s cold)
- [ ] Dev server on :3000; viewport 1920×1080; `?cursor=1` overlay active
- [ ] Audit log readable on camera — no sensitive data
- [ ] All 4 language examples verified today
- [ ] Script approved by owner
