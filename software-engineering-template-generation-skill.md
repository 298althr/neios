# SOFTWARE ENGINEERING TEMPLATE GENERATION SKILL

## Skill ID

`software-engineering-template-generator`

## Version

`1.0.0`

## Purpose

This skill is the mandatory first-stage engineering workflow for every new software product, system, application, platform, service, research software project, internal tool, automation, API, AI system, data product, or digital infrastructure project.

Before an agent begins implementing project-specific work, it must establish a governed engineering workspace.

The skill does **not** assume that every project needs the same architecture, technology stack, documentation volume, team structure, deployment model, or governance burden.

Instead, it:

1. establishes the engineering operating environment;
2. classifies the project;
3. determines its complexity and risk;
4. generates an appropriate repository structure;
5. creates templates for engineering artifacts;
6. establishes decision, issue, task, evidence, change, review, and discussion records;
7. establishes ownership and authority;
8. creates the minimum viable governance required for the project;
9. creates an explicit path for increasing or reducing engineering rigor;
10. only then begins project-specific discovery and implementation.

The output is a **Software Engineering Operating Repository**, not merely a folder tree.

---

# 1. CORE PHILOSOPHY

## 1.1 The repository is part of the system

The repository is simultaneously:

- the implementation workspace;
- the engineering memory;
- the decision record;
- the requirements record;
- the evidence record;
- the work-management system;
- the change-control system;
- the collaboration surface;
- the governance surface;
- the audit surface;
- the handover mechanism;
- the reproducibility mechanism.

Code without its surrounding engineering record is incomplete.

A future engineer must be able to determine:

- what was built;
- why it was built;
- what problem it solves;
- what evidence justified it;
- who decided;
- who approved;
- what alternatives were considered;
- what assumptions remain;
- what is known and unknown;
- what changed;
- why it changed;
- what remains unresolved;
- how to test it;
- how to operate it;
- how to recover it;
- how to retire it.

---

# 2. GOVERNING PRINCIPLE

> People create software systems, therefore managing a software system also means managing the people, decisions, authorities, evidence, changes, and controls surrounding it.

A technically correct repository can still be an operationally poor system if:

- nobody owns decisions;
- requirements are ambiguous;
- assumptions are hidden;
- issues are discussed outside the record;
- changes cannot be reconstructed;
- approvals are unclear;
- evidence is mixed with opinion;
- test status is unknown;
- production configuration is undocumented;
- security is added after architecture;
- stale documents continue to control implementation;
- agents invent missing context;
- teams cannot determine the current source of truth.

The engineering scaffold must therefore govern both **software** and **software work**.

---

# 3. NON-NEGOTIABLE RULES

The agent MUST follow these rules.

## Rule 1: Scaffold before implementation

Do not begin substantive implementation before generating the initial engineering workspace.

The first action is to establish the project engineering structure.

---

## Rule 2: Do not fabricate project context

Before the user provides project-specific context, the agent may create:

- generic engineering templates;
- placeholders;
- governance structures;
- decision registers;
- issue/task schemas;
- evidence schemas;
- architecture templates;
- workflow definitions;
- empty directories;
- README instructions.

It must NOT invent:

- business requirements;
- users;
- features;
- technologies;
- compliance requirements;
- architecture;
- security classifications;
- performance targets;
- integrations;
- production constraints;
- customer commitments;
- domain facts.

Unknown information must remain explicitly unknown.

Use:

- `TBD`
- `UNKNOWN`
- `NOT YET PROVIDED`
- `TO BE VALIDATED`
- `ASSUMPTION`
- `PROPOSED`
- `DECIDED`
- `VERIFIED`

Never disguise placeholders as facts.

---

## Rule 3: Separate facts from decisions

A statement may be:

- FACT
- EVIDENCE
- REQUIREMENT
- ASSUMPTION
- HYPOTHESIS
- PROPOSAL
- DECISION
- CONSTRAINT
- RISK
- UNKNOWN

Do not merge them.

---

## Rule 4: Every consequential decision must be traceable

For consequential decisions record:

- decision ID;
- date/time;
- decision owner;
- participants;
- context;
- options considered;
- evidence;
- decision;
- rationale;
- consequences;
- affected artifacts;
- review date if applicable;
- supersession status.

---

## Rule 5: Corrections supersede; they do not erase history

Do not silently rewrite historical decisions.

If a decision, requirement, architecture choice, assumption, or engineering conclusion changes:

1. preserve the previous record;
2. create a new record;
3. reference the previous record;
4. explain why it changed;
5. identify affected artifacts;
6. trigger required re-review.

This follows the supplied governance philosophy that corrections should supersede rather than erase prior history. fileciteturn3file0L88-L92

---

## Rule 6: Evidence has provenance

Every important engineering claim should be traceable to:

- source;
- author/provider;
- date;
- context;
- evidence type;
- confidence;
- verification status.

---

## Rule 7: No silent failure

Errors, failed tests, blocked tasks, rejected decisions, failed experiments, security findings, deployment failures, and broken assumptions must be recorded when material.

