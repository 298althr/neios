// Shared types for VLTHR HR — scaffold placeholder.
// Lane model mirrors ARWOS reversibility lanes (FR-A05).

export type Lane = 0 | 1 | 2 | 3;

export const LANE_LABELS: Record<Lane, string> = {
  0: "read-only (auto-approve)",
  1: "reversible (auto-approve + log)",
  2: "expensive to undo (human/reviewer approval)",
  3: "irreversible (human + org-level approval)",
};
