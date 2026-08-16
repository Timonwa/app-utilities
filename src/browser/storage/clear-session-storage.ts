/**
 * Clears all items from sessionStorage.
 * @example clearSessionStorage()
 */
export function clearSessionStorage(): void {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
}
