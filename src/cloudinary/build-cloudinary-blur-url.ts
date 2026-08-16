import { applyCloudinaryTransform } from "./apply-cloudinary-transform.js";

/**
 * A tiny, heavily blurred version for use as a placeholder behind the real image while it
 * loads.
 *
 * @example buildCloudinaryBlurUrl(url) // ".../upload/w_40,e_blur:1000,q_auto:low,f_auto/..."
 */
export function buildCloudinaryBlurUrl(url: string): string {
  return applyCloudinaryTransform(url, "w_40,e_blur:1000,q_auto:low,f_auto");
}
