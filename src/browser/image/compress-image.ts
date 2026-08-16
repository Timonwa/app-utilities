export interface CompressImageOptionsProps {
  maxWidth?: number;
  maxHeight?: number;
  /** JPEG/WebP quality, 0-1. Ignored for PNG. */
  quality?: number;
  /** Output MIME type. Defaults to the input's type for PNG, otherwise JPEG. */
  type?: string;
}

/**
 * Compresses and/or resizes an image File on the client via the Canvas API, preserving
 * aspect ratio when only one dimension constrains.
 *
 * Returns the ORIGINAL file whenever "compression" came out larger — re-encoding a
 * small PNG as JPEG routinely inflates it, and shipping the bigger file defeats the
 * point. Browser-only: needs `createImageBitmap` and `OffscreenCanvas`.
 *
 * @example const upload = await compressImage(file, { maxWidth: 1920, quality: 0.8 });
 */
export async function compressImage(
  file: File,
  options: CompressImageOptionsProps = {},
): Promise<File> {
  const { maxWidth, maxHeight, quality = 0.8, type } = options;
  const outputType = type ?? (file.type === "image/png" ? "image/png" : "image/jpeg");

  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  if (maxWidth && width > maxWidth) {
    height = Math.round(height * (maxWidth / width));
    width = maxWidth;
  }
  if (maxHeight && height > maxHeight) {
    width = Math.round(width * (maxHeight / height));
    height = maxHeight;
  }

  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Failed to get canvas context");

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvas.convertToBlob({ type: outputType, quality });
  const compressed = new File([blob], file.name, {
    type: outputType,
    lastModified: Date.now(),
  });

  return compressed.size < file.size ? compressed : file;
}
