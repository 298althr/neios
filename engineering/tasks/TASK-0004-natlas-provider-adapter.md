# TASK-0004: Implement NAtlasProvider interface + first concrete implementation

## Objective
One internal interface (`NAtlasProvider.generate()`) with a single concrete
implementation targeting whichever access path TASK-0001 resolves. No N-ATLAS-
specific network logic spread across the rest of the app (direction doc §5.E).

## Parent Issue / Requirement
`docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §5.E, §9, §23 (ModelProvider interface)

## Owner
Agent

## Priority
P0

## Status
IN_PROGRESS — adapter implemented at `packages/natlas-adapter/` (interface +
OpenAI-compatible concrete impl, timeout/retry/typed errors, endpoint from
env). Smoke test `scripts/natlas-smoke-test.ts` runs under Node 24 native TS.
Blocked only on the vast.ai endpoint coming up (instance 54832982 loading).

## Preconditions
TASK-0001 complete (access path chosen and proven).

## Inputs
Access path details (base URL, auth) from TASK-0001.

## Work
1. Define `packages/natlas-adapter/src/provider.ts`: `NAtlasProvider` interface.
2. Implement one concrete provider using the `openai` npm package pointed at the
   chosen backend's OpenAI-compatible base URL (Ollama, HF Inference Endpoint, or
   vLLM all support this — see `docs/03-research/N-ATLAS-ACCESS-FINDINGS.md`).
   This avoids writing bespoke HTTP/retry/timeout/streaming code.
3. Add timeout + retry + error handling (direction doc §9 engineer actions).
4. Store the endpoint in configuration, not hardcoded (direction doc §9: "do not
   couple the whole product to a specific Space name").
5. Write a minimal smoke-test script (`scripts/natlas-smoke-test.ts`) that calls
   the provider directly from the terminal (no UI).

## Expected Output
`packages/natlas-adapter/` package with a working `NAtlasProvider` implementation
and a passing smoke-test script.

## Acceptance Criteria
- [ ] `NAtlasProvider.generate()` interface defined per §5.E
- [ ] One concrete implementation works against the chosen backend
- [ ] Timeout/retry/error handling present
- [ ] Endpoint configurable, not hardcoded
- [ ] `scripts/natlas-smoke-test.ts` runs and prints a real model response

## Dependencies
TASK-0001

## Risks
If the backend's API shape differs materially from OpenAI's chat-completions
format, the `openai` package reuse assumption may need a thin translation layer —
budget extra time if so.

## Evidence Produced
Smoke-test script + its captured output (feeds TASK-0005).

## Validation
Manual run of the smoke-test script against the real backend.

## Completion Record
(to be filled when complete)