---

## Rule 8: The sanctioned path must be the easiest path

Templates must reduce engineering friction rather than create ceremony.

The repository should make the correct workflow easier than an undocumented workaround.

This directly follows the governance principle that the sanctioned path should be the easy path. fileciteturn3file0L94-L95

---

## Rule 9: Security starts at architecture

Security is not a final checklist.

Security classification, trust boundaries, identity, authorization, secrets, data handling, threat assumptions, auditability, failure behavior, and operational controls are established during architecture.

---

## Rule 10: Human authority remains explicit

Automation and AI agents may:

- propose;
- generate;
- classify;
- test;
- analyze;
- summarize;
- execute authorized reversible actions.

They must not silently acquire authority that has not been granted.

For consequential or irreversible actions, authority and approval must be explicit.

---

# 4. FRAMEWORK INTEGRATION

This skill integrates the following operating concepts.

## 4.1 APSOS

Use APSOS-style intake to separate:

### WHO

- stakeholders;
- users;
- owners;
- operators;
- approvers;
- contributors;
- external parties;
- agents.

### WHAT

- product;
- system;
- service;
- component;
- data;
- infrastructure;
- integration;
- interface;
- deliverable.

### WHY

- business problem;
- user problem;
- technical problem;
- opportunity;
- criticality;
- impact;
- desired outcome;
- failure severity.

### WHEN

- urgency;
- deadline;
- dependency;
- release window;
- operational timing;
- regulatory timing.

Do not collapse these into a single vague project description.

---

# 5. UNPF / PROGRESSIVE UNCERTAINTY REDUCTION

Apply progressive uncertainty reduction before architectural commitment.

Recommended layers:

### Layer 0 — Reality Capture

What actually exists?

Capture:

- supplied documents;
- repositories;
- systems;
- screenshots;
- APIs;
- data;
- existing infrastructure;
- existing workflows;
- current users;
- current constraints.

### Layer 1 — Context Matrix

Establish:

- actors;
- environment;
- system boundary;
- dependencies;
- operating conditions;
- business context;
- technical context.

### Layer 2 — Uncertainty Matrix

List:

- knowns;
- unknowns;
- assumptions;
- contradictions;
- missing evidence;
- unresolved decisions.

### Layer 3 — MECE Decomposition

Break the system into non-overlapping, collectively sufficient areas where practical:

- users;
- business;
- workflow;
- product;
- data;
- application;
- infrastructure;
- security;
- operations;
- governance;
- commercial;
- compliance;
- support.

### Layer 4 — System Model

Define:

- system boundary;
- components;
- interfaces;
- state;
- data flow;
- control flow;
- ownership;
- dependencies.

### Layer 5 — State and Behavior

Define:

- states;
- transitions;
- triggers;
- preconditions;
- postconditions;
- failure states;
- recovery states.

### Layer 6 — Evidence and Validation

Define:

- acceptance criteria;
- test evidence;
- verification;
- validation;
- reproducibility;
- review requirements.

### Layer 7 — Decision

Determine:

- build;
- buy;
- integrate;
- defer;
- reject;
- redesign;
- pilot;
- release.

Higher-risk projects may extend these layers.

---

# 6. PROJECT CLASSIFICATION ENGINE

The agent must classify the project before selecting the repository depth.

Classification dimensions:

## A. Product type

Possible values include:

- CLI/tool
- library/package
- script/automation
- API/service
- web application
- mobile application
- desktop application
- SaaS
- marketplace
- platform
- data product
- analytics product
- AI/ML system
- research software
- simulation/digital twin
- IoT/edge system
- industrial/control system
- infrastructure system
- developer tool
- internal enterprise system
- regulated/high-consequence system
- security-sensitive system
- hybrid system

Multiple classifications may apply.

---

## B. Business model

Possible values:

- internal/no commercial model
- free/open source
- freemium
- subscription
- usage based
- transaction/commission
- enterprise contract
- professional services
- marketplace
- licensing
- hardware + software
- research/grant
- advertising
- mixed

Business model affects:

- billing;
- entitlements;
- tenancy;
- customer data;
- commercial reporting;
- support;
- contracts;
- service levels.

---

## C. Delivery model

- single developer;
- small team;
- multi-team;
- external contributors;
- enterprise;
- regulated organization;
- public/open source;
- customer-specific deployment;
- on-premises;
- cloud;
- edge;
- hybrid.

---

## D. Data sensitivity

Classify:

- public;
- internal;
- confidential;
- restricted;
- personal data;
- financial;
- health;
- security-sensitive;
- proprietary;
- operational/industrial;
- safety-critical.

---

## E. Consequence level

### Level 0 — Low consequence

Failure is inconvenient but easily recoverable.

### Level 1 — Moderate consequence

Failure can cause material business or user impact.

### Level 2 — High consequence

Failure can cause substantial financial, operational, legal, security, or reputational harm.

### Level 3 — Critical consequence

