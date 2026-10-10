# NEIOS demo video v3 — narration script (reframed per ADR-0005)

Positioning change vs v2: headline is **developer infrastructure for N-ATLAS**;
the procurement console is narrated as the **reference implementation /
playground**, not the product. Voice: owner narration preferred
(`owner-narration-guide.md`); fallback edge-tts `en-NG-AbeoNeural` (TTS, never
described as N-ATLAS ASR).

`>` lines are what gets synthesized. Target total ~3:00.

---

## ch1 — Title (~14 s)

Visual: rendered title card — NEIOS, "developer infrastructure for N-ATLAS", NAIC 2026 PS1.

> NEIOS is developer infrastructure for N-ATLAS — an SDK, a governance toolkit, an evaluation harness and a local speech service that take you from a raw model to a system you can actually deploy. This is the reference app proving it end to end.

## ch2 — The toolkit (~21 s)

Visual: repo/packages view or intake page with trace line visible.

> For a developer, N-ATLAS arrives as an endpoint — but a real system needs intake structure, a policy check before the model ever runs, output validation, field-level provenance, human approval and an audit trail. NEIOS ships all of that as packages, plus a playground to test against the live model.

## ch3 — Voice / ASR serving shim (~23 s)

Visual: voice row — select language, upload audio, transcript lands editable.

> Voice input is part of the infrastructure too. This service runs the four official N-ATLAS speech checkpoints locally and exposes the official transcriptions API — so any N-ATLAS app can accept spoken Hausa, Yoruba, Igbo or Nigerian English without standing up its own ASR stack.

## ch4 — Live governed run (~20 s)

Visual: click Run; trace fills; invoice + provenance appear.

> One real call through the pipeline: deterministic policy fires first, then the model drafts, then validators repair what they can prove — watch the corrected fields — and every value keeps a provenance tag. Nothing is mocked; the audit log gets a real model request ID.

## ch5 — Multilingual runs (~17 s)

Visual: Hausa/Yoruba/Igbo cutaways, completed drafts.

> The same pipeline in Hausa, Yoruba and Igbo — four live model calls, same controls. When extraction slips, validation catches it and the draft still waits on a human. Multilingual support is inherited from N-ATLAS, not bolted on.

## ch6 — Evaluation harness (~23 s)

Visual: benchmark results page rendered from the real eval JSON.

> And because infrastructure has to be measurable: a golden-fixture harness scores the pipeline against real N-ATLAS — ten cases covering four languages, an injection attempt, missing fields and an arithmetic trap. Ten for ten, mean ninety-three, every run pinned to a prompt version. Any developer can rerun it.

## ch7 — Policy block (~16 s)

Visual: terminal render of the blocked run.

> The safety case: a wire-transfer request is blocked by policy before a single token is generated — the model never sees it, and the refusal is still audited. That's the difference between prompting a model and governing one.

## ch8 — Approvals + audit (~16 s)

Visual: approvals queue → approve → audit view.

> Consequential output waits for a person. Approval is one-shot and binding, and the whole trail — request, model response, repairs, decision — lands in one append-only log your auditors can actually read.

## ch9 — Outro (~14 s)

Visual: outro card — NEIOS, claims, repo link.

> NEIOS: the SDK, governance toolkit, evaluation harness and ASR shim for N-ATLAS — plus a working reference app in four languages. Clone it, point it at your endpoint, and ship something governed. Built for NAIC 2026.

---

**Total narration: ~170 s → video target ~3:00–3:10**

Recording notes (unchanged mechanics):
- ch3 requires the ASR service running (checkpoints cached now).
- ch4–ch5 require the live model tunnel.
- ch6 renders the committed eval JSON — rebuilt by `build_pages.py`.
- `?cursor=1` on every take; dwell = narration + 2 s minimum.
- Keep the honest imperfections on camera (they demonstrate the validators).
