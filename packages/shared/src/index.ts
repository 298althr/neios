// Shared types — scaffold placeholder for the future-extension layer (formerly
// "VLTHR HR"). Lane model mirrors ARWOS reversibility lanes (FR-A05); NEIOS uses
// a simplified 3-lane model per docs/04-architecture/ENGINEERING-DIRECTION-NAIC-2026.md §5.H.

export type Lane = 0 | 1 | 2 | 3;

export const LANE_LABELS: Record<Lane, string> = {
  0: "read-only (auto-approve)",
  1: "reversible (auto-approve + log)",
  2: "expensive to undo (human/reviewer approval)",
  3: "irreversible (human + org-level approval)",
};
