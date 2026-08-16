import { invalid, VALID, type ValidationResult } from "./_shared.js";

/**
 * Validates a file's MIME type against an explicit list of allowed types.
 *
 * @example validateFileType(file, ["image/png"]) // { valid: true }
 */
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
