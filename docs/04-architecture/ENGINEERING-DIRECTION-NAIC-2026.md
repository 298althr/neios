---
document_id: ARC-DIR-001
title: Engineering direction — N-ATLAS Enterprise Integration OS (NAIC 2026)
status: ACTIVE
version: 1.0.0
owner: PROJECT OWNER (+ design/project team)
source: Owner-supplied engineering direction package, received 2026-10-08
supersedes: docs/15-handover/HANDOFF-NAIC-2026-ARWOS-KIT.md (product framing, naming, worked example)
created: 2026-10-08
---

# N-ATLAS Enterprise Integration OS
## Engineering Direction for NAIC 2026 Submission

**Date:** 2026-10-08  
**Deadline:** 2026-10-12 23:59 WAT  
**Execution mode:** 15 hours/day maximum practical effort  
**Applicant:** Individual / Innovation & Enterprise track  
**Primary business model:** B2G + B2B  
**Challenge problem statement:** PS1 — Developer Infrastructure  
**Product direction:** Enterprise Integration OS, with AI Workforce Infrastructure as a future extension

---

## 0. READ THIS FIRST: ENGINEERING DIRECTIVE

This document supersedes the previous competition-specific product framing in the handoff where that framing conflicts with this document.

Do **not** build a disposable hackathon application.

Build a narrow but real slice of a product that could be deployed by a Nigerian enterprise or government organisation to integrate N-ATLAS into controlled work processes.

The competition is only the **entry and validation channel**. It is not the product.

The product must therefore make sense without mentioning the competition.

### Primary product thesis

> **An enterprise control and integration layer that turns N-ATLAS intelligence into structured, governed, auditable organisational work.**

The product is not merely an SDK, chatbot, playground, prompt wrapper, or generic AI gateway.

The first release should provide a clean developer interface while solving the harder organisational problem underneath:

```text
Human / System Request
        ↓
Structured Work Intake
        ↓
Context + Missing-Information Check
        ↓
Policy / Permission Gate
        ↓
N-ATLAS
        ↓
Structured Output + Validation
        ↓
Evidence / Provenance
        ↓
Human Approval where required
        ↓
Audit Record
```

The worked example is a **Nigerian SME procurement-to-invoice workflow**. It is a reference implementation, not the whole product.

### Mandatory instruction to the engineer

If any requirement below is unclear, **ask the project owner before inventing an implementation**.

The engineer does not have sufficient context for all internal frameworks. If a framework term or prior-system principle is referenced and its intended semantics are unclear, ask the owner specifically what should be reused.

Do not fabricate definitions for APSOS, PURF, ADCOS, CITM, UNPF, UIOS, UIK, or related internal systems.

---

# 1. STRATEGIC POSITION

## 1.1 Recommended product category

**N-ATLAS Enterprise Integration OS** is the recommended category.

**AI Workforce Infrastructure** should be treated as the longer-term expansion layer, not the 4-day competition product.

Reason:

1. PS1 explicitly asks for infrastructure that helps developers integrate, test, adapt and deploy N-ATLAS.
2. A pure SDK is already becoming a crowded and low-differentiation space.
3. Generic AI gateways already provide routing, logging, guardrails and model abstraction.
4. The defensible layer is therefore the organisation-specific translation between a business work request and a model call.
5. This matches the existing ARWOS control-plane philosophy without exposing the full 138-requirement ARWOS product.

The official NAIC problem statement explicitly identifies the gap between having a downloadable N-ATLAS model and having Nigerian-maintained infrastructure for integration, testing, adaptation and deployment. The challenge also explicitly targets private sector and government adoption. See sources at the end of this document.

## 1.2 Positioning statement

Use this wording as the working product description:

> **N-ATLAS Enterprise Integration OS is a governed integration layer for organisations deploying N-ATLAS-powered AI. It standardises how work is requested, contextualised, authorised, executed, validated and recorded, so developers can move from a raw model call to controlled organisational workflows.**

Do not position it as an official N-ATLAS product or claim affiliation with NCAIR, NITDA, Awarri or the Federal Government.

Use attribution where required by the N-ATLAS terms.

## 1.3 Buyer strategy

### B2G

Primary early target:

- Government agencies deploying multilingual digital services
- Internal government workflow systems
- Public-service information and request-processing systems
- Government contractors building systems that consume N-ATLAS

### B2B

Secondary target:

- Nigerian enterprises
- Regulated organisations
- Financial/fintech organisations
- Telecoms
- Logistics and procurement organisations
- Service companies with multilingual staff/customer workflows
- Software companies embedding N-ATLAS into products

### Licensing constraint

The current N-ATLAS terms explicitly state that N-ATLAS is not an enterprise-grade/commercial system and that commercial or large-scale enterprise use requires a separate licensing agreement. The terms also impose a 1,000 active-end-user cap and identify civic/public-benefit use as permitted use.

Therefore:

- Do not claim unrestricted commercial deployment.
- Architect the product so the N-ATLAS provider is replaceable.
- Treat N-ATLAS commercial licensing as a future commercial dependency.
- B2G/public-benefit deployment is a cleaner immediate narrative under the current terms.
- The competition build is an N-ATLAS-integrated demonstration, not a claim that commercial rights have already been obtained.

---

