// APSOS — structured work-intake layer (direction doc §4.1).
// Conceptual separation who/what/why/when is mandatory; field names may be
// simplified but the separation is preserved here.

export interface ApsosIntake {
  who: {
    requester: string;
    organisation?: string;
    counterparties?: string[];
  };
  what: {
    workType: string;
    /** Free-text or structured description of the work items. */
    items?: unknown[];
    requestedOutput: string;
    /** Raw source text the intake was built from, for provenance. */
    sourceText?: string;
  };
  why: {
    purpose: string;
    criticality: "low" | "medium" | "high";
    severity?: "low" | "medium" | "high";
  };
  when: {
    urgency: "routine" | "urgent" | "critical";
    dueAt?: string | null;
  };
}

/** PURF-lite (§4.2): report which declared field paths are missing/empty. */
export function missingFields(intake: ApsosIntake, required: string[]): string[] {
  return required.filter((path) => {
    const value = path.split(".").reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
      return undefined;
    }, intake as unknown as Record<string, unknown>);
    return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
  });
}
