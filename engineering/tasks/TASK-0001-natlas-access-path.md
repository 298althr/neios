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
IN_PROGRESS — owner has no local 8B-capable machine (D-0013, superseded) and no
HF billing budget. **Final access path decided (D-0015): vast.ai GPU rental
(RTX 3090/4090, interruptible for dev, on-demand for Day-4 demo) + self-hosted
vLLM Docker container, authenticated via owner's HF_TOKEN.** HF account + model
gate access already confirmed complete by owner (2026-10-08).

## Preconditions
- [x] Hugging Face account created, `NCAIR1/N-ATLaS` model gate accepted (owner confirmed 2026-10-08)
- [ ] vast.ai instance rented (owner action)
- [ ] HF read-scope token created at https://huggingface.co/settings/tokens (owner action)
- [ ] SSH access details + HF token handed to agent

## Inputs
- vast.ai instance SSH command/IP/port (owner provides)
- HF token (owner provides, read-scope only)

## Work
1. Owner rents cheapest RTX 3090/4090 **interruptible** listing on vast.ai with a PyTorch/CUDA template.
2. Owner shares SSH connection details + HF token with agent.
3. Agent SSHes in, runs:
   ```bash
   docker run --runtime nvidia --gpus all \
     -v ~/.cache/huggingface:/root/.cache/huggingface \
     --env "HF_TOKEN=$HF_TOKEN" -p 8000:8000 --ipc=host \
     vllm/vllm-openai:latest --model NCAIR1/N-ATLaS --dtype auto --api-key devkey123
   ```
4. Agent opens an SSH tunnel from the local dev machine (`ssh -N -L 8000:localhost:8000 -p <port> root@<ip>`).
5. Agent verifies a real completion via `curl` or a quick script against `http://localhost:8000/v1/chat/completions`.
6. Record the exact request, response, endpoint, and timestamp as integration evidence.
7. Note latency observed (informs later p50/p95 metrics, TASK-0033).
8. Owner stops (not destroys) the vast.ai instance once the session ends.

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