# 2. WHAT PROBLEM WE ARE SOLVING

## 2.1 Official N-ATLAS ecosystem problem

The official challenge identifies three ecosystem gaps:

1. Make N-ATLAS easier to build with.
2. Put N-ATLAS into accessible services for Nigerians.
3. Adapt N-ATLAS to high-impact sectors and contexts.

For PS1, the stated problem is that N-ATLAS is downloadable/open-source, but additional Nigerian-maintained tooling is needed to move from accessing the model to integrating, testing, adapting and deploying it.

This product addresses that problem at the **organisational integration layer**.

## 2.2 Our interpretation of the unresolved enterprise problem

Organisations do not merely need:

```text
prompt → model → answer
```

They need:

```text
work request
→ defined actor and purpose
→ required context
→ permissions
→ model execution
→ validated output
→ evidence/provenance
→ approval
→ record
```

Without this layer, every organisation or developer must repeatedly build its own version of:

- Role definition
- Request normalisation
- Context packaging
- Permission boundaries
- Output schemas
- Human approval gates
- Audit trails
- Error handling
- Local-language handling
- Evidence binding

The product packages these as reusable integration primitives.

---

# 3. CORE DIFFERENTIATOR

## 3.1 Do not compete as another SDK

Current N-ATLAS work already includes SDK/playground projects, and generic AI gateways such as LiteLLM already provide multi-provider routing, logging, guardrails and related infrastructure.

Therefore the product must sit one layer above the raw gateway abstraction:

```text
                ORGANISATIONAL WORK
                         │
             ┌───────────▼───────────┐
             │ N-ATLAS INTEGRATION   │
             │         OS            │
             │                       │
             │  Work Intake         │
             │  Context              │
             │  Policy               │
             │  Role                 │
             │  Validation           │
             │  Evidence             │
             │  Approval             │
             │  Audit                │
             └───────────┬───────────┘
                         │
                  N-ATLAS adapter
                         │
                       N-ATLAS
```

### The message judges should understand immediately

> **We are not helping developers call an AI model. We are helping organisations control what happens when that model becomes part of real work.**

---

# 4. INTERNAL FRAMEWORK MAPPING

Only **APSOS** should be named prominently in the competition product unless the owner explicitly approves other framework names.

The other frameworks should influence architecture and behaviour without turning the entry into a framework showcase.

## 4.1 APSOS — explicit

Use APSOS as the structured intake layer.

Minimum work-intake envelope:

```json
{
  "who": {
    "requester": "...",
    "organisation": "...",
    "counterparties": []
  },
  "what": {
    "work_type": "procurement_invoice",
    "items": [],
    "requested_output": "invoice_draft"
  },
  "why": {
    "purpose": "...",
    "criticality": "low|medium|high",
    "severity": "low|medium|high"
  },
  "when": {
    "urgency": "routine|urgent|critical",
    "due_at": null
  }
}
```

The engineer may simplify field names but must preserve the conceptual separation of **who / what / why / when**.

## 4.2 PURF principles

Do not implement a full PURF system.

Apply the principle:

> Do not execute until uncertainty that materially affects the requested work has been reduced or explicitly surfaced.

MVP behaviour:

- Detect missing required fields.
- Separate known input facts from inferred values.
- Flag ambiguity.
- Require clarification or human review where uncertainty is material.

## 4.3 ADCOS principles

Apply deterministic control before model execution:

```text
Request → policy evaluation → model call
```

Never:

```text
Request → model decides whether it is allowed
```

## 4.4 ARWOS principles

Visible architecture should retain these principles:

- Permissions enforce; prompts inform.
- One path for model/integration calls.
- Content never grants authority.
- Audit record is separate from ordinary model output.
- Reversibility determines whether human approval is required.

Do not build the complete ARWOS specification.

## 4.5 Evidence architecture principles

Every important output field should have a provenance category:

- `input_fact`
- `model_derived`
- `system_derived`
- `human_confirmed`

Never present a generated value as if it were directly supplied evidence.

## 4.6 CITM / experience-state principles

Do not build a digital twin or simulation system for this competition.

Use only the general principle of maintaining structured state across:

```text
request state → context state → execution state → result state → approval state
```

## 4.7 UIOS / UIK principles

The UI should make system state visible.

The user should be able to see:

```text
REQUEST
CONTEXT
POLICY
MODEL
RESULT
EVIDENCE
APPROVAL
AUDIT
```

Do not hide important control decisions behind a chat interface.

---

# 5. MVP PRODUCT

## 5.1 Product modules

Build exactly these modules:

### A. Work Intake

Create or edit a structured work request.

### B. Role Card

Define:

- role name
- role purpose
- allowed input types
- allowed output types
- allowed actions
- approval requirement
- language capability
- budget/usage limit if easy

### C. Context Builder

Package the APSOS work request and relevant data into the model request.

### D. Policy Gate

Deterministic pre-model checks.

Minimum rules:

- role exists
- operation is permitted
- mandatory fields present
- high-risk operation requires approval
- unsupported action is blocked

### E. N-ATLAS Adapter

One internal interface:

```ts
interface NAtlasProvider {
  generate(request: NAtlasRequest): Promise<NAtlasResponse>
}
```

Do not spread N-ATLAS-specific network logic across the application.

### F. Output Structurer

