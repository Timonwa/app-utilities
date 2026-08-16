import type { CloudinaryAssetType } from "./build-cloudinary-url.js";
import { buildCloudinaryUrl } from "./build-cloudinary-url.js";

/**
 * Builds one URL per named transform, so a caller derives a whole set of variants from a
 * single public id in one call.
 *
 * The variant names and their transforms are the caller's — this owns only the URL shape.
 * Return type is keyed by the map you pass, so the result is typed without a cast.
 *
 * @example
 * buildCloudinaryUrlVariants({
 *   cloudName: "demo",
 *   publicId: "events/e1/p2",
 *   variants: {
 *     thumbnail: "c_limit,w_300,h_300,q_auto,f_auto",
 *     preview: "t_watermark_v1,q_auto,f_auto",
 *     cover: "c_fill,g_auto:faces,w_300,h_200,q_auto,f_auto",
 *   },
 * })
 * // { thumbnail: "…", preview: "…", cover: "…" }
 */
export function buildCloudinaryUrlVariants<TVariants extends Record<string, string>>({
  cloudName,
  publicId,
  variants,
  assetType = "image",
}: {
  cloudName: string;
  publicId: string;
  variants: TVariants;
  assetType?: CloudinaryAssetType;
}): Record<keyof TVariants, string> {
  const entries = Object.entries(variants).map(([name, transform]) => [
    name,
    buildCloudinaryUrl({ cloudName, publicId, transform, assetType }),
  ]);

  return Object.fromEntries(entries) as Record<keyof TVariants, string>;
}
