// NEIOS Role Card — direction doc §5.B (simpler than the future-layer
// packages/role-cards schema; that schema targets the Workforce marketplace
// runtime and is intentionally not reused here).

export interface NeiosRoleCard {
  id: string;
  name: string;
  purpose: string;
  allowedInputTypes: string[];
  allowedOutputTypes: string[];
  /** Work types this role may execute, e.g. "procurement_invoice". */
  allowedActions: string[];
  /** 0 informational | 1 org work output | 2+ human approval required (§5.H). */
  approvalLane: 0 | 1 | 2;
  languages: string[];
  /** APSOS paths that must be present before execution (§5.D). */
  requiredFields: string[];
}

export const ROLE_REGISTRY: NeiosRoleCard[] = [
  {
    id: "procurement-assistant",
    name: "Procurement Assistant",
    purpose:
      "Convert a Nigerian SME staff purchase request into a structured, reviewable invoice draft. Produces drafts only — never executes real procurement, payment, or ERP writes.",
    allowedInputTypes: ["text", "structured"],
    allowedOutputTypes: ["invoice_draft"],
    allowedActions: ["procurement_invoice"],
    approvalLane: 2,
    languages: ["en", "pcm", "ha", "ig", "yo"],
    requiredFields: ["who.requester", "what.workType", "what.items", "why.purpose"],
  },
];

export function getRole(id: string): NeiosRoleCard | undefined {
  return ROLE_REGISTRY.find((r) => r.id === id);
}