Failure can affect safety, critical infrastructure, major financial exposure, or other high-consequence operations.

Higher consequence requires stronger gates, evidence, approvals, testing, auditability, and operational controls.

---

## F. Complexity

Classify:

### C0 — Simple

Example:

- script;
- small CLI;
- single-purpose automation.

### C1 — Small

Example:

- simple web app;
- small API;
- small internal tool.

### C2 — Moderate

Example:

- SaaS MVP;
- multi-user platform;
- production API;
- data application.

### C3 — Complex

Example:

- AI platform;
- marketplace;
- multi-service product;
- research platform;
- enterprise system.

### C4 — Critical / Large

Example:

- industrial control;
- critical infrastructure;
- regulated platform;
- large enterprise system;
- multi-team distributed platform.

---

# 7. TEMPLATE DEPTH MATRIX

The generated repository must scale with complexity.

| Area | C0 | C1 | C2 | C3 | C4 |
|---|---|---|---|---|---|
| README | Required | Required | Required | Required | Required |
| Requirements | Lite | Full | Full | Full | Controlled |
| Architecture | Lite | Full | Full | Detailed | Controlled |
| ADRs | Optional | Required | Required | Required | Mandatory |
| Issues | Required | Required | Required | Required | Controlled |
| Tasks | Required | Required | Required | Required | Required |
| Decisions | Required | Required | Required | Required | Required |
| Security | Basic | Basic | Full | Detailed | Formal |
| Testing | Unit | Unit + integration | Full | Full + system | V&V |
| CI/CD | Optional | Recommended | Required | Required | Controlled |
| Observability | Basic | Basic | Required | Required | Required |
| Incident management | Lite | Basic | Required | Required | Formal |
| Risk register | Optional | Recommended | Required | Required | Mandatory |
| Threat model | Optional | Recommended | Required | Required | Mandatory |
| Data governance | Minimal | Basic | Required | Detailed | Formal |
| Release governance | Basic | Basic | Required | Controlled | Formal |
| Compliance | As applicable | As applicable | Assessed | Required where applicable | Formal |
| Change control | Basic | Basic | Required | Required | Mandatory |
| Operational runbook | Optional | Recommended | Required | Required | Mandatory |
| Disaster recovery | No | Basic | Required | Required | Formal |
| Business continuity | No | No | Recommended | Required | Formal |
| Reproducibility | Basic | Basic | Required | Required | Mandatory |
| Team governance | Lite | Basic | Required | Required | Formal |

The agent must never create C4 bureaucracy for a C0 project.

---

# 8. INITIAL REPOSITORY GENERATION

The first generated repository should use a structure similar to:

```text
project/
│
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── .gitignore
├── .editorconfig
├── .env.example
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── docs/
│   ├── 00-governance/
│   ├── 01-context/
│   ├── 02-requirements/
│   ├── 03-research/
│   ├── 04-architecture/
│   ├── 05-design/
│   ├── 06-data/
│   ├── 07-security/
│   ├── 08-testing/
│   ├── 09-operations/
│   ├── 10-deployment/
│   ├── 11-decisions/
│   ├── 12-risks/
│   ├── 13-releases/
│   ├── 14-incidents/
│   └── 15-handover/
│
├── engineering/
│   ├── backlog/
│   ├── issues/
│   ├── tasks/
│   ├── discussions/
│   ├── deliberations/
│   ├── decisions/
│   ├── assumptions/
│   ├── questions/
│   ├── risks/
│   ├── dependencies/
│   ├── changes/
│   ├── reviews/
│   ├── evidence/
│   ├── experiments/
│   ├── validations/
│   └── metrics/
│
├── product/
│   ├── problem/
│   ├── users/
│   ├── use-cases/
│   ├── requirements/
│   ├── workflows/
│   ├── acceptance/
│   └── roadmap/
│
├── architecture/
│   ├── system/
│   ├── components/
│   ├── interfaces/
│   ├── integrations/
│   ├── security/
│   ├── deployment/
│   └── diagrams/
│
├── src/
├── tests/
├── scripts/
├── config/
├── infrastructure/
├── migrations/
├── fixtures/
├── examples/
├── benchmarks/
├── notebooks/
└── tools/
```

The agent may simplify this structure for low-complexity projects.

It may expand it for complex projects.

---

# 9. DOCUMENT STATUS MODEL

Every controlled engineering document should have metadata where appropriate:

```yaml
document_id:
title:
type:
status:
version:
owner:
author:
reviewers:
created:
updated:
source_of_truth:
supersedes:
superseded_by:
confidence:
classification:
```

Recommended statuses:

- DRAFT
- PROPOSED
- UNDER_REVIEW
- APPROVED
- ACTIVE
- DEPRECATED
- SUPERSEDED
- RETIRED
- REJECTED

---

# 10. SOURCE-OF-TRUTH MODEL

Every important artifact must identify its source of truth.

Examples:

