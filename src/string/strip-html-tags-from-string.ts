/**
 * Removes anything that looks like a tag, for producing a plain-text excerpt.
 *
 * NOT a sanitizer — it is a regex, and a regex cannot safely parse HTML. Never use
 * this on a value you are about to render as markup; sanitize with a real parser
 * (DOMPurify) next to the code that owns your allowed-tag policy.
 *
 * @example stripHtmlTagsFromString("<p>Hello</p>") // "Hello"
 */
export function stripHtmlTagsFromString(value: string): string {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").trim();
}
