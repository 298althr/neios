// ADCOS-lite — deterministic policy gate executed BEFORE any model call
// (direction doc §4.3). The model never decides whether it is allowed to run.

import type { ApsosIntake } from "./apsos.ts";
import { missingFields } from "./apsos.ts";
import type { NeiosRoleCard } from "./role.ts";

export type PolicyDecision = "ALLOW" | "BLOCK" | "REVIEW";

export interface PolicyResult {
  decision: PolicyDecision;
  lane: number;
  reasons: string[];
}

export function evaluatePolicy(intake: ApsosIntake, role: NeiosRoleCard | undefined): PolicyResult {
  const reasons: string[] = [];

  if (!role) {
    return { decision: "BLOCK", lane: 0, reasons: ["no matching role card — unknown role"] };
  }
  const lane = role.approvalLane;

  if (!role.allowedActions.includes(intake.what.workType)) {
    reasons.push(`work type "${intake.what.workType}" is not in role's allowed actions`);
    return { decision: "BLOCK", lane, reasons };
  }
  if (!role.allowedOutputTypes.includes(intake.what.requestedOutput)) {
    reasons.push(`requested output "${intake.what.requestedOutput}" is not in role's allowed output types`);
    return { decision: "BLOCK", lane, reasons };
  }

  const missing = missingFields(intake, role.requiredFields);
  if (missing.length > 0) {
    reasons.push(`missing required intake fields: ${missing.join(", ")}`);
    return { decision: "BLOCK", lane, reasons };
  }

  if (intake.why.criticality === "high" || intake.when.urgency === "critical" || lane >= 2) {
    reasons.push("lane >= 2 or high criticality — human approval required before output is final");
    return { decision: "REVIEW", lane, reasons };
  }

  return { decision: "ALLOW", lane, reasons: [] };
}