Convert model output to a strict JSON schema.

For the procurement example:

```json
{
  "document_type": "invoice_draft",
  "supplier": {},
  "buyer": {},
  "currency": "NGN",
  "items": [],
  "subtotal": 0,
  "tax": 0,
  "total": 0,
  "delivery_terms": null,
  "missing_fields": [],
  "review_required": true,
  "field_provenance": {}
}
```

### G. Validation

Deterministically validate:

- required fields
- numeric values
- totals
- duplicate items
- invalid values
- missing critical data
- policy conditions

Do not ask the LLM to perform checks that can be done deterministically.

### H. Approval Gate

Implement one simple approval lane:

```text
Lane 0: informational / low consequence
Lane 1: organisational work output
Lane 2+: require human approval
```

Only one explicit high-risk example is required for the demo.

### I. Audit Log

Record:

- timestamp
- request ID
- requester
- role
- input hash or safe input reference
- policy result
- N-ATLAS provider
- model request ID if available
- output hash or safe output reference
- validation result
- approval result
- final state

Do not build Merkle/hash-chain infrastructure during the MVP unless already available and trivial to integrate.

### J. Developer Playground

The playground is not a chat app.

Show:

```text
1. Select Role Card
2. Enter work request
3. Inspect structured context
4. Run policy check
5. Execute N-ATLAS
6. View structured result
7. View evidence/provenance
8. Approve or reject
9. View audit record
```

---

# 6. WORKED EXAMPLE

## Nigerian SME Procurement → Invoice Draft

This example should make the enterprise thesis obvious within 60 seconds.

### Input

A Nigerian SME employee submits a procurement request in Nigerian English or one supported Nigerian language.

Example concept:

> Request to buy a specified quantity of a common business item from a named supplier, including price and required delivery date.

Do not hardcode a fake real company.

Use a clearly marked fictional SME and supplier.

### Flow

```text
Employee request
       ↓
APSOS extraction
       ↓
Context completeness check
       ↓
Role + policy check
       ↓
N-ATLAS
       ↓
Structured procurement/invoice draft
       ↓
Deterministic arithmetic + schema validation
       ↓
Provenance display
       ↓
Human approval
       ↓
Audit record
```

### Local-context requirement

Use a Nigerian-language input or Nigerian business-language input that demonstrates N-ATLAS relevance.

Do not claim perfect multilingual performance.

First test English, Nigerian English, Hausa, Igbo and Yoruba where access permits. Select the language/example that produces the most reliable live output for the final demo.

The N-ATLAS model card itself reports different performance by language and identifies limitations including dialect/accent bias and limited code-switching. The product should therefore expose review requirements rather than hide uncertainty.

### Important boundary

The system creates a **draft**.

It must not pretend to execute a real procurement, transfer money, issue a legally binding invoice, or modify an external ERP during the competition MVP.

---

# 7. USER EXPERIENCE

## 7.1 Primary screen

Use the existing Next.js application where practical.

Do not replace the existing application with Streamlit unless the current stack blocks completion.

### Screen layout

```text
┌─────────────────────────────────────────────────────────┐
│ N-ATLAS Enterprise Integration OS                       │
│                                                         │
│ ROLE: Procurement Assistant                             │
│ STATUS: Ready                                           │
├─────────────────────────────────────────────────────────┤
│ WORK REQUEST                                            │
│ [ text / structured input ]                             │
│                                                         │
│ [ Build Context ]  [ Run ]                              │
├─────────────────────────────────────────────────────────┤
│ EXECUTION TRACE                                         │
│ ✓ APSOS intake                                          │
│ ✓ Context check                                         │
│ ✓ Policy: ALLOW                                         │
│ ✓ N-ATLAS executed                                      │
│ ✓ Output validated                                      │
│ ⚠ Human review required                                 │
├─────────────────────────────────────────────────────────┤
│ RESULT                                                  │
│ Structured invoice / procurement draft                  │
│                                                         │
│ EVIDENCE / PROVENANCE                                   │
│ field → input / model-derived / system-derived         │
│                                                         │
│ [ Approve ] [ Reject ]                                  │
└─────────────────────────────────────────────────────────┘
```

The visual effect should communicate control, not conversation.

---

# 8. TECHNICAL ARCHITECTURE

## 8.1 Recommended architecture

Keep the existing monorepo but simplify the competition runtime.

```text
Next.js UI
   │
   ▼
Application API / Control Plane
   │
   ├── APSOS Intake Service
   ├── Role Card Registry
   ├── Policy Engine
   ├── Context Builder
   ├── N-ATLAS Provider Adapter
   ├── Output Validator
   ├── Approval Service
   └── Audit Service
             │
             ▼
       N-ATLAS Runtime
       ├── Gradio Space adapter (fastest)
       └── Local/OpenAI-compatible adapter (fallback/future)
```

## 8.2 Do not build a separate microservice for every component

For this deadline, these should be modules inside one backend process.

Target:

```text
apps/vlthr-hr-web/
apps/arwos-api/             # only retain if useful
packages/role-cards/
packages/natlas-adapter/
packages/governance/
packages/shared/
```

A clean modular monolith is preferred over premature distributed architecture.

## 8.3 Language choice

**Use TypeScript end-to-end for the competition cut unless direct N-ATLAS model execution proves materially faster in Python.**

