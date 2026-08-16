import { invalid, VALID, type ValidationResult } from "./_shared.js";
import { validateFileType } from "./validate-file-type.js";

export const DEFAULT_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
] as const;

/** @example validateVideoFile(file, { maxSizeBytes: 50_000_000 }) // { valid: true } */
export function validateVideoFile(
  file: File,
  options: { allowedTypes?: readonly string[]; maxSizeBytes?: number } = {},
): ValidationResult {
  const { allowedTypes = DEFAULT_VIDEO_TYPES, maxSizeBytes } = options;

  const typeResult = validateFileType(file, allowedTypes);
  if (!typeResult.valid) return typeResult;

  if (maxSizeBytes && file.size > maxSizeBytes) {
    const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(1);
    const fileMb = (file.size / (1024 * 1024)).toFixed(1);
    return invalid(`File size (${fileMb}MB) exceeds maximum allowed size (${maxMb}MB)`);
  }
  return VALID;
}
