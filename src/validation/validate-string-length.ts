import { invalid, VALID, type ValidationResult } from "./_shared.js";

/** @example validateStringLength("hello", 1, 10) // { valid: true } */
export function validateStringLength(
  value: string,
  minLength: number,
  maxLength: number,
  fieldName = "Field",
): ValidationResult {
  if (value.length < minLength)
    return invalid(`${fieldName} must be at least ${minLength} characters`);
  if (value.length > maxLength)
    return invalid(`${fieldName} must be no more than ${maxLength} characters`);
  return VALID;
}
