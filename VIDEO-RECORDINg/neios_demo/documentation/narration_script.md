# NEIOS Demo — Narration Script & Chapter Plan

Target: NAIC 2026, PS1 Developer Infrastructure. Runtime ≈ 4–5 min.
Recording: Playwright 1920×1080 viewport capture of `localhost:3000` + CLI cuts.
Voice: TTS (edge-tts neural) or owner-recorded audio synced to this script.
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
> procurement request running through the full governed pipeline, live,
> on actual N-ATLAS inference."

## CH2 — The Playground (~25 s)

**Visual:** UI at localhost:3000. Cursor tours the layout: work-request box,
language example buttons, trace panel, audit log below.

**Narration:**
> "This is the playground — deliberately a control panel, not a chat box.
> Up top: the work request, with one-click examples in Nigerian English,
> Hausa and Yoruba. Below it, the execution trace will show every governed
> stage — request, context, policy, model, result, evidence, approval, audit —
> and at the bottom, the append-only audit log."

## CH3 — Live run, Nigerian English (~60 s)

**Visual:** Click "English (Pidgin)" example → Run. Trace populates live.
Model stage shows `openai-compat` provider + latency + model ID. Invoice
appears: 50 bags rice @ 45,000 + 20 cartons Indomie @ 8,000 = ₦2,410,000.
Provenance list renders below.

**Narration:**
> "A real request, in Nigerian business English: fifty bags of rice at
> forty-five thousand, twenty cartons of Indomie at eight thousand.
> Watch the trace. Policy runs first — before the model — and flags this as
> lane two: consequential, needs human review. Then the actual N-ATLAS call,
> about three and a half seconds on a rented RTX 3090.
> The output isn't prose — it's a validated invoice draft. Two million four
> hundred and ten thousand naira — the arithmetic was checked
> deterministically, not by the model. And every field carries provenance:
> what came from the request, what the model inferred, what the system
> computed."

## CH4 — Hausa run (~35 s)

**Visual:** Click "Hausa" example → Run. Same pipeline, Hausa source text
extracted correctly into the invoice items.

**Narration:**
> "Now the same workflow in Hausa. Same pipeline, same controls — the model
> extracts the line items correctly and the validator enforces the arithmetic.
> If the model miscalculates — and small models do — the system corrects
> line totals deterministically and names every repair in the trace. Nothing
> is silently fixed."

## CH5 — Policy block (~30 s)

**Visual:** CLI `node scripts/neios-run.ts --blocked`. Trace shows POLICY ✗,
MODEL·RESULT·EVIDENCE·APPROVAL skipped, AUDIT still written.

**Narration:**
> "Governance only matters if it can say no. Here's a request to wire funds —
> the deterministic policy gate blocks it before the model is ever called.
> The model never sees it, can't talk its way around it. And the block itself
> is still audited."

## CH6 — Human approval (~35 s)

**Visual:** Back in UI — pending draft, click **Approve**. Audit log gains a
linked record: same request ID, `final: approved`.

**Narration:**
> "Nothing consequential ships itself. The draft waits on a human. Approving
> appends a second audit record linked by request ID — the decision is part
> of the trail, not a side-channel. Reject works the same way."

## CH7 — Audit & evidence (~30 s)

**Visual:** `data/audit/audit-log.jsonl` — scroll recent records showing
requestId, policy result, model request ID, output hash, validation result,
final state. Flash `engineering/evidence/` JSON files.

**Narration:**
> "Every run — success, block, or failure — appends a tamper-evident record:
> who asked, which policy decided, which model answered, the hash of what it
> produced, and how it ended. Twenty-two records so far, including the
> failures — those are in the trail too."

## CH8 — Wrap (~25 s)

**Visual:** Title card — repo URL, "runs on $5 of rented GPU", stack line.

**Narration:**
> "That's NEIOS: real N-ATLAS inference, inside deterministic controls, with
> evidence a regulator could read. Built in days, documented as it was built —
> and the whole demo ran on less than a dollar of rented GPU. The code,
> runbooks, cost ledger and validation metrics are all in the repository."

---

## Shot list (recording order)

| # | Take | File | Notes |
|---|---|---|---|
| 1 | Title cards | generated PNG → ffmpeg | no capture needed |
| 2 | UI overview tour | ch2.webm | slow cursor sweep of panels |
| 3 | EN run | ch3.webm | click Run, wait ~5 s, scroll invoice+provenance |
| 4 | HA run | ch4.webm | same |
| 5 | blocked CLI | ch5.webm | terminal capture OR scripted console page |
| 6 | approve click | ch6.webm | approve + audit-log refresh |
| 7 | audit file | ch7.webm | editor view of JSONL + evidence dir |
| 8 | outro card | generated | ffmpeg |

## Pre-flight checklist

- [ ] Instance `54838985` started + tunnel on 18000 + warm-up call (~45 s cold load)
- [ ] Dev server on :3000, playground loaded, viewport 1920×1080
- [ ] Audit log reviewed — no sensitive data on screen
- [ ] 4 language examples verified working today
- [ ] Script approved by owner
