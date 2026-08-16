import type { StorageItemWithExpiry } from "./_shared.js";
import { setLocalStorageItem } from "./set-local-storage-item.js";

/**
 * Sets an item in localStorage with an expiry timestamp.
 * @param key - Storage key
 * @param value - Value to store
 * @param expiryMs - Lifetime in milliseconds
 * @example setLocalStorageItemWithExpiry("token", "abc123", 3600000)
 */
export function setLocalStorageItemWithExpiry<T>(
  key: string,
  value: T,
  expiryMs: number,
): void {
  const item: StorageItemWithExpiry<T> = {
    value,
    expiry: Date.now() + expiryMs,
  };
  setLocalStorageItem(key, item);
}
