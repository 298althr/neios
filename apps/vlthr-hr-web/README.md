# vlthr-hr-web

Next.js app, reused as the **NEIOS** (N-ATLAS Enterprise Integration OS) UI/playground
for the current build — folder name is legacy from the original "VLTHR HR"
Workforce-layer scaffold (kept per `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md`
§18: "preserve the existing engineering scaffold, reorganise only where needed for
speed"). The original Workforce marketplace UI described below is the future-layer
product, not the current build target.

- Next.js 15 (app router) + TypeScript + shadcn/ui (to be added) + socket.io-client
- Future-layer requirements (Workforce marketplace): FR-R01–FR-R07 (`product/requirements/REQUIREMENTS-INDEX.md`)
- NEIOS-specific requirements: see `docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md` §5, §12 (not yet extracted into `product/requirements/`)
- Status: skeleton — dependency versions provisional, lock during Phase 0.

```bash
pnpm install
pnpm dev
```
