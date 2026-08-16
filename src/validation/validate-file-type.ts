import { invalid, VALID, type ValidationResult } from "./_shared.js";

/** @example validateFileType(file, ["image/png"]) // { valid: true } */
export function validateFileType(
  file: File,
  allowedTypes: readonly string[],
): ValidationResult {
  if (!allowedTypes.includes(file.type)) {
    return invalid(
      `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(", ")}`,
    );
  }
  return VALID;
}
