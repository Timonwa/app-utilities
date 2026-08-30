import { describe, expect, it, vi } from "vitest";
import { MILLIS, SECONDS } from "./_test-helpers.js";
import {
  createSerializedFirestoreTimestampNow,
  isValidFirestoreTimestampInput,
} from "./index.js";

describe("serialized creators", () => {
  it("now() is a valid parser input", () => {
    expect(isValidFirestoreTimestampInput(createSerializedFirestoreTimestampNow())).toBe(
      true,
    );
  });

  it("snapshots the frozen clock exactly", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(MILLIS + 500));
    try {
      expect(createSerializedFirestoreTimestampNow()).toEqual({
        seconds: SECONDS,
        nanoseconds: 500_000_000,
      });
    } finally {
      vi.useRealTimers();
    }
  });
});
