import { invalid, VALID, type ValidationResult } from "./_shared.js";
import { validateFileType } from "./validate-file-type.js";

/** The web-common defaults (MP4, WebM, Ogg, QuickTime); pass your own list to change the policy. */
export const DEFAULT_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
] as const;

/**
 * Validates a video file's MIME type against an allowed list (defaulting to `DEFAULT_VIDEO_TYPES`) and, when `maxSizeBytes` is set, its size.
 *
 * @example validateVideoFile(file, { maxSizeBytes: 50_000_000 }) // { valid: true }
 */
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
