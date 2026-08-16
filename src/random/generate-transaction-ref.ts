import { generateRandomString } from "./generate-random-string.js";

/**
 * A reference combining the tail of an id with a random suffix — traceable to its owner
 * at a glance, unique enough not to collide.
 *
 * @example generateTransactionRef("user12345678") // "12345678-aB3dE9fG"
 */
export function generateTransactionRef(uid: string): string {
  return `${uid.slice(-8)}-${generateRandomString(8)}`;
}
