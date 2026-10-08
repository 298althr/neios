// Output structurer + deterministic validation for the worked example
// (direction doc §5.F invoice_draft schema, §5.G validation, §4.5 provenance).

export type Provenance = "input_fact" | "model_derived" | "system_derived" | "human_confirmed";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface InvoiceDraft {
  document_type: "invoice_draft";
  supplier: Record<string, unknown>;
  buyer: Record<string, unknown>;
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  delivery_terms: string | null;
  missing_fields: string[];
  review_required: boolean;
  field_provenance: Record<string, Provenance>;
}

export interface ValidationIssue {
  field: string;
  issue: string;
}

/** Deterministic repair: evaluate pure numeric expressions ("a + b * c") that
 *  small models sometimes emit where a JSON number is expected. Only matches
 *  sequences of digits, dots and arithmetic operators — nothing else is
 *  evaluated, so this cannot execute code. */
function repairNumericExpressions(json: string): string {
  const expr = /:\s*((?:(?:\d+(?:\.\d+)?|null)\s*[-+*/]\s*)+(?:\d+(?:\.\d+)?|null))/g;
  return json.replace(expr, (_m, e: string) => {
    try {
      const val = Function(`"use strict"; return (${e.replace(/\bnull\b/g, "0")});`)() as number;
      return Number.isFinite(val) ? `: ${JSON.stringify(val)}` : _m;
    } catch {
      return _m;
    }
  });
}

/** Extract a JSON object from model output (raw JSON or fenced code block). */
export function parseInvoiceDraft(text: string): InvoiceDraft {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = repairNumericExpressions(fenced ? fenced[1] : text);
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("model output contained no JSON object");
  }
  const parsed = JSON.parse(candidate.slice(start, end + 1)) as InvoiceDraft;
  if (parsed.document_type !== "invoice_draft") {
    throw new Error(`expected document_type "invoice_draft", got ${JSON.stringify(parsed.document_type)}`);
  }
  if (!Array.isArray(parsed.items)) {
    throw new Error("invoice_draft.items must be an array");
  }
  return parsed;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Deterministic checks only — never delegated to the model (§5.G). */
export function validateInvoiceDraft(draft: InvoiceDraft): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();

  draft.items.forEach((item, i) => {
    if (!item.description?.trim()) issues.push({ field: `items[${i}].description`, issue: "missing" });
    if (!(item.quantity > 0)) issues.push({ field: `items[${i}].quantity`, issue: "not positive" });
    if (!(item.unit_price >= 0)) issues.push({ field: `items[${i}].unit_price`, issue: "negative or invalid" });
    const expected = round2(item.quantity * item.unit_price);
    if (Math.abs((item.line_total ?? NaN) - expected) > 0.01) {
      issues.push({ field: `items[${i}].line_total`, issue: `${item.line_total} != ${item.quantity}*${item.unit_price}` });
    }
    const key = item.description?.trim().toLowerCase();
    if (key && seen.has(key)) issues.push({ field: `items[${i}].description`, issue: "duplicate line item" });
    if (key) seen.add(key);
  });

  const subtotal = round2(draft.items.reduce((s, i) => s + i.quantity * i.unit_price, 0));
  if (Math.abs((draft.subtotal ?? NaN) - subtotal) > 0.01) {
    issues.push({ field: "subtotal", issue: `${draft.subtotal} != computed ${subtotal}` });
  }
  const total = round2(subtotal + (draft.tax ?? 0));
  if (Math.abs((draft.total ?? NaN) - total) > 0.01) {
    issues.push({ field: "total", issue: `${draft.total} != computed ${total}` });
  }
  if (!Object.keys(draft.supplier ?? {}).length) issues.push({ field: "supplier", issue: "missing" });
  if (!Object.keys(draft.buyer ?? {}).length) issues.push({ field: "buyer", issue: "missing" });

  return issues;
}

/** §4.5: mark a field input_fact if its value literally appears in the intake. */
export function fieldProvenance(draft: InvoiceDraft, intakeText: string): Record<string, Provenance> {
  const haystack = intakeText.toLowerCase();
  const prov: Record<string, Provenance> = { document_type: "system_derived" };
  for (const [k, v] of Object.entries({ ...draft.supplier, ...draft.buyer, currency: draft.currency, delivery_terms: draft.delivery_terms })) {
    prov[k] = typeof v === "string" && v && haystack.includes(v.toLowerCase()) ? "input_fact" : "model_derived";
  }
  draft.items.forEach((item, i) => {
    prov[`items[${i}].description`] = haystack.includes(item.description.toLowerCase()) ? "input_fact" : "model_derived";
  });
  prov.subtotal = "system_derived";
  prov.tax = "model_derived";
  prov.total = "system_derived";
  return prov;
}