Reason:

- Existing application is Next.js.
- Existing ARWOS direction is TypeScript.
- A remote Gradio/HTTP adapter avoids needing Python for the first working path.
- The provider interface preserves future local-runtime options.

Exception:

If direct local model execution is the only reliable way to demonstrate genuine N-ATLAS integration, add a minimal Python inference sidecar rather than rewriting the application.

---

# 9. N-ATLAS ACCESS STRATEGY

The official N-ATLAS model is gated on Hugging Face and currently has no deployed Inference Provider according to its model page.

The fastest technical path is therefore:

### Priority 1 — working Gradio Space adapter

Use a live Gradio Space already running N-ATLAS.

Hugging Face documents that every Gradio Space exposes an API endpoint and OpenAPI specification.

Engineer actions:

1. Identify the most reliable live N-ATLAS Space.
2. Inspect its `/gradio_api/openapi.json`.
3. Identify the inference endpoint and payload.
4. Implement `NAtlasProvider` around that endpoint.
5. Add timeout, retry and error handling.
6. Capture actual outputs for integration evidence.

Do not couple the whole product to a specific Space name. Store the endpoint in configuration.

### Priority 2 — local/OpenAI-compatible runtime

Implement only enough abstraction to allow a self-hosted N-ATLAS runtime later.

Do not spend the submission window building a full inference platform.

### Priority 3 — hosted inference endpoint

Only use a paid endpoint if the above paths fail and it can be activated immediately.

---

# 10. OPEN-SOURCE REUSE STRATEGY

Do not build commodity infrastructure from scratch when a mature permissively licensed project can be reused safely.

However, do not clone a large project merely to appear sophisticated.

## 10.1 Candidate components

| Component | Candidate | Licence observed | Use |
|---|---|---|---|
| AI gateway/client abstraction | LiteLLM core | MIT outside the `enterprise/` directory | Reference or selective reuse for model-provider abstraction; do not copy enterprise code |
| Authorization | Casbin Node | Apache-2.0 | Optional deterministic RBAC/ABAC implementation |
| Guardrails | NVIDIA NeMo Guardrails | Apache-2.0 | Optional only; not required for MVP because deterministic policy is preferred |
| LLM observability | Langfuse OSS core | MIT, with separate EE areas | Optional only; own SQLite audit is simpler for deadline |
| Local model runtime | Ollama | MIT | Optional runtime path if N-ATLAS-compatible model packaging is proven |

## 10.2 Important reuse rule

For every third-party component actually shipped:

1. Pin a version/commit.
2. Verify its license in the repository.
3. Preserve required notices.
4. Record the source URL.
5. Record what code/library was reused.
6. Do not copy code from a repository whose license is unclear.
7. Do not use AGPL code as a shortcut for the core product unless the owner explicitly approves the licensing consequences.
8. Do not use a competitor's competition entry as the foundation of the submitted product unless the owner explicitly approves after a license/originality review.

Create:

```text
docs/legal/OSS-THIRD-PARTY.md
```

## 10.3 Current research finding

A current N-ATLAS toolkit already advertises TypeScript/Python SDKs, React components and a playground. Therefore a plain “SDK + playground” submission is strategically weak.

Use that ecosystem as evidence of the need for the next layer, not as the core product to copy.

---

# 11. DATA MODEL

Use SQLite for the competition build unless the existing application already has a working local persistence layer that is faster.

Minimum entities:

```text
organizations
users
role_cards
work_requests
execution_runs
policy_decisions
artifacts
approvals
audit_events
```

### Work request

```json
{
  "id": "WR-...",
  "role_card_id": "RC-...",
  "apsos": {},
  "status": "draft|ready|blocked|running|review|approved|rejected|completed",
  "created_at": "..."
}
```

### Policy decision

```json
{
  "work_request_id": "WR-...",
  "decision": "ALLOW|BLOCK|REVIEW",
  "rules_triggered": [],
  "reason": "...",
  "timestamp": "..."
}
```

### Artifact

```json
{
  "type": "invoice_draft",
  "content": {},
  "validation": {},
  "provenance": {}
}
```

### Audit event

Use append-only semantics at the application layer.

Never overwrite execution history.

---

# 12. API CONTRACT

Minimum internal/public API:

```text
GET  /api/health
GET  /api/role-cards
POST /api/work-requests
POST /api/work-requests/:id/context
POST /api/work-requests/:id/policy-check
POST /api/work-requests/:id/execute
GET  /api/work-requests/:id/result
POST /api/work-requests/:id/approve
POST /api/work-requests/:id/reject
GET  /api/work-requests/:id/audit
```

The most important endpoint is:

```text
POST /api/work-requests/:id/execute
```

It must always execute through the single controlled path:

```text
load request
→ validate request
→ evaluate policy
→ build context
→ call N-ATLAS
→ validate result
→ create artifact
→ append audit event
→ return result
```

No UI component should call N-ATLAS directly.

---

# 13. ROLE CARD

Implement JSON configuration, not a database-heavy role management system.

Example:

