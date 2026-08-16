/**
 * Builds a `name-id` URL slug. The id is kept last and unmodified so
 * {@link extractIdFromSlug} can recover it exactly.
 *
 * @example createSlugFromNameAndId(" Summer  Fête! ", "a1b2") // "summer-fete-a1b2"
 */
export function createSlugFromNameAndId(name: string, id: string): string {
  const slug = name
    .normalize("NFKD") // so "Fête" degrades to "Fete" rather than losing the vowel
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `${slug}-${id}` : id;
}
