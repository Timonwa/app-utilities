import type { ValidationResult } from "./_shared.js";
import { validateFileType } from "./validate-file-type.js";

/** The web-safe default; pass your product's own policy to narrow or widen it. */
export const DEFAULT_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

/**
 * @example validateImageFile(file) // { valid: true }
 * @example validateImageFile(file, ["image/png"]) // PNG-only policy
 */
export function validateImageFile(
  file: File,
  allowedTypes: readonly string[] = DEFAULT_IMAGE_TYPES,
): ValidationResult {
  return validateFileType(file, allowedTypes);
}
