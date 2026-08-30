import { describe, expect, it } from "vitest";
import { convertISOStringToMillis, convertMillisToISOString } from "./index.js";

describe("the conversion matrix is closed", () => {
  it("round-trips ISO → millis → ISO", () => {
    const iso = "2024-01-15T10:30:00.000Z";
    expect(convertMillisToISOString(convertISOStringToMillis(iso) as number)).toBe(iso);
  });

  it("returns null, not NaN, for garbage", () => {
    expect(convertISOStringToMillis("not a date")).toBeNull();
  });

  it("converts against the epoch exactly", () => {
    expect(convertISOStringToMillis("1970-01-01T00:00:01.000Z")).toBe(1000);
  });

  it("reads date-only strings as UTC midnight, per the Date spec", () => {
    expect(convertISOStringToMillis("2024-01-15")).toBe(Date.UTC(2024, 0, 15));
  });

  it("returns null for an empty string", () => {
    expect(convertISOStringToMillis("")).toBeNull();
  });
});
