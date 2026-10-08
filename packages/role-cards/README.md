# role-cards

Role Card schema and card definitions — every AI employee is one config file.
Adding an employee = adding a card, no new code.

- `schema/role-card.schema.json` — PROPOSED schema (derived from MPLOY.txt §3)
- `cards/` — individual role card definitions (Phase 0: 6 MVP roles per MPLOY §9)

MVP roles (per MPLOY §9): software engineer (devin), data analyst (openai),
root cause analyst (openai), web researcher/scraper (openai),
UI designer/site builder (openai→devin), technical writer (openai).

Cards integrate with ARWOS: `mcp` list → gateway allow-list (FR-I05);
`clearance` → staffing gates (FR-A03).
