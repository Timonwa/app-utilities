import { invalid, VALID, type ValidationResult } from "./_shared.js";

/** @example validateFileSize(file, 5) // { valid: true } */
export function validateFileSize(file: File, maxSizeInMb: number): ValidationResult {
  if (file.size > maxSizeInMb * 1024 * 1024) {
    return invalid(`File size must be less than ${maxSizeInMb}MB`);
  }
  return VALID;
}