```json
{
  "id": "procurement-assistant",
  "name": "Procurement Assistant",
  "purpose": "Prepare procurement and invoice drafts",
  "model": "N-ATLAS",
  "languages": ["en", "ha", "ig", "yo"],
  "allowed_operations": [
    "extract_procurement_request",
    "draft_invoice",
    "summarise_request"
  ],
  "blocked_operations": [
    "approve_payment",
    "execute_transfer",
    "submit_purchase_order"
  ],
  "approval_policy": {
    "draft_invoice": "review"
  }
}
```

Do not implement arbitrary code execution through Role Cards.

Role Cards are configuration, not authority.

Authority comes from deterministic platform policy.

---

# 14. PROMPT / CONTEXT DESIGN

Avoid a single giant prompt.

Compose context from structured sections:

```text
SYSTEM ROLE
↓
ROLE CARD
↓
WORK INTENT
↓
BUSINESS CONTEXT
↓
LOCAL LANGUAGE / CULTURAL CONTEXT
↓
KNOWN FACTS
↓
OUTPUT SCHEMA
↓
SAFETY / POLICY CONSTRAINTS
```

Important:

- Clearly label source facts.
- Clearly label fields that may require inference.
- Instruct the model not to invent missing critical information.
- Require the model to identify missing fields.
- Require machine-readable output where possible.

The model is an intelligence component, not the authority layer.

---

# 15. VALIDATION STRATEGY

## 15.1 Required competition validation

PS1 requires at least **2 external beta testers**.

Get two real external testers to use the actual working system.

Prefer:

- One technical developer/platform tester.
- One operations/business workflow tester.

Capture:

```text
Tester ID
Date
Task
Input language
Workflow completed
Failures
Observed usefulness
Integration friction
Suggested improvement
```

Do not fabricate validation.

## 15.2 Internal validation

Run at least 30–50 test cases if time allows.

Test classes:

1. Valid procurement request.
2. Missing supplier.
3. Missing price.
4. Invalid quantity.
5. Ambiguous date.
6. Unsupported action request.
7. High-risk approval case.
8. Nigerian-language request.
9. English request.
10. Malformed model output.
11. N-ATLAS timeout.
12. Empty response.
13. Duplicate execution.
14. Invalid arithmetic.
15. Model-generated unsupported field.

Record metrics:

```text
success_rate
structured_output_rate
policy_block_rate
validation_catch_rate
manual_review_rate
p50_latency
p95_latency
provider_error_rate
```

Do not label these as “accuracy” unless an actual benchmark protocol supports that claim.

---

# 16. DEMO STRATEGY

The demo should be recorded in one continuous flow.

## Target duration

3–5 minutes.

## First 20 seconds

Show the problem and product immediately.

Recommended opening sequence:

```text
“This is what happens when an organisation puts an AI model directly into a business workflow.”

Show ungoverned raw model path briefly.

Then:

“This is the control layer.”

Run the governed procurement request live.
```

Do not spend the opening minute introducing the team.

## Demo sequence

### 0:00–0:20
Problem + product hook.

### 0:20–0:50
Enter Nigerian-language/Nigerian-business-language procurement request.

### 0:50–1:20
Show APSOS structured intake and context state.

### 1:20–1:45
Show deterministic policy decision.

### 1:45–2:20
Execute real N-ATLAS call.

### 2:20–2:50
Show structured invoice/procurement artifact.

### 2:50–3:20
Show provenance, validation and missing fields.

### 3:20–3:50
Trigger human approval requirement.

### 3:50–4:20
Approve and show append-only audit trail.

### 4:20–4:45
Show developer abstraction / API contract.

### 4:45–5:00
Close with organisational value.

Closing statement:

> “N-ATLAS provides the intelligence. The Integration OS provides the organisational control required to use that intelligence in real work.”

---

# 17. WOW FACTOR ENGINEERING

Prioritise visible system behaviour over feature count.

The judge should be able to see that:

```text
The model does not receive authority.
The model does not decide the policy.
The model does not become the source of truth.
The model does not bypass approval.
```

Show this visually.

## Highest-value visual element

An execution trace:

```text
01 REQUEST        ✓
02 APSOS          ✓
03 CONTEXT        ✓
04 POLICY         ✓ ALLOW
05 N-ATLAS        ✓
06 VALIDATION     ✓
07 EVIDENCE       ✓
08 APPROVAL       ⚠ REQUIRED
09 AUDIT          ✓
```

This is a stronger demonstration than adding multiple pages or multiple agents.

---

# 18. REPOSITORY REQUIREMENTS

Preserve the existing engineering scaffold, but reorganise only where needed for speed.

Recommended structure:

```text
VLTHR-HR/
├── apps/
│   └── vlthr-hr-web/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── api/
│
├── packages/
│   ├── role-cards/
│   ├── natlas-adapter/
│   ├── governance/
│   ├── apsos/
│   └── shared/
│
├── config/
│   ├── role-cards/
│   └── policies/
│
├── data/
│   ├── demo/
│   └── validation/
│
├── docs/
│   ├── architecture/
│   ├── validation/
│   ├── demo/
│   └── legal/
│
├── engineering/
│   ├── decisions/
│   ├── issues/
│   ├── tasks/
│   └── risks/
│
├── scripts/
│   ├── natlas-smoke-test.ts
│   ├── seed-demo.ts
│   └── run-validation.ts
│
├── .env.example
├── README.md
├── package.json
└── docker-compose.yml
```

