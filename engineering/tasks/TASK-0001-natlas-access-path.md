# TASK-0001: Resolve N-ATLAS access path and capture first real response (Gate G0)

## Objective
Prove a real, callable path to the N-ATLaS model exists and capture evidence of
one successful real request/response, satisfying Quality Gate G0.

## Parent Issue / Requirement
`docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §9, §19 (Gate G0), §20 (Day 1 P0 task 3-6)

## Owner
Owner decision (which path) + Agent (implementation)

## Priority
P0 — blocking. No meaningful UI work proceeds until this passes.

## Status
**DONE — Gate G0 PASSED 2026-10-08.** Real N-ATLaS responses captured and
evidenced. Final path after one serving-runtime pivot (D-0016): **vast.ai
RTX 3090 (on-demand) + `ollama/ollama` image + `QuantFactory/N-ATLaS-GGUF`
Q4_K_M quant (ungated HF mirror of the same weights)** — see runbook
`engineering/runbooks/VASTAI-NATLAS.md`. The original vLLM plan (D-0015) was
abandoned mid-flight when the 18 GB image stalled >60 min extracting on a
slow-disk gVisor host; Ollama's ~1.5 GB image booted in ~3 min on a fast host.

## Preconditions
- [x] Hugging Face account created, `NCAIR1/N-ATLaS` model gate accepted (owner confirmed 2026-10-08)
- [x] vast.ai instance rented — done by agent via API key (instance 54838985; first instance 54832982 destroyed as wedged)
- [x] HF token provided (`.env.local`) — ultimately not needed for download since the GGUF mirror is ungated
- [x] SSH access — agent registered `~/.ssh/id_ed25519` pubkey on the account (key id 1514879)

## Work (as executed)
1. Agent installed `vastai` CLI, authenticated with the owner-provided API key.
2. First instance (vLLM image) stalled >60 min in image-load → destroyed.
3. Second instance: `ollama/ollama:latest`, onstart pulls `hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M` (4.9 GB @ ~150 MB/s → ~33 s).
4. SSH tunnel `ssh -N -L 11434:localhost:11434 -p 15170 root@ssh3.vast.ai`.
5. `node scripts/natlas-smoke-test.ts` → real response, 45.7 s cold / ~1.8–4.1 s warm.
6. `node scripts/neios-run.ts` → full governed loop passed end-to-end incl. deterministic invoice validation + audit record.
7. Language probes: Nigerian English/Pidgin mix (full pipeline), Hausa, Yoruba — all produced correct structured extraction.

## Expected Output
A file (e.g. `data/validation/g0-smoke-test.json`) containing the real request,
real response, endpoint used, and timestamp — this is the evidence Gate G0 requires.

## Acceptance Criteria
- [x] Real (not simulated/mocked) response received from the actual N-ATLaS model
- [x] Endpoint, timestamp, and raw request/response recorded
- [x] Latency observed and noted (45.7 s cold incl. VRAM load; 1.8–4.1 s warm)
- [x] Decision on access path recorded in `engineering/DECISION-LOG.md` (D-0015, D-0016)

## Dependencies
TASK-0002 (HF gate acceptance), TASK-0003 (not a hard dependency, but should be
confirmed same day)

## Risks
If no access path works today, this is the "hard stop" condition in the direction
doc §20 — escalate immediately rather than spending further time elsewhere.

## Evidence Produced
- `engineering/evidence/natlas-g0-2026-10-08T12-03-18-743Z.json` — first real response (English/Nigerian-context prompt)
- `engineering/evidence/natlas-g0-2026-10-08T12-05-33-868Z.json` — Hausa code-switched probe
- `engineering/evidence/natlas-g0-2026-10-08T12-05-47-927Z.json` — Yoruba probe
- `engineering/evidence/run-1c8d63ba-*.json` — first full pipeline run (model OK, output needed JSON repair fix)
- `engineering/evidence/run-24a64038-*.json` — full pipeline PASS incl. provenance + audit
- `data/audit/audit-log.jsonl` — audit records for all runs incl. policy blocks

## Validation
Gate G0 passes only when a real (non-simulated) response is captured with full evidence. — **PASSED.**

## Completion Record
Completed 2026-10-08. Path: vast.ai RTX 3090 (instance 54838985, ~$0.195/hr
all-in) + Ollama + QuantFactory Q4_K_M GGUF. Ollama's OpenAI-compatible API at
`:11434/v1` consumed by `@neios/natlas-adapter` unchanged. Note for judges:
weights are the official NCAIR1/N-ATLaS 8B, served as a third-party GGUF
quantization — genuine N-ATLAS integration, quantized serving form.
