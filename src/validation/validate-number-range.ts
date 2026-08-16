import { invalid, VALID, type ValidationResult } from "./_shared.js";

/**
 * Validates that a number falls within an inclusive min-max range.
 *
 * @example validateNumberRange(5, 1, 10) // { valid: true }
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName = "Value",
): ValidationResult {
  if (value < min) return invalid(`${fieldName} must be at least ${min}`);
  if (value > max) return invalid(`${fieldName} must be no more than ${max}`);
  return VALID;
}
