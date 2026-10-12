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
pnpm --filter @neios/mcp test
```

Spawns the server over real stdio JSON-RPC against a stubbed OpenAI-compatible
endpoint — 11 assertions: handshake, tool list, deterministic policy block
(no model), full governed run → pending approval, decision recording,
audit tail. No GPU instance needed.

## Scope

Reference implementation for the NAIC 2026 PS1 submission. The role is fixed to
`procurement-assistant` (the demo Role Card); additional roles = additional
Role Cards in `packages/governance`.