```text
Product requirements → product/requirements/
Architecture decision → engineering/decisions/
System architecture → architecture/system/
Implementation → src/
Database schema → migrations/
Operational procedure → docs/09-operations/
Security policy → docs/07-security/
Test evidence → engineering/validations/
Release state → docs/13-releases/
```

If two sources disagree, do not silently choose one.

Create a discrepancy issue and resolve it through a recorded decision.

---

# 11. ENGINEERING OBJECT MODEL

The system should conceptually treat these as distinct objects:

```text
Context
  ↓
Problem
  ↓
Requirement
  ↓
Question
  ↓
Evidence
  ↓
Assumption
  ↓
Hypothesis
  ↓
Design
  ↓
Decision
  ↓
Task
  ↓
Implementation
  ↓
Test
  ↓
Validation
  ↓
Release
  ↓
Operation
  ↓
Observation
  ↓
Issue / Change / Improvement
```

Additional relationships:

```text
Issue → Task
Issue → Requirement
Issue → Release

Decision → Requirement
Decision → Architecture
Decision → Evidence

Task → Code
Task → Test
Task → Review

Test → Requirement
Test → Implementation

Release → Change
Release → Validation

Incident → Release
Incident → Decision
Incident → Corrective Action
```

---

# 12. ISSUE TEMPLATE

Every material issue should use a structured template.

```markdown
# ISSUE-[ID]: [TITLE]

## Status
OPEN

## Severity
LOW / MEDIUM / HIGH / CRITICAL

## Type
BUG / REQUIREMENT / SECURITY / PERFORMANCE / DATA / UX / ARCHITECTURE / OPERATIONS / OTHER

## Reporter

## Owner

## Date

## Context

## Observed Condition

## Expected Condition

## Evidence

## Impact

## Reproduction

## Suspected Cause

## Unknowns

## Proposed Resolution

## Related Requirements

## Related Tasks

## Related Decisions

## Validation Required

## Resolution

## Verification

## Closure Evidence
```

---

# 13. TASK TEMPLATE

```markdown
# TASK-[ID]: [TITLE]

## Objective

## Parent Issue / Requirement

## Owner

## Priority

## Status

TODO / IN_PROGRESS / BLOCKED / REVIEW / DONE / CANCELLED

## Preconditions

## Inputs

## Work

## Expected Output

## Acceptance Criteria

- [ ]

## Dependencies

## Risks

## Evidence Produced

## Validation

## Completion Record
```

Tasks must be outcome-oriented.

Do not create tasks such as:

> Work on backend.

Prefer:

> Implement authenticated project creation endpoint satisfying REQ-014 and API contract API-003, with unit and integration tests.

---

# 14. DECISION RECORD TEMPLATE

```markdown
# ADR-[ID]: [DECISION]

## Status
PROPOSED / ACCEPTED / SUPERSEDED / REJECTED

## Date

## Decision Owner

## Context

## Problem

## Evidence

## Constraints

## Options Considered

### Option A

### Option B

### Option C

## Decision

## Rationale

## Consequences

### Positive

### Negative

## Risks

## Affected Components

## Validation Required

## Review Date

## Supersedes

## Superseded By
```

---

# 15. DELIBERATION TEMPLATE

A discussion is not automatically a decision.

```markdown
# DELIBERATION-[ID]: [TOPIC]

## Question

## Context

## Known Facts

## Evidence

## Unknowns

## Positions

### Position A

### Position B

## Arguments

## Counterarguments

## Risks

## Unresolved Questions

## Proposed Decision

## Decision Owner

## Final Decision

## Decision Record
```

This prevents chat discussions from becoming undocumented architecture.

---

# 16. ASSUMPTION REGISTER

Every meaningful assumption should be recorded.

```markdown
# ASSUMPTION-[ID]

## Statement

## Why It Exists

## Source

## Confidence

LOW / MEDIUM / HIGH

## Impact If False

LOW / MEDIUM / HIGH / CRITICAL

## Validation Method

## Owner

## Status

OPEN / VALIDATED / INVALIDATED / SUPERSEDED
```

High-impact assumptions should become validation tasks before irreversible implementation.

---

# 17. REQUIREMENT TEMPLATE

```markdown
# REQ-[ID]: [TITLE]

## Requirement

## Type

FUNCTIONAL / NON_FUNCTIONAL / SECURITY / DATA / OPERATIONAL / BUSINESS / COMPLIANCE

## Source

## Rationale

## Actors

## Preconditions

## Expected Behaviour

## Constraints

## Acceptance Criteria

## Evidence

## Priority

## Dependencies

## Validation Method

## Status
```

Requirements must be testable where practical.

---

# 18. ARCHITECTURE TEMPLATE

Every C1+ system should define:

```text
System Boundary
Actors
Components
Responsibilities
Interfaces
Data Flows
Control Flows
Trust Boundaries
External Dependencies
Failure Modes
State Model
Security Model
Deployment Model
Observability Model
Recovery Model
```

Architecture should answer:

- What exists?
- Why does it exist?
- What owns it?
- What does it depend on?
- What depends on it?
- What happens when it fails?
- How is it secured?
- How is it observed?
- How is it changed?
- How is it retired?

