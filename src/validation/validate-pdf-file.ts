import type { ValidationResult } from "./_shared.js";
import { validateFileType } from "./validate-file-type.js";

/**
 * Validates that a file's MIME type is `application/pdf`.
 *
 * @example validatePdfFile(file) // { valid: true }
 */
export function validatePdfFile(file: File): ValidationResult {
  return validateFileType(file, ["application/pdf"]);
}
