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
DONE (2026-10-08) — `packages/natlas-adapter/` live against the vast.ai Ollama
endpoint (instance 54838985). Smoke test + full governed loop + `/api/work`
all verified with the real model; typecheck clean.

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
- [x] `NAtlasProvider.generate()` interface defined per §5.E (`src/provider.ts`)
- [x] One concrete implementation works against the chosen backend (`OpenAICompatProvider`, zero-dep fetch)
- [x] Timeout/retry/error handling present (AbortController timeout, retryable-status backoff, `NAtlasProviderError` kinds)
- [x] Endpoint configurable, not hardcoded (`NATLAS_BASE_URL`/`NATLAS_API_KEY`/`NATLAS_MODEL` env)
- [x] `scripts/natlas-smoke-test.ts` runs and prints a real model response (evidence JSONs in engineering/evidence/)

## Dependencies
TASK-0001

## Risks
If the backend's API shape differs materially from OpenAI's chat-completions
format, the `openai` package reuse assumption may need a thin translation layer —
budget extra time if so.

## Evidence Produced
Smoke-test script + its captured output (feeds TASK-0005).

## Validation
Manual run of the smoke-test script against the real backend. — PASSED.

## Completion Record
Completed 2026-10-08 alongside TASK-0001. Backend: Ollama serving
QuantFactory/N-ATLaS-GGUF:Q4_K_M on vast.ai instance 54838985 via SSH tunnel
on local port 18000 (port 11434 owned by local Ollama — collision documented
in runbook). Notable fix: strict-mode types + Node-24 erasable-syntax
constraints (no constructor parameter properties).