---

# 19. DATA ENGINEERING TEMPLATE

Where data exists, generate:

```text
data/
  contracts/
  schemas/
  dictionaries/
  lineage/
  quality/
  migrations/
  fixtures/
  samples/
  retention/
  privacy/
```

Document:

- source;
- owner;
- schema;
- lineage;
- freshness;
- quality;
- sensitivity;
- retention;
- transformation;
- validation;
- deletion;
- access.

No mock data may be silently represented as production data.

Simulated, estimated, stale, missing, and synthetic values must be explicitly classified.

This follows the supplied principle that simulated or placeholder values must not be allowed to manufacture false trust. fileciteturn3file0L76-L77

---

# 20. SECURITY TEMPLATE

For C2+ or security-sensitive systems generate:

```text
docs/07-security/
├── security-model.md
├── threat-model.md
├── trust-boundaries.md
├── identity-and-access.md
├── secrets-management.md
├── data-protection.md
├── dependency-security.md
├── vulnerability-management.md
├── security-testing.md
└── incident-response.md
```

The threat model should identify:

- assets;
- actors;
- trust boundaries;
- attack surfaces;
- threats;
- controls;
- residual risk;
- monitoring;
- response.

Security controls should be deterministic where practical.

---

# 21. TESTING AND VALIDATION

Testing is not one activity.

Generate appropriate layers:

```text
Unit
Integration
Contract
Component
System
End-to-End
Performance
Security
Reliability
Recovery
Usability
Accessibility
Data Quality
Regression
Acceptance
```

For high-consequence systems add:

```text
Verification
Validation
Independent Review
Precondition Checks
Failure Injection
Rollback Testing
Operational Readiness
```

A test result should record:

- test ID;
- version;
- environment;
- inputs;
- expected result;
- actual result;
- status;
- evidence;
- reviewer;
- timestamp.

---

# 22. RELEASE WORKFLOW

The default lifecycle is:

```text
Idea
 ↓
Context Capture
 ↓
Classification
 ↓
Problem Definition
 ↓
Requirements
 ↓
Evidence
 ↓
Architecture
 ↓
Design
 ↓
Implementation
 ↓
Testing
 ↓
Review
 ↓
Release Candidate
 ↓
Validation
 ↓
Approval
 ↓
Release
 ↓
Observation
 ↓
Feedback
 ↓
Change
```

No release should depend on undocumented tribal knowledge.

---

# 23. CHANGE MANAGEMENT

Every material change must answer:

```text
What changed?
Why?
Who requested it?
What evidence supports it?
What requirements are affected?
What architecture is affected?
What risks change?
What tests change?
What users are affected?
What data is affected?
What documentation must change?
Who approves?
How is rollback handled?
```

---

# 24. REVERSIBILITY LANES

Classify actions as:

### REVERSIBLE

Examples:

- local code change;
- draft documentation;
- non-production experiment.

Gate:

- record and proceed.

### CONSEQUENTIAL

Examples:

- production configuration change;
- schema migration;
- permission change;
- public release.

Gate:

- reason;
- authorized role;
- validation;
- appropriate review.

### IRREVERSIBLE

Examples:

- destructive migration;
- permanent data deletion;
- irreversible infrastructure change;
- externally binding commitment.

Gate:

- explicit named approval;
- verified preconditions;
- backup/containment;
- rollback or recovery plan;
- recorded execution.

The governance philosophy explicitly uses these three lanes to scale control to consequence. fileciteturn3file0L57-L63

---

# 25. AGENT WORKFLOW

When an AI agent receives a new project, it must execute this sequence.

## STEP 1 — Bootstrap

Create the repository engineering template.

Do not start feature development.

---

## STEP 2 — Classify

Determine:

- product type;
- business model;
- users;
- delivery model;
- data sensitivity;
- consequence level;
- complexity;
- expected team size;
- integration count;
- deployment environment;
- regulatory/security requirements if known.

Unknown values remain unknown.

---

## STEP 3 — Select Template Depth

Select C0–C4 and consequence controls.

Do not over-engineer.

Do not under-govern.

---

## STEP 4 — Generate Repository

Create:

- directories;
- templates;
- README;
- governance files;
- issue templates;
- task templates;
- decision templates;
- architecture templates;
- test templates;
- security templates where applicable;
- deployment templates;
- operational templates.

---

## STEP 5 — Create Initial Control Records

Create:

```text
PROJECT-CONTEXT.md
PROJECT-CLASSIFICATION.md
UNCERTAINTY-REGISTER.md
ASSUMPTION-REGISTER.md
RISK-REGISTER.md
DECISION-LOG.md
CHANGE-LOG.md
DEPENDENCY-REGISTER.md
```

Initially these may contain only:

```text
Status: OPEN
Known information: NOT YET PROVIDED
```

Do not fabricate content.

---

## STEP 6 — Establish Source of Truth

Record where each project artifact will live.

---

## STEP 7 — Establish Team Model

Define:

