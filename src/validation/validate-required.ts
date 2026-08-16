import { invalid, VALID, type ValidationResult } from "./_shared.js";

/**
 * Non-empty check across the shapes a form produces — `undefined`, `null`, a
 * whitespace-only string, or an empty array all fail.
 *
 * @example validateRequired("", "Name") // { valid: false, message: "Name is required" }
 */
export function validateRequired(value: unknown, fieldName: string): ValidationResult {
  if (value === undefined || value === null) return invalid(`${fieldName} is required`);
  if (typeof value === "string" && value.trim() === "")
    return invalid(`${fieldName} is required`);
  if (Array.isArray(value) && value.length === 0)
    return invalid(`${fieldName} is required`);
  return VALID;
}
