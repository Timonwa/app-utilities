import { describe, expect, it } from "vitest";
import {
  capitalizeString,
  convertStringToCamelCase,
  convertStringToKebabCase,
  convertStringToSnakeCase,
  convertStringToTitleCase,
  convertStringToUpperSnakeCase,
  countWordsInString,
  createSlugFromNameAndId,
  decodeBase64Url,
  encodeBase64Url,
  extractIdFromSlug,
  extractNameFromSlug,
  extractSocialUsername,
  extractUuidFromPath,
  humanizeConstant,
  isStringPalindrome,
  maskString,
  reverseString,
  splitFullName,
  stripHtmlTagsFromString,
  stripToAlphanumeric,
  truncateString,
} from "./index.js";

describe("capitalizeString", () => {
  it("leaves the remainder alone", () => {
    expect(capitalizeString("hello")).toBe("Hello");
    // The reason this isn't es-toolkit's `capitalize`, which would give "Mcdonald".
    expect(capitalizeString("McDonald")).toBe("McDonald");
  });
});

describe("convertStringToCamelCase", () => {
  it("keeps word boundaries in PascalCase input", () => {
    expect(convertStringToCamelCase("hello world")).toBe("helloWorld");
    // A single lowercase-then-replace pass returns "helloworld" here.
    expect(convertStringToCamelCase("HelloWorld")).toBe("helloWorld");
  });
});

describe("convertStringToTitleCase", () => {
  it("splits on camelCase humps as well as spaces", () => {
    expect(convertStringToTitleCase("hello world")).toBe("Hello World");
    expect(convertStringToTitleCase("helloWorld")).toBe("Hello World");
  });
});

describe("convertStringToUpperSnakeCase", () => {
  it("drops punctuation rather than encoding it", () => {
    expect(convertStringToUpperSnakeCase("my new flag")).toBe("MY_NEW_FLAG");
    expect(convertStringToUpperSnakeCase("v2 rollout")).toBe("V2_ROLLOUT");
  });
});

describe("humanizeConstant", () => {
  it("sentence-cases, so it reads inside a label", () => {
    expect(humanizeConstant("arts_and_culture")).toBe("Arts and culture");
  });
});

describe("extractSocialUsername", () => {
  it("accepts a URL, an @handle, or a bare handle", () => {
    expect(extractSocialUsername("https://instagram.com/timonwa/")).toBe("timonwa");
    expect(extractSocialUsername("www.x.com/timonwa?ref=x")).toBe("timonwa");
    expect(extractSocialUsername("@timonwa")).toBe("timonwa");
    expect(extractSocialUsername("timonwa")).toBe("timonwa");
  });
});

describe("reverseString", () => {
  it("reverses by code point so astral characters survive", () => {
    expect(reverseString("hello")).toBe("olleh");
    // split("") would tear this into two broken surrogate halves.
    expect(reverseString("ab🎉")).toBe("🎉ba");
  });
});

