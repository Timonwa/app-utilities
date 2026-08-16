/**
 * Splits a full name into a first name and everything after it.
 *
 * Deliberately naive: names do not decompose reliably, and guessing at particles or
 * multi-word surnames gets it wrong more often than this does. Use it to prefill a form
 * the person can correct, never as a source of truth.
 *
 * @example splitFullName("Ada Lovelace") // { firstName: "Ada", lastName: "Lovelace" }
 * @example splitFullName("Ada King Lovelace") // { firstName: "Ada", lastName: "King Lovelace" }
 */
export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const [firstName = "", ...rest] = String(fullName ?? "")
    .trim()
    .split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
}
