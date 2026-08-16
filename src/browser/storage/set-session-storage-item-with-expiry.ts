import type { StorageItemWithExpiry } from "./_shared.js";
import { setSessionStorageItem } from "./set-session-storage-item.js";

/** @example setSessionStorageItemWithExpiry("draft", data, 3_600_000) */
export function setSessionStorageItemWithExpiry<T>(
  key: string,
  value: T,
  expiryMs: number,
): void {
  const item: StorageItemWithExpiry<T> = { value, expiry: Date.now() + expiryMs };
  setSessionStorageItem(key, item);
}