- project owner;
- product owner;
- technical owner;
- security owner where applicable;
- data owner where applicable;
- reviewer;
- release authority;
- operational owner;
- agent roles.

If people are unknown, create role placeholders rather than inventing names.

---

## STEP 8 — Establish Workflow

Create:

```text
INTAKE
→ DISCOVERY
→ REQUIREMENTS
→ DESIGN
→ BUILD
→ TEST
→ REVIEW
→ RELEASE
→ OPERATE
→ IMPROVE
```

---

## STEP 9 — Establish Communication Rules

Important engineering decisions must not live exclusively in:

- WhatsApp;
- Slack;
- Discord;
- email;
- meetings;
- agent conversation history.

Those channels may be used for discussion.

Material conclusions must be transferred into the repository.

---

## STEP 10 — Establish Evidence Rules

Every important claim must have a source or be explicitly classified as:

- assumption;
- proposal;
- hypothesis;
- estimate;
- unknown.

---

## STEP 11 — Begin Project Context

Only after the scaffold exists should the user/project context be ingested into the workspace.

---

# 26. TEAM OPERATING MODEL

The repository should support at least these roles:

```text
PROJECT OWNER
PRODUCT OWNER
TECHNICAL LEAD
ENGINEER
DESIGNER
DATA/ML ENGINEER
SECURITY OWNER
QA/VALIDATION
DEVOPS/INFRASTRUCTURE
OPERATIONS
REVIEWER
AI AGENT
```

Roles are not necessarily separate people.

One person may hold multiple roles in a small project.

The distinction exists to separate responsibilities.

---

# 27. AI AGENT GOVERNANCE

Agents must operate as accountable participants.

Every agent contribution should be attributable where practical.

Record:

- agent identity;
- task;
- input context;
- output;
- tools used;
- evidence used;
- decisions proposed;
- decisions executed;
- human approval where required.

Agents should never conceal uncertainty.

If an agent cannot establish a fact, it should say:

```text
UNKNOWN
```

rather than infer a convenient answer.

---

# 28. AGENT ACTION CLASSES

### Class A — Informational

Agent may:

- read;
- summarize;
- classify;
- search;
- propose;
- generate drafts.

### Class B — Reversible engineering

Agent may:

- create files;
- modify code;
- run tests;
- create branches;
- create issues;
- update drafts.

### Class C — Consequential

Requires appropriate authorization:

- merge protected code;
- deploy;
- change production configuration;
- modify permissions;
- modify schemas;
- publish externally.

### Class D — Irreversible

Requires explicit named authorization:

- destructive deletion;
- irreversible migration;
- permanent data removal;
- production action with no reliable rollback.

---

# 29. GOVERNANCE GATES

Use gates proportional to risk.

## G0 — Intake Gate

Questions:

- What is being built?
- Why?
- Who owns it?
- Who uses it?
- What is unknown?

## G1 — Context Gate

Questions:

- Is reality captured?
- Are boundaries understood?
- Are sources identified?

## G2 — Requirements Gate

Questions:

- Are requirements clear?
- Are acceptance criteria defined?
- Are conflicts resolved?

## G3 — Architecture Gate

Questions:

- Is architecture appropriate?
- Are trust boundaries understood?
- Are failure modes considered?
- Is security built in?

## G4 — Build Gate

Questions:

- Are implementation tasks traceable?
- Are dependencies known?
- Are changes recorded?

## G5 — Validation Gate

Questions:

- Does the system work?
- Does it satisfy requirements?
- Is evidence sufficient?

## G6 — Release Gate

Questions:

- Is the release authorized?
- Are operational controls ready?
- Is rollback/recovery defined?

## G7 — Operations Gate

Questions:

- Is the system observable?
- Are incidents managed?
- Are changes controlled?
- Is technical debt tracked?

Critical systems may require additional gates.

---

# 30. PRE-SEAL TEST

Before a consequential engineering record is finalized, ask:

1. Who is acting?
2. Are they authorized?
3. Why is the action being taken?
4. What evidence supports it?
5. How fresh is that evidence?
6. What is the confidence level?
7. What requirement or decision does it affect?
8. What risk does it introduce?
9. What system/component does it affect?
10. How can it be corrected?
11. Who owns the correction?
12. What is the rollback/recovery path?

If a consequential action cannot answer these questions, do not silently proceed.

This adapts the supplied pre-seal test from operational governance into software engineering governance. fileciteturn3file0L128-L137

---

# 31. REPOSITORY HEALTH CHECK

The agent should periodically evaluate:

## Structure

- Are required directories present?
- Are stale artifacts identified?
- Are source-of-truth locations clear?

## Requirements

- Are requirements traceable?
- Are unresolved requirements visible?

## Decisions

- Are architecture decisions recorded?
- Are superseded decisions marked?

## Work

- Are tasks linked to outcomes?
- Are blocked tasks visible?

## Evidence

- Are important claims supported?
- Are test results recorded?

## Security

- Are known risks tracked?
- Are secrets protected?
- Are trust boundaries documented?

