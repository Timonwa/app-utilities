import { invalid, VALID, type ValidationResult } from "./_shared.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Format-level email check — `something@something.tld`. Deliberately loose: the only real
 * validation of an email address is sending mail to it.
 *
 * @example validateEmail("test@example.com") // { valid: true }
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === "") return invalid("Email is required");
  if (!EMAIL_REGEX.test(email)) return invalid("Invalid email format");
  return VALID;
}
