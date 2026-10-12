# Voiceover script — neios-workflow-tour.html

Read one block per scene; the scene changes when the heading on screen changes.
Total read ≈ 1 min 45 s. Speak at an easy pace — the captions on screen carry
the same lines, so staying close to the text keeps voice and video in sync.

---

**Scene 1 — Title card** (~7 s)

> NEIOS — developer infrastructure for N-ATLAS. This is the governed workflow,
> end to end, in all four languages.

**Scene 2 — Intake in four languages** (~15 s)

> A work request arrives as text or voice — English, Pidgin, Hausa, Yoruba or
> Igbo. These are the real inputs, not mockups.

**Scene 3 — The eight control points** (~8 s)

> Every request crosses the same eight control points. The code runs the
> show — the model only drafts inside it.

**Scene 4 — Request and Context** (~9 s)

> First the request is structured: who, what, why, when. Missing required
> fields are flagged before the model is ever called.

**Scene 5 — Policy** (~11 s)

> Then a deterministic policy gate — decided by code, not the model. A
> wire-transfer request is blocked in zero milliseconds; the model never
> sees it.

**Scene 6 — Model** (~8 s)

> Only permitted work reaches N-ATLAS — a real model call, latency and
> request ID recorded.

**Scene 7 — Result** (~10 s)

> The output is parsed against a strict schema. Arithmetic is verified and
> repaired deterministically — every correction is named.

**Scene 8 — Evidence** (~8 s)

> Each field gets a provenance tag — what came from the input, what the model
> derived, what the system computed.

**Scene 9 — Approval** (~9 s)

> Consequential output is never executed — it waits in the approval lane
> until a human approves or rejects it.

**Scene 10 — Audit** (~9 s)

> Then everything lands in an append-only audit log — the request, the model
> call, the repairs, the decision. Eighty-three records and counting.

**Scene 11 — MCP** (~11 s)

> The same loop is exposed as five MCP tools — any agent or IDE can submit
> work, but the contract caps out at pending approval. Governance is the
> interface.

**Scene 12 — Outro** (~10 s)

> Ten of ten benchmark fixtures, four live languages, eighty-three audit
> records. NEIOS — clone it, point it at your endpoint, ship something
> governed.

---

Recording tip: open the file, press record, click the play overlay, and read
along — `space` pauses the tour if you need a beat between scenes.
