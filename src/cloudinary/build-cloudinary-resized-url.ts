import { applyCloudinaryTransform } from "./apply-cloudinary-transform.js";

/**
 * The image at a given width. `c_limit` never upscales past the original, and `dpr_auto`
 * lets Cloudinary serve a denser variant to retina screens.
 *
 * @example buildCloudinaryResizedUrl(url, 768) // ".../upload/w_768,c_limit,q_auto,f_auto,dpr_auto/..."
 */
export function buildCloudinaryResizedUrl(url: string, width: number): string {
  return applyCloudinaryTransform(url, `w_${width},c_limit,q_auto,f_auto,dpr_auto`);
}