describe("truncateString", () => {
  it("never exceeds the requested length", () => {
    const result = truncateString("This is a long string", 10);
    expect(result).toBe("This is a…");
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("returns short input untouched", () => {
    expect(truncateString("short", 10)).toBe("short");
  });

  it("degrades to a hard cut when there is no room for the ellipsis", () => {
    expect(truncateString("abcdef", 1)).toBe("a");
  });
});

describe("countWordsInString", () => {
  it("counts words", () => {
    expect(countWordsInString("hello world")).toBe(2);
  });

  // "".split(/\s+/) is [""], length 1 — so whitespace-only used to count as a word.
  it("returns 0 for empty and whitespace-only input", () => {
    expect(countWordsInString("")).toBe(0);
    expect(countWordsInString("   ")).toBe(0);
  });
});

describe("slug round trip", () => {
  it("strips accents and punctuation without leaving stray hyphens", () => {
    expect(createSlugFromNameAndId(" Summer  Fête! ", "a1b2")).toBe("summer-fete-a1b2");
  });

  it("recovers the id and the name", () => {
    const slug = createSlugFromNameAndId("Summer Fete", "a1b2");
    expect(extractIdFromSlug(slug)).toBe("a1b2");
    expect(extractNameFromSlug(slug)).toBe("summer fete");
  });

  it("falls back to the bare id when the name has nothing usable", () => {
    expect(createSlugFromNameAndId("!!!", "a1b2")).toBe("a1b2");
  });
});

describe("stripHtmlTagsFromString", () => {
  it("produces plain text", () => {
    expect(stripHtmlTagsFromString("<p>Hello</p>")).toBe("Hello");
  });
});

describe("maskString", () => {
  it("leaves the trailing characters visible", () => {
    expect(maskString("4242424242424242")).toBe("••••••••••••4242");
    expect(maskString("123", 4)).toBe("123");
  });
});

// The reason case conversion is ours and not es-toolkit's: es-toolkit treats a digit
// as a word boundary, which mangles version-numbered slugs and flag names.
describe("case conversion keeps digits attached to their word", () => {
  it("does not split v2 into v-2", () => {
    expect(convertStringToKebabCase("v2 rollout")).toBe("v2-rollout");
    expect(convertStringToSnakeCase("v2 rollout")).toBe("v2_rollout");
    expect(convertStringToUpperSnakeCase("v2 rollout")).toBe("V2_ROLLOUT");
    expect(convertStringToTitleCase("v2 rollout")).toBe("V2 Rollout");
    expect(convertStringToCamelCase("v2 rollout")).toBe("v2Rollout");
  });

  it("still splits camelCase humps and acronyms", () => {
    expect(convertStringToKebabCase("api2Key")).toBe("api2-key");
    expect(convertStringToKebabCase("XMLHttpRequest")).toBe("xml-http-request");
  });
});

describe("splitFullName", () => {
  it("takes the first token as the first name and the rest as the last", () => {
    expect(splitFullName("Ada Lovelace")).toEqual({
      firstName: "Ada",
      lastName: "Lovelace",
    });
    expect(splitFullName("Ada King Lovelace")).toEqual({
      firstName: "Ada",
      lastName: "King Lovelace",
    });
  });

  it("handles one name and empty input", () => {
    expect(splitFullName("Ada")).toEqual({ firstName: "Ada", lastName: "" });
    expect(splitFullName("  ")).toEqual({ firstName: "", lastName: "" });
  });
});

describe("stripToAlphanumeric", () => {
  it("collapses punctuation and case so variants compare equal", () => {
    expect(stripToAlphanumeric("O'Brien-Smith")).toBe("obriensmith");
    expect(stripToAlphanumeric("O Brien Smith")).toBe("obriensmith");
  });
});

describe("decodeBase64Url", () => {
  it("decodes unpadded base64url", () => {
    expect(decodeBase64Url("eyJhIjoxfQ")).toBe('{"a":1}');
  });

  // The original returned "{}" here, which reads downstream as a valid empty payload.
  it("returns null rather than something that parses", () => {
    expect(decodeBase64Url("!!!not base64!!!")).toBeNull();
  });
});

describe("extractUuidFromPath", () => {
  it("finds a UUID wherever it sits in the path", () => {
    const uuid = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";
    expect(extractUuidFromPath(`/f/${uuid}/raw/a.jpg`)).toBe(uuid);
    expect(extractUuidFromPath(`uploads/${uuid}.png`)).toBe(uuid);
  });

  it("returns undefined when there is none", () => {
    expect(extractUuidFromPath("/f/not-a-uuid/raw/")).toBeUndefined();
    expect(extractUuidFromPath(null)).toBeUndefined();
  });
});

describe("convertStringToTitleCase covers dotted identifiers", () => {
  // Replaces a separate formatDelimitedToTitleCase that split on "." too.
  it("splits on dots as well", () => {
    expect(convertStringToTitleCase("user.first_name")).toBe("User First Name");
  });
});

describe("isStringPalindrome", () => {
  it("ignores case and punctuation", () => {
    expect(isStringPalindrome("A man, a plan, a canal: Panama")).toBe(true);
    expect(isStringPalindrome("hello")).toBe(false);
  });
});

describe("encodeBase64Url", () => {
  it("round-trips with decodeBase64Url, unicode included", () => {
    expect(encodeBase64Url('{"a":1}')).toBe("eyJhIjoxfQ");
    expect(decodeBase64Url(encodeBase64Url("naïve 🎉"))).toBe("naïve 🎉");
    expect(encodeBase64Url("~~~")).not.toMatch(/[+/=]/);
  });
});
