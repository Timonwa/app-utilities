/**
 * Pulls the first UUID out of a path or key.
 *
 * Generalised from a version that hardcoded one storage layout (`/f/<uuid>/raw/`); the
 * position of the id is not something a helper should assume.
 *
 * @example extractUuidFromPath("/f/3f2504e0-4f89-11d3-9a0c-0305e82c3301/raw/a.jpg")
 * // "3f2504e0-4f89-11d3-9a0c-0305e82c3301"
 */
export function extractUuidFromPath(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  const match = String(path).match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  );
  return match?.[0];
}
