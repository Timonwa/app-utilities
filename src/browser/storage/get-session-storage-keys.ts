/** @example getSessionStorageKeys() // ["checkout-step"] */
export function getSessionStorageKeys(): string[] {
  try {
    return Object.keys(sessionStorage);
  } catch {
    return [];
  }
}
