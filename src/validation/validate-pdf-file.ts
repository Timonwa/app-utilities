import type { ValidationResult } from "./_shared.js";
import { validateFileType } from "./validate-file-type.js";

/** @example validatePdfFile(file) // { valid: true } */
export function validatePdfFile(file: File): ValidationResult {
  return validateFileType(file, ["application/pdf"]);
}
