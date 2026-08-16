import { CLOUDINARY_HOST } from "./_shared.js";

/**
 * Checks whether a URL is served from the Cloudinary delivery host (res.cloudinary.com).
 *
 * @example isCloudinaryUrl("https://res.cloudinary.com/demo/image/upload/a.jpg") // true
 */
export function isCloudinaryUrl(url: string): boolean {
  return typeof url === "string" && url.includes(CLOUDINARY_HOST);
}
