import { invalid, VALID, type ValidationResult } from "./_shared.js";

/** @example validateUrl("https://example.com") // { valid: true } */
export function validateUrl(url: string): ValidationResult {
  try {
    new URL(url);
    return VALID;
  } catch {
    return invalid("Invalid URL format");
  }
}
