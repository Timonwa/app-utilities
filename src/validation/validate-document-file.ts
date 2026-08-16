import type { ValidationResult } from "./_shared.js";
import { validateFileType } from "./validate-file-type.js";

/** Word and PDF; pass your product's own list to change the policy. */
export const DEFAULT_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/** @example validateDocumentFile(file) // { valid: true } */
export function validateDocumentFile(
  file: File,
  allowedTypes: readonly string[] = DEFAULT_DOCUMENT_TYPES,
): ValidationResult {
  return validateFileType(file, allowedTypes);
}
