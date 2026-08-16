/**
 * Walks a nested form-errors tree and returns the first leaf `message` string.
 *
 * Libraries like react-hook-form nest errors for object schemas (`venue.name`,
 * `socialLinks.x`), so the naive `Object.values(errors)[0]?.message` is `undefined` for
 * anything one level deep. This recurses — but it only reads the shape, so it works on
 * any `{ message: string }`-leafed tree, not just RHF's.
 *
 * @example findFirstErrorMessage(errors) // "Venue name is required"
 */
export function findFirstErrorMessage(tree: unknown): string | undefined {
  if (!tree || typeof tree !== "object") return undefined;

  if (
    "message" in tree &&
    typeof (tree as { message: unknown }).message === "string" &&
    (tree as { message: string }).message.length > 0
  ) {
    return (tree as { message: string }).message;
  }

  for (const value of Object.values(tree)) {
    const message = findFirstErrorMessage(value);
    if (message) return message;
  }
  return undefined;
}
