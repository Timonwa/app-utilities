/**
 * Clears all items from localStorage.
 * @example clearLocalStorage()
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
