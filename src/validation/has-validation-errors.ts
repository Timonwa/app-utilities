import type { ValidationResult } from "./_shared.js";

/**
 * Checks whether any result in a list of validation results is invalid.
 *
 * @example hasValidationErrors(results) // true when any result is invalid
 */
export function hasValidationErrors(results: ValidationResult[]): boolean {
  return results.some((result) => !result.valid);
}
