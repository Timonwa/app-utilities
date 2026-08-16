/**
 * A UUID v4 via the runtime's `crypto.randomUUID` — no library. Available in every
 * modern browser, Node 16+, and React Native's Hermes.
 *
 * @example generateUuid() // "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateUuid(): string {
  return crypto.randomUUID();
}