## Operations

- Can another engineer operate the system?
- Can incidents be investigated?
- Can the system be recovered?

## Governance

- Does every consequential artifact have an owner?
- Does every sealed artifact have a retirement path?

The supplied philosophy explicitly requires ownership and retirement paths for sealed artifacts such as configurations, models, thresholds, and procedures. fileciteturn3file0L91-L92

---

# 32. FAILURE MODES TO DETECT

The skill should actively detect:

### Shadow engineering

Important work happens outside the repository.

### Decision laundering

A final decision exists without the reasoning or evidence.

### Documentation fiction

Documentation describes a system that does not match implementation.

### Fabricated completeness

Placeholder values are represented as real.

### Authority vacuum

Nobody is clearly authorized to approve or retire important artifacts.

### Stale control

Old requirements, architecture, models, configurations, or procedures remain active.

### Ceremony without judgment

Everything is checked but nobody evaluated whether the result is actually correct.

### Agent hallucination

The agent fills missing context with unsupported assumptions.

### Process overload

The repository contains so much bureaucracy that engineers bypass it.

### Repository fragmentation

Multiple competing sources of truth emerge.

### Untraceable change

Code changed but the requirement, decision, reason, or validation cannot be found.

---

# 33. MINIMUM STARTER PACK

Regardless of project size, the agent should normally generate:

```text
README.md

docs/
  project-context.md
  project-classification.md
  engineering-workflow.md
  architecture.md

engineering/
  issues/
  tasks/
  decisions/
  discussions/
  assumptions/
  risks/
  evidence/
  changes/
  validations/

product/
  requirements/
  use-cases/

tests/
```

For C0 projects this may be compressed.

For C3/C4 projects it should be expanded.

---

# 34. GENERATED FILE TEMPLATES

At minimum generate:

```text
README.md
CONTRIBUTING.md
SECURITY.md
CHANGELOG.md

docs/project-context.md
docs/project-classification.md
docs/engineering-workflow.md
docs/architecture.md

engineering/assumptions/README.md
engineering/decisions/README.md
engineering/discussions/README.md
engineering/evidence/README.md
engineering/issues/README.md
engineering/tasks/README.md
engineering/risks/README.md
engineering/changes/README.md
engineering/validations/README.md

product/requirements/README.md
product/use-cases/README.md

tests/README.md
```

For larger projects also generate:

```text
docs/security/
docs/data/
docs/operations/
docs/deployment/
docs/testing/
docs/release/
docs/compliance/
docs/handover/

engineering/dependencies/
engineering/metrics/
engineering/experiments/
engineering/reviews/
engineering/incidents/
```

---

# 35. DEFINITION OF READY

A work item is READY when:

- objective is clear;
- owner exists;
- required context exists;
- dependencies are known;
- acceptance criteria exist;
- material unknowns are identified;
- required evidence is available or explicitly assigned;
- risk is acceptable;
- required design is available.

---

# 36. DEFINITION OF DONE

A work item is DONE when:

- implementation is complete;
- acceptance criteria are satisfied;
- required tests pass;
- evidence exists;
- review is complete;
- documentation is updated;
- related decisions are recorded;
- operational impact is addressed;
- unresolved risks are recorded;
- source of truth is updated.

"Code exists" is not equivalent to DONE.

---

# 37. HANDOVER STANDARD

A project should be transferable to another competent engineer.

The handover test is:

> Can a new engineer understand, run, test, modify, deploy, monitor, troubleshoot, and safely change the system without relying on undocumented tribal knowledge?

If not, the project is not operationally mature.

---

# 38. TEMPLATE ADAPTATION RULES

The generated template must adapt to:

### Product complexity

More components → more architecture and dependency documentation.

### Team size

More contributors → stronger ownership, review, task, branch, and communication controls.

### Business model

Commercial systems → billing, entitlement, customer data, contracts, support, service levels.

### Data sensitivity

Sensitive data → stronger access, retention, encryption, audit, privacy, and incident controls.

### AI usage

AI systems → model provenance, evaluation, datasets, prompts/configuration where relevant, model/version registry, evaluation evidence, fallback behavior, human oversight.

### Research software

Research systems → experiment tracking, evidence, reproducibility, datasets, hypotheses, methods, results, validation.

### Industrial/edge systems

Add:

- asset identity;
- telemetry provenance;
- timing class;
- offline behavior;
- safety boundaries;
- control authority;
- field deployment;
- recovery;
- maintenance;
- audit trail.

### Regulated/high-consequence systems

Add:

- formal requirements traceability;
- verification/validation;
- approval matrix;
- independent review;
- controlled release;
- configuration management;
- audit evidence;
- incident management;
- retention;
- formal change control.

---

# 39. PRODUCT-TYPE EXTENSIONS

The generator should select extensions automatically.

## SaaS

Add:

```text
tenancy/
billing/
entitlements/
subscriptions/
customer-support/
service-levels/
```

## Marketplace

Add:

