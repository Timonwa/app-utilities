import { vi } from "vitest";

/** Installs a fake `navigator.clipboard`; returns the spies for assertions. */
export function installClipboardMock(overrides?: {
  writeText?: (text: string) => Promise<void>;
  readText?: () => Promise<string>;
}) {
  const writeText = vi.fn(overrides?.writeText ?? (() => Promise.resolve()));
  const readText = vi.fn(overrides?.readText ?? (() => Promise.resolve("")));
  Object.defineProperty(globalThis, "navigator", {
    value: { clipboard: { writeText, readText } },
    configurable: true,
  });
  return { writeText, readText };
}

/** A browser without the async clipboard API (or no browser at all). */
export function installBareNavigator(value: unknown): void {
  Object.defineProperty(globalThis, "navigator", { value, configurable: true });
}