Do not create empty enterprise-grade folders merely for appearance.

Every directory must have a real purpose.

---

# 19. ENGINEERING QUALITY GATES

## Gate G0 — N-ATLAS access

Must pass before meaningful UI work.

Evidence:

```text
actual request
actual N-ATLAS response
recorded timestamp
provider endpoint
```

If this fails, escalate immediately.

## Gate G1 — Single controlled call path

No UI-to-N-ATLAS direct calls.

## Gate G2 — Policy before model

Demonstrate blocked action without N-ATLAS executing it.

## Gate G3 — Structured result

Demonstrate valid JSON or deterministic parser recovery.

## Gate G4 — Provenance

Show model-derived information is labelled as such.

## Gate G5 — Approval

At least one execution path must stop for human approval.

## Gate G6 — Audit

The execution history must be reconstructable.

## Gate G7 — External validation

Two external testers complete and document the flow.

## Gate G8 — Submission package

All official submission requirements complete.

---

# 20. FOUR-DAY EXECUTION PLAN

## OCTOBER 8 — FUNDAMENTAL RISK DAY

### Objective

Prove N-ATLAS integration and lock the architecture.

### P0 tasks

1. Confirm NAIC registration.
2. Confirm Hugging Face access.
3. Test at least one real N-ATLAS inference path.
4. Inspect available Gradio/OpenAPI endpoints.
5. Implement `NAtlasProvider`.
6. Record successful smoke-test outputs.
7. Lock the product name/positioning.
8. Remove any competition-only feature language from product documentation.
9. Create issue/task board for remaining work.

### Hard stop condition

If no reliable N-ATLAS path exists, escalate immediately to the owner.

Do not spend hours polishing UI while integration is unresolved.

---

## OCTOBER 9 — CORE SYSTEM DAY

### Objective

Complete the governed end-to-end workflow.

Build order:

1. APSOS intake object.
2. Role Card.
3. Policy gate.
4. Context builder.
5. N-ATLAS adapter.
6. Structured output parser.
7. Deterministic validator.
8. Single approval state.
9. Audit event writer.
10. Basic UI trace.

At end of day, the complete workflow must run locally from request to audit.

---

## OCTOBER 10 — PRODUCT + VALIDATION DAY

### Objective

Turn the core system into a judge-readable product.

Tasks:

1. Polish primary screen.
2. Add execution trace.
3. Add evidence/provenance panel.
4. Add bilingual/local-context demonstration.
5. Add developer API/SDK example.
6. Run internal test suite.
7. Run external beta tester 1.
8. Run external beta tester 2.
9. Record validation evidence.
10. Fix only high-severity failures.

---

## OCTOBER 11 — FREEZE + DEMO DAY

### Objective

Stop feature development.

Tasks:

1. Freeze feature scope.
2. Run full smoke/regression test.
3. Verify all environment setup steps from a clean machine/environment.
4. Generate validation metrics.
5. Complete README.
6. Complete architecture document.
7. Complete N-ATLAS integration evidence.
8. Complete OSS attribution file.
9. Record demo video.
10. Review demo for timing and failure points.

No new feature after freeze unless required to fix a blocking submission defect.

---

## OCTOBER 12 — SUBMISSION BUFFER DAY

### Objective

Submit early.

Recommended internal target:

> **Submit by 20:00 WAT, not 23:59 WAT.**

Use remaining time for:

- Final repository test.
- Submission checklist.
- Video verification.
- Identity/registration evidence.
- URL verification.
- Final README review.
- Backup archive.

Do not use the last hour for architectural changes.

---

# 21. TASK PRIORITISATION

## P0 — must exist

- Real N-ATLAS integration
- N-ATLAS adapter abstraction
- APSOS intake
- Role Card
- deterministic policy gate
- context builder
- structured output
- validation
- human approval
- audit
- usable UI
- two external testers
- technical documentation
- video

## P1 — strong competitive value

- multilingual/local-context demo
- provenance per field
- execution trace
- developer SDK example
- clear API schema
- reusable configuration
- Docker one-command setup

## P2 — only if P0/P1 are stable

- richer RBAC
- multi-tenant architecture
- advanced usage metering
- dashboards
- multiple N-ATLAS deployment modes
- MCP support
- multiple model providers
- agent orchestration

## P3 — explicitly exclude

- full ARWOS
- full VLTHR workforce marketplace
- complex multi-agent system
- payment processing
- real ERP integration
- real financial transaction execution
- full voice/WhatsApp channel
- fine-tuning
- large-scale cloud deployment
- enterprise SSO
- complex analytics platform
- Kubernetes

---

# 22. BUSINESS MODEL

Do not spend build time implementing billing.

Describe the commercial architecture as:

### B2G

- Government deployment licence / integration contract
- Deployment and configuration services
- Support and maintenance
- Government AI workflow integration

### B2B

- Enterprise annual licence
- Per-deployment integration
- Support/managed deployment
- Usage-based or seat-based pricing later

### Platform expansion

```text
N-ATLAS Integration OS
        ↓
Other models/providers
        ↓
Enterprise AI workloads
        ↓
AI Workforce Infrastructure
        ↓
Managed AI employees / agents
```

The competition MVP only proves the first layer.

---

# 23. SCALABILITY ARCHITECTURE

