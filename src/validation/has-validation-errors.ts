import type { ValidationResult } from "./_shared.js";

/** @example hasValidationErrors(results) // true when any result is invalid */
export function hasValidationErrors(results: ValidationResult[]): boolean {
  return results.some((result) => !result.valid);
}
