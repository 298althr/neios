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
IN_PROGRESS — owner has no local 8B-capable machine (D-0013). **Access path decided:
Hugging Face Inference Endpoint, NVIDIA L4 x1 ($0.80/hr).** Awaiting owner to
complete signup steps (HF account, model gate acceptance, billing, deploy) —
see links given 2026-10-08. Agent will build TASK-0004 against this endpoint
once it's live.

## Preconditions
- Hugging Face account created, `NCAIR1/N-ATLaS` model gate accepted (TASK-0002).

## Inputs
- Chosen access path (owner decision).
- If (a): local machine spec (RAM/GPU) to confirm an 8B quantized model is viable.
- If (b): HF billing details to provision the endpoint.

## Work
1. Owner confirms gate acceptance status and chooses access path.
2. If Ollama: pull an existing community GGUF quantization of `NCAIR1/N-ATLaS`
   (5 exist per the model page), run locally, verify a real completion.
3. If HF Inference Endpoint: provision a small dedicated instance, verify a real
   completion via its OpenAI-compatible (or native) API.
4. Record the exact request, response, endpoint, and timestamp as integration evidence.
5. Note latency observed (informs later p50/p95 metrics, TASK-0033).

## Expected Output
A file (e.g. `data/validation/g0-smoke-test.json`) containing the real request,
real response, endpoint used, and timestamp — this is the evidence Gate G0 requires.

## Acceptance Criteria
- [ ] Real (not simulated/mocked) response received from the actual N-ATLaS model
- [ ] Endpoint, timestamp, and raw request/response recorded
- [ ] Latency observed and noted
- [ ] Decision on access path recorded in `engineering/DECISION-LOG.md`

## Dependencies
TASK-0002 (HF gate acceptance), TASK-0003 (not a hard dependency, but should be
confirmed same day)

## Risks
If no access path works today, this is the "hard stop" condition in the direction
doc §20 — escalate immediately rather than spending further time elsewhere.

## Evidence Produced
(to be filled when complete)

## Validation
Gate G0 passes only when a real (non-simulated) response is captured with full evidence.

## Completion Record
(to be filled when complete)
