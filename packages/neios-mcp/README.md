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

## Scope

Reference implementation for the NAIC 2026 PS1 submission. The role is fixed to
`procurement-assistant` (the demo Role Card); additional roles = additional
Role Cards in `packages/governance`.
