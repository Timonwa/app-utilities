import type { ValidationResult } from "./_shared.js";

export interface ValidatePasswordOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

/**
 * Password rules, each toggleable. Returns every failed rule in `messages` so a form
 * can render the full checklist; `message` is the first, matching the shared shape.
 *
 * @example validatePassword("Password123") // { valid: true, messages: [] }
 */
export function validatePassword(
  password: string,
  options: ValidatePasswordOptions = {},
): ValidationResult & { messages: string[] } {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;

  const messages: string[] = [];
  if (password.length < minLength)
    messages.push(`Password must be at least ${minLength} characters`);
  if (requireUppercase && !/[A-Z]/.test(password))
    messages.push("Password must contain at least one uppercase letter");
  if (requireLowercase && !/[a-z]/.test(password))
    messages.push("Password must contain at least one lowercase letter");
  if (requireNumbers && !/[0-9]/.test(password))
    messages.push("Password must contain at least one number");
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    messages.push("Password must contain at least one special character");

  return { valid: messages.length === 0, message: messages[0], messages };
}
