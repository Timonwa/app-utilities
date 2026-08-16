import { CLOUDINARY_HOST } from "./_shared.js";

/** Cloudinary's asset types. `image` covers most delivery; `raw` is for files it does
 *  not transform, like a PDF served as-is. */
export type CloudinaryAssetType = "image" | "video" | "raw";

export interface BuildCloudinaryUrlOptions {
  cloudName: string;
  publicId: string;
  /** A transform chain, e.g. `"c_limit,w_300,q_auto,f_auto"`. Omit for the original. */
  transform?: string;
  assetType?: CloudinaryAssetType;
}

/**
 * Builds a delivery URL from its parts. Use this when you hold a public id; use
 * {@link applyCloudinaryTransform} when you hold a URL already.
 *
 * @example
 * buildCloudinaryUrl({ cloudName: "demo", publicId: "a/b", transform: "w_300,q_auto" })
 * // "https://res.cloudinary.com/demo/image/upload/w_300,q_auto/a/b"
 */
export function buildCloudinaryUrl({
  cloudName,
  publicId,
  transform,
  assetType = "image",
}: BuildCloudinaryUrlOptions): string {
  const base = `https://${CLOUDINARY_HOST}/${cloudName}/${assetType}/upload`;
  return transform ? `${base}/${transform}/${publicId}` : `${base}/${publicId}`;
}
