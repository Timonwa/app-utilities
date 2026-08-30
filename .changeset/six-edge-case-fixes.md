---
"@timonwa/app-utilities": patch
---

Fix six utilities that mishandled edge inputs:

- `maskString(value, 0)` returned the mask followed by the full value — it now hides everything.
- `isValidISODate` accepted impossible dates such as `"2024-02-31"`, which V8 rolls into the next month.
- `addMinutesToTime` produced `"-1:-15"` instead of wrapping backwards across midnight.
- `formatTimeTo12Hour` returned `"12:NaN AM"` for non-numeric segments instead of the documented `""`.
- `extractSocialUsername` returned `"in"` for LinkedIn profile URLs.
- `READABLE_CODE_REGEX` matched the letter `L`, which the readable-code alphabet excludes as ambiguous.