```text
buyers/
sellers/
transactions/
fees/
disputes/
trust/
moderation/
```

## AI/ML

Add:

```text
models/
datasets/
evaluations/
prompts/
experiments/
model-cards/
safety/
```

## Research

Add:

```text
hypotheses/
methods/
experiments/
results/
reproducibility/
evidence/
```

## API

Add:

```text
contracts/
versioning/
authentication/
rate-limits/
errors/
compatibility/
```

## Mobile

Add:

```text
platforms/
release/
store/
device-testing/
offline/
```

## Industrial / IoT

Add:

```text
assets/
telemetry/
edge/
control/
safety/
field-deployment/
maintenance/
```

## Security-sensitive

Add:

```text
threat-model/
security-tests/
vulnerability-management/
incident-response/
access-review/
```

---

# 40. GRAPH / TRACEABILITY MODEL

For complex systems, maintain traceability across:

```text
Problem
  ↓
Requirement
  ↓
Design
  ↓
Decision
  ↓
Task
  ↓
Code
  ↓
Test
  ↓
Evidence
  ↓
Release
  ↓
Outcome
```

A requirement should ideally answer:

> Where is it implemented and how was it validated?

A code change should answer:

> Why does it exist?

A test should answer:

> Which requirement or risk does it validate?

A release should answer:

> What changed and what evidence supports release?

---

# 41. ENGINEERING MEMORY

The repository must preserve institutional memory.

Do not delete historical engineering context simply because it is no longer current.

Use:

- superseded;
- deprecated;
- retired;
- archived.

Preserve historical reasoning when it materially explains the system.

---

# 42. SOURCE AND EVIDENCE QUALITY

For important engineering claims, use a simple evidence hierarchy:

### E0 — Unknown

No supporting evidence.

### E1 — Assertion

Someone states it.

### E2 — Documentary

Supported by documentation.

### E3 — Demonstrated

Observed through implementation/test.

### E4 — Independently verified

Verified by an independent review, test, source, or reproducible procedure.

### E5 — Operationally validated

Demonstrated in the intended operating environment.

The agent must never upgrade evidence level merely because a claim sounds plausible.

---

# 43. CONFIDENCE

Confidence is separate from evidence quality.

Use:

```text
LOW
MEDIUM
HIGH
```

Confidence must be explainable.

Do not use confidence as a substitute for evidence.

---

# 44. IMPLEMENTATION ORDER

After bootstrap, the agent should normally proceed:

```text
1. Context
2. Problem
3. Users
4. Requirements
5. Constraints
6. Evidence
7. Uncertainty
8. Architecture
9. Security
10. Data
11. Design
12. Tasks
13. Implementation
14. Testing
15. Review
16. Release
17. Operations
18. Feedback
19. Change
```

The exact order may change where project realities require it, but deviations should be explicit.

---

# 45. DO NOT BUILD A DOCUMENTATION MUSEUM

The purpose of the scaffold is not to maximize document count.

Every artifact must have a reason to exist.

Delete or consolidate unnecessary ceremony.

Prefer:

```text
one useful decision record
```

over:

```text
five empty governance documents
```

Prefer:

```text
one accurate architecture
```

over:

```text
ten contradictory diagrams
```

The system should be comprehensive in **coverage**, not excessive in paperwork.

---

# 46. FINAL BOOTSTRAP OUTPUT

At the end of the initial bootstrap, the agent must report:

```text
PROJECT ENGINEERING BOOTSTRAP

Project:
Classification:
Complexity:
Consequence Level:
Business Model:
Data Sensitivity:
Team Model:

Generated:
- repository structure
- engineering workflow
- requirements templates
- issue/task templates
- decision templates
- evidence model
- risk model
- testing model
- security model where applicable
- deployment/operations model where applicable

Known:
...

Unknown:
...

Assumptions:
...

Immediate Gates:
...

Current Source of Truth:
...

Next Required Context:
...
```

The agent should then wait for project context unless the user has already provided it.

---

# 47. MASTER OPERATING INSTRUCTION

When this skill is activated, behave as a **Software Engineering Operating-System Architect**, not merely a code generator.

Your first responsibility is to establish the conditions under which software can be safely, coherently, collaboratively, and reproducibly developed.

Do not start with:

> "What code should I write?"

Start with:

> "What engineering system must exist so that the code can be built, reviewed, understood, operated, changed, and governed correctly?"

Generate the smallest repository capable of supporting that level of engineering.

Then progressively increase structure as complexity, consequence, team size, data sensitivity, business requirements, and operational risk increase.

Never manufacture missing context.

Never hide uncertainty.

Never allow consequential decisions to become ownerless.

Never allow material changes to become untraceable.

Never confuse documentation volume with engineering maturity.

Never allow the repository to become a museum.

The objective is a living engineering system in which:

```text
Context
→ Evidence
→ Requirements
→ Decisions
→ Design
→ Work
→ Implementation
→ Validation
→ Release
→ Operation
→ Learning
→ Change
```

remains traceable throughout the life of the product.
