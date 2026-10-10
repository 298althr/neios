# NEIOS demo video v2 — narration script

Format: each chapter has a target duration and the narration block (the `>` lines
are what gets synthesized — `narrate.py` extracts them). Narration voice:
Microsoft edge-tts `en-NG-AbeoNeural` (Nigerian English). This is TTS narration,
NOT the N-ATLAS voice model — do not conflate in any documentation.

v2 changes vs v1: light enterprise design system, new voice-intake chapter
(real local N-ATLAS ASR), benchmark chapter (eval harness evidence).

---

## ch1 — Title (~8 s)

Visual: rendered title card. NEIOS logo, tagline, "NAIC 2026 · PS1 Developer Infrastructure".

> NEIOS — the N-ATLAS Enterprise Integration OS. A governed pipeline that turns spoken or typed work requests, in English, Hausa, Yoruba or Igbo, into approved, auditable work output.

## ch2 — Product tour (~18 s)

Visual: intake page, then quick cuts to Approvals and Audit. Cursor moves across nav.

> This is the product a procurement officer sees. One place to describe work — typed, or by voice. The pipeline is printed right on the page: intake, policy, model, validation, approval, audit. Approvals holds everything waiting on a human. Audit holds a record nobody can edit.

## ch3 — Voice intake (~25 s)  **NEW**

Visual: voice row; select Hausa (or English Nigerian accent); press Record (or Upload); transcript lands in the request box; cursor edits a word.

> Field staff don't type forms. They talk. So NEIOS takes a voice note — in any of four Nigerian languages — and transcribes it with the official N-ATLAS speech models, running right here on this machine. The transcript lands in the request for a human to check before anything else happens. Voice is input to the same governance — never a shortcut around it.

## ch4 — Live governed run (~30 s)

Visual: click Run; trace fills stage by stage; invoice table + provenance appear.

> Running the pipeline: the request is packaged, policy fires before any model call, then N-ATLaS drafts the invoice live. Watch the trace — this run caught arithmetic the model got wrong and repaired it deterministically. Every field carries provenance: what came from the request, what the model derived, what the system computed.

## ch5 — Multilingual runs (~25 s)

Visual: quick cuts — Hausa chip → run → invoice; Yoruba; Igbo. Each shows a completed draft.

> The same governed run in Hausa, Yoruba and Igbo — real calls to the live model each time. When extraction slips, the validators catch it, deterministic repair fixes what can be proven, and the draft still waits for a human. Multilingual input, same controls.

## ch6 — Benchmark (~20 s)  **NEW**

Visual: terminal — `node benchmarks/eval.ts` output table; or rendered results card; end on the pass/fail summary line.

> And because prompt engineering without measurement is just hope: ten golden fixtures — all four languages, an injection attempt, missing fields, vague quantities, an arithmetic trap — run against the live model and scored. Parse, extraction completeness, and post-repair arithmetic, out of a hundred. Every score pins the exact prompt version into the audit record.

## ch7 — Policy block (~15 s)

Visual: terminal render of blocked run (rebuild from evidence) or the wire_transfer fixture row in eval output.

> Some requests must never reach the model at all. A wire transfer isn't in this role's allowed actions — so policy blocks it before a single token is generated, and the audit log records the refusal. Governance you can verify, not trust.

## ch8 — Approvals + audit (~20 s)

Visual: Approvals queue → click Approve on one row → Audit view shows the appended record.

> Nothing consequential ships without a human. The approver reviews the draft in the queue, decides once, and the decision is permanent — appended to the same tamper-evident log as everything else. Request in, decision out, proof at every step.

## ch9 — Outro (~10 s)

Visual: rendered outro card — NEIOS, claims, repo link.

> NEIOS: governed enterprise integration for N-ATLAS — four languages, voice and text, deterministic policy, human approval, and an audit trail for everything. Built for NAIC 2026.

---

**Total narration: ~171 s → video target ~3:00–3:15**

Recording notes:
- ch3 requires the ASR service running with checkpoints downloaded (HF token).
- ch4–ch5 require the live model tunnel (batched Vast session).
- ch6 requires `node benchmarks/eval.ts` results — record the real terminal run in the batched session after fixtures complete.
- ch7 can reuse the rendered-terminal pattern from v1, rebuilt on the new evidence file.
- `?cursor=1` for every take; dwell = narration + padding per demo-video-production skill.