The current code should demonstrate that the architecture can scale without implementing all of it.

Use interfaces for:

```text
ModelProvider
PolicyProvider
ApprovalProvider
AuditStore
ArtifactValidator
ContextProvider
```

Only implement the minimum concrete provider for each.

Example:

```text
ModelProvider
  └── NAtlasProvider
       └── GradioNAtlasProvider
```

Future:

```text
ModelProvider
  ├── NAtlasProvider
  ├── OpenAIProvider
  ├── AnthropicProvider
  └── LocalProvider
```

The competition UI should remain N-ATLAS-first.

Do not turn the product into a generic multi-model showcase.

---

# 24. SECURITY AND TRUST RULES

Apply the following rules everywhere.

### Rule 1

Never trust model-generated claims as authority.

### Rule 2

Never allow model output to change permissions.

### Rule 3

Never allow the model to execute arbitrary tools during the MVP.

### Rule 4

Use deterministic validation wherever possible.

### Rule 5

Log decision events separately from generated prose.

### Rule 6

Do not log secrets.

### Rule 7

Do not place API keys in the frontend.

### Rule 8

Use fail-closed behaviour for policy errors.

### Rule 9

Human approval is required for the demonstrated consequential action.

### Rule 10

The system must clearly separate:

```text
FACT
DERIVED VALUE
MODEL OUTPUT
DECISION
APPROVAL
```

---

# 25. LEGAL / LICENSING CONTROLS

Create:

```text
docs/legal/N-ATLAS-LICENSING-NOTE.md
```

Include:

- N-ATLAS attribution.
- N-ATLAS licence name.
- 1,000 active-user cap.
- commercial/large-scale licensing requirement.
- current permitted-use categories.
- current limitations relevant to the product.
- statement that the submission does not claim commercial licence rights.

Create:

```text
docs/legal/OSS-THIRD-PARTY.md
```

Record every third-party OSS component used.

Do not state “commercially usable” merely because a project appears on GitHub. Verify the exact repository licence and any directory-level exceptions.

---

# 26. README REQUIREMENTS

README order:

1. One-sentence product definition.
2. Problem.
3. Why N-ATLAS.
4. Architecture diagram.
5. 60-second quickstart.
6. Demo workflow.
7. N-ATLAS integration method.
8. APSOS / governance explanation.
9. Validation results.
10. Security model.
11. Licensing.
12. Limitations.
13. Roadmap.
14. Third-party licences.

The first screen should communicate:

```text
N-ATLAS intelligence
+
organisational control
+
Nigerian context
=
enterprise-ready integration pattern
```

Do not put a giant paragraph above the product explanation.

---

# 27. COMPETITION SCORE OPTIMISATION

## Phase 1 — WOW FACTOR

Make the execution trace and controlled workflow visually obvious.

The judge should understand the difference between raw model access and governed organisational execution almost immediately.

## Phase 2 — TECHNICAL SCORE

Prove:

- real N-ATLAS use
- clean provider abstraction
- structured API
- deterministic policy
- validation
- audit
- error handling
- reproducible setup

## Phase 3 — IMPACT + SCALABILITY

Explain how the same integration pattern can be deployed across:

- SMEs
- banks/fintechs
- telecoms
- logistics
- government agencies
- public-service systems
- enterprise software vendors

The key scalability claim is architectural reuse, not current deployment scale.

---

# 28. RISKS

| Risk | Severity | Response |
|---|---:|---|
| N-ATLAS access failure | Critical | Resolve first; use Gradio Space, paid endpoint or local runtime in that order |
| Third-party Space downtime | High | Provider abstraction + second endpoint fallback |
| Model output quality | High | Structured validation + human review + choose reliable demo language |
| Product becomes generic SDK | High | Keep APSOS/context/policy/evidence workflow central |
| Scope explosion | Critical | Enforce P0/P1/P2/P3 priorities |
| Licensing ambiguity | High | Separate product architecture from N-ATLAS commercial rights; document terms |
| Weak validation | High | Run both external testers before freeze |
| Judge cannot see differentiation | High | Execution trace + side-by-side raw vs governed flow |
| Frontend consumes too much time | High | One primary screen; no complex dashboard |
| Overclaiming | High | Mark implemented / demonstrated / roadmap capabilities separately |

---

# 29. DEFINITION OF DONE

The project is done when a fresh evaluator can run one command sequence and observe:

```text
1. Select role
2. Enter Nigerian work request
3. Build structured APSOS request
4. Inspect context
5. Policy allows
6. Actual N-ATLAS responds
7. Output becomes structured artifact
8. Validator catches defects/missing fields
9. Human approval is requested
10. Approval completes workflow
11. Audit record exists
```

And the repository contains:

```text
working code
README
setup instructions
.env.example
architecture documentation
N-ATLAS integration evidence
validation evidence
2 external beta tester records
video
team profile
identity/registration evidence
OSS attribution
N-ATLAS licensing note
```

---

# 30. DO NOT DO THESE THINGS

Do not build a generic chatbot.

Do not build a general prompt playground as the main product.

Do not build a fake N-ATLAS response for the real demo.

Do not call another model and label it as N-ATLAS.

Do not make the model responsible for access control.

Do not build a large dashboard before the controlled workflow works.

Do not build the complete ARWOS system.

