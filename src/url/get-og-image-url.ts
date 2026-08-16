/** @description Shared OG image URL builder. Returns the best Open Graph image URL for a page: a provided cover image takes priority, otherwise a URL to the app's `/api/og` endpoint with optional `title`/`subtitle` query params. */

export interface OgImageArgsProps {
  /** Path of the OG-image endpoint appended to `siteUrl`. */
  path?: string;
  /** Site base URL (e.g. an app's `site.url`). The `/api/og` path is appended to this. */
  siteUrl: string;
  /** Title rendered on the generated OG image. */
  title?: string;
  /** Subtitle rendered on the generated OG image. */
  subtitle?: string;
  /** External image URL (e.g. an event cover image). Takes priority over the generated OG image. */
  coverImage?: string | null;
}

/**
 * Build the OG image URL for a page.
 *
 * - If a cover image is provided (e.g. from an event), use it directly.
 * - Otherwise, build a URL to the `/api/og` endpoint with optional title and subtitle.
 *
 * @example
 *   // Event page — prefer the event's own cover image
 *   getOgImageUrl({ siteUrl: site.url, coverImage: event.coverImage, title: event.name })
 *
 * @example
 *   // Static page — always use the generated OG image
 *   getOgImageUrl({ siteUrl: site.url, title: "Privacy Policy", subtitle: "Data Use and Protection" })
 */
export function getOgImageUrl({
  siteUrl,
  title,
  subtitle,
  coverImage,
  path = "/api/og",
}: OgImageArgsProps): string {
  // If the page has its own cover image, use it as-is.
  if (coverImage) {
    return coverImage;
  }

  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);

  const query = params.toString();
  return `${siteUrl}${path}${query ? `?${query}` : ""}`;
}
