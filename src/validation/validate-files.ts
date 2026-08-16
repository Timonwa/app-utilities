import type { ValidationResult } from "./_shared.js";

/** @example validateFiles(files, validateImageFile) // one result per file */
export function validateFiles(
  files: File[],
  validator: (file: File) => ValidationResult,
): ValidationResult[] {
  return files.map(validator);
}
