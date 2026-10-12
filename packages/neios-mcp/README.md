# @neios/mcp — NEIOS MCP server

Exposes the **governed N-ATLAS work-request loop** as MCP tools over stdio —
consumable by Claude Desktop, Windsurf, Cursor, or any MCP client. Every call
goes through the *same* governed path as the web app and CLI:

```
APSOS intake → deterministic policy → N-ATLaS → validation + repair
            → field provenance → pending human approval → append-only audit
```

**The MCP boundary is part of the security model:** `neios_submit_request`
returns a draft with `pending_approval` — it never executes consequential
work. A human decides via `neios_record_decision` or the Approvals UI.
Content never grants authority.

## Tools

| Tool | Purpose |
|---|---|
| `neios_submit_request` | Submit a natural-language work request (English/Pidgin/Hausa/Yoruba/Igbo). Policy runs **before** the model; out-of-role requests are blocked without a model call. Returns `requestId`, trace, invoice draft (if produced), `finalState`. |
| `neios_pending_approvals` | List drafts awaiting human decision (audit-derived, no separate queue DB). |
| `neios_record_decision` | Record a human `approved`/`rejected` decision — appended to the audit log. |
| `neios_audit_tail` | Read the most recent append-only audit records. |

## Configure a client

```jsonc
// e.g. Claude Desktop / .codeium MCP config
{
  "mcpServers": {
    "neios": {
      "command": "node",
      "args": ["C:/path/to/NEIOS/packages/neios-mcp/src/server.ts"],
      "env": {
        "NATLAS_BASE_URL": "http://127.0.0.1:18000/v1",   // OpenAI-compatible endpoint (vLLM/Ollama serving N-ATLaS)
        "NATLAS_API_KEY": "devkey123",                     // any non-empty string for local endpoints
        "NATLAS_MODEL": "hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M"  // optional; auto-detects via GET /models
      }
    }
  }
}
```

Requires Node ≥ 22 (the repo runs TypeScript directly). Env defaults match the
web app's `.env.example`.

## Test

```bash
pnpm --filter @neios/mcp test          # stubbed provider — 15 assertions, no GPU needed
pnpm --filter @neios/mcp test:live     # REAL N-ATLaS via NATLAS_BASE_URL
```

The stub suite covers handshake, tool list, deterministic policy block
(no model), governed run → pending approval, decision recording, request
lookup, malformed-output retry, injection containment, audit tail.

The live suite (`test/live-scenarios.mjs`) exercises the same tools against a
real N-ATLaS endpoint — multilingual submits, a `wire_transfer` policy block
proving zero model calls, an injection attempt held in the approval lane, and
the pending → decision → lookup → audit round trip. It appends to the real
audit log, so run it only against a live endpoint. Transcript of the 2026-10-12
run: `engineering/evidence/mcp-live-session-2026-10-12.txt`.

## Live endpoint options (vast.ai is not required)

Any OpenAI-compatible endpoint serving N-ATLaS works — `NATLAS_BASE_URL` is
the only knob. Options:

- **Hosted GPU instance** (how the recorded runs were made): Ollama on a
  rented GPU, tunnelled to `127.0.0.1:18000`. ~$0.18/hr on vast.ai.
- **Local Ollama** — only on a machine with enough memory: the model is an
  8 B-param GGUF (Q4_K_M ≈ 4.9 GB weights + KV cache), so you need ~8-12 GB
  of free VRAM or accept slow CPU offload. Do not expect a laptop GPU with
  8 GB total VRAM to run it comfortably.

```bash
ollama pull hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M   # on a machine that can fit it
set NATLAS_BASE_URL=http://localhost:11434/v1        # PowerShell: $env:NATLAS_BASE_URL=...
set NATLAS_MODEL=hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M
pnpm --filter @neios/mcp test:live
```

Same env vars work for the web app and `scripts/neios-run.ts`. If no endpoint
is reachable at all, `pnpm --filter @neios/mcp test` still proves the full
governed path (policy block, approval lane, audit append) against a stub — the
trace labels every stage, so the difference between stub and live is visible,
not claimed.

## Scope

Reference implementation for the NAIC 2026 PS1 submission. The role is fixed to
`procurement-assistant` (the demo Role Card); additional roles = additional
Role Cards in `packages/governance`.
