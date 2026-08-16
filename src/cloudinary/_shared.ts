export const CLOUDINARY_HOST = "res.cloudinary.com";
export const UPLOAD_MARKER = "/upload/";

/**
 * Whether a path segment is a transform chain rather than part of the asset path.
 *
 * Every part of a chain is `key_value` (`w_300`, `c_fill`, `t_named`). Testing for that is
 * what distinguishes `/upload/w_300/img.jpg` from `/upload/folder/img.jpg` — checking only
 * "is it not a version segment" misreads the folder as a transform and produces
 * `/upload/folder,w_40/img.jpg`, which 404s.
 */
export function isTransformSegment(segment: string): boolean {
  if (!segment || segment.includes(".")) return false;
  return segment.split(",").every((part) => /^[a-z]+_[^,/]+$/i.test(part));
}