Do not build the VLTHR HR marketplace for this submission.

Do not implement financial transactions.

Do not claim commercial N-ATLAS rights that have not been obtained.

Do not spend the remaining time writing speculative roadmap code.

---

# 31. FINAL PRODUCT NARRATIVE

Use this internally when making design decisions:

> **N-ATLAS is the intelligence layer. The Enterprise Integration OS is the organisational control layer.**
>
> An organisation should not have to rebuild the same mechanisms every time it puts N-ATLAS into a real workflow. The OS packages work intake, context, permissions, model execution, validation, evidence, approval and audit into one reusable integration path.
>
> The first implementation demonstrates this through a Nigerian SME procurement-to-invoice workflow using Nigerian language/context handling.

The product should be capable of becoming an enterprise integration platform later without requiring the competition code to be thrown away.

---

# 32. RESEARCH SOURCES

Research date: **2026-10-08**.

### Official NAIC 2026

National AI Innovation Challenge — Build with N-ATLAS:  
https://ncair.nitda.gov.ng/naic/

Relevant facts:

- PS1 Developer Infrastructure
- PS2 Voice-First Access
- PS3 Sectoral Fine-Tuning
- mandatory genuine N-ATLAS integration
- 2 external beta testers for PS1
- working artefact + integration evidence + validation + documentation + 3–5 minute video
- evaluation categories include technical rigour, integration, validation, impact, scalability and team capability
- deadline 12 October 2026, 23:59 WAT

### N-ATLAS model card and terms

https://huggingface.co/NCAIR1/N-ATLaS

Relevant facts:

- N-ATLaS is an 8B multilingual model.
- Supported languages listed include English, Hausa, Igbo and Yoruba.
- The model was trained with Nigerian/African contextual data.
- The model card identifies limitations including dialect/accent bias and code-switching limitations.
- The terms state that the model is not an enterprise-grade/commercial system.
- Commercial or large-scale enterprise use requires a separate licence.
- Use is capped at 1,000 active end-users under the stated terms.
- Attribution is required.

### Hugging Face Spaces API

https://huggingface.co/docs/hub/spaces-api-endpoints

Relevant fact:

- Gradio Spaces expose callable API endpoints and OpenAPI specifications.

### LiteLLM

https://github.com/BerriAI/litellm

https://github.com/BerriAI/litellm/blob/main/LICENSE

Relevant fact:

- LiteLLM already occupies the generic AI gateway space and provides broad provider abstraction, routing, logging and related capabilities.
- Core repository licensing outside the `enterprise/` directory is MIT; directory-level licensing must be checked before reuse.

### Casbin Node

https://github.com/apache/casbin-node-casbin

Relevant fact:

- Apache-2.0 licensed Node authorization library supporting ACL/RBAC/ABAC patterns.

### NVIDIA NeMo Guardrails

https://github.com/NVIDIA-NeMo/Guardrails

Relevant fact:

- Apache-2.0 licensed programmable guardrail toolkit.

### Langfuse

https://github.com/langfuse/langfuse

Relevant fact:

- MIT-licensed OSS core with self-hosting capability; some enterprise directories/features have separate licensing.

### Current N-ATLAS ecosystem reference

https://github.com/cutewizzy11/telnora-natlas-kit

Relevant observation:

- A current N-ATLAS project already advertises typed SDKs, Python/TypeScript packages, React components and a playground.
- Treat this as ecosystem/competition evidence, not as the foundation of this product without explicit owner approval.

---

# 33. OWNER DECISION LOG

The following decisions are locked unless new technical evidence materially invalidates them:

| Decision | Value |
|---|---|
| Buyer | B2G + B2B |
| Product category | N-ATLAS Enterprise Integration OS |
| Future extension | AI Workforce Infrastructure |
| Challenge problem | PS1 Developer Infrastructure |
| Product purpose | Real organisational integration product, not competition-only software |
| Explicit framework | APSOS |
| Internal principles | PURF, ADCOS, CITM, UNPF, evidence architecture, ARWOS, UIOS/UIK |
| Demo use case | Nigerian SME procurement → invoice draft |
| N-ATLAS role | First-class model/provider, not incidental integration |
| Commercial posture | B2G/public-benefit first; B2B subject to N-ATLAS licensing |
| Technical posture | TypeScript/Next.js unless Python is proven materially faster for direct inference |
| Architecture | Modular monolith + provider interfaces |
| Security posture | Deterministic policy first, fail-closed where applicable |
| Validation | 2 external testers + internal structured tests |
| Demo priority | WOW → technical score → impact/scalability |
| Deadline target | Submit by 20:00 WAT on Oct 12 |

---

# 34. ENGINEER ACKNOWLEDGEMENT / ESCALATION RULE

Before implementation, confirm that the engineer understands:

```text
This is a real enterprise integration product.
The competition is only the current validation channel.
N-ATLAS is the required model integration.
APSOS is the explicit intake mechanism.
ARWOS/PURF/ADCOS/CITM principles shape the architecture but are not the product scope.
The MVP must be small, working and demonstrable.
Reuse mature permissively licensed open-source components where they save time.
Do not invent unclear framework semantics.
Do not silently change the product thesis.
```

If any of these statements is unclear, **ask the project owner before proceeding**.
