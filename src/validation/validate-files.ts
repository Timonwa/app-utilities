import type { ValidationResult } from "./_shared.js";

/**
 * Runs one validator over a list of files, returning a result per file.
 *
 * @example validateFiles(files, validateImageFile) // one result per file
 */
export function validateFiles(
  files: File[],
  validator: (file: File) => ValidationResult,
): ValidationResult[] {
  return files.map(validator);
}
