---
"@timonwa/app-utilities": minor
---

The full library: 17 modules, ~290 functions, ported from real production codebases and corrected on the way in.

**Universal entry** — `array`, `bytes`, `cloudinary`, `country`, `currency`, `date` (Date ⇄ ISO ⇄ millis in one module, with a closed conversion matrix and an enforced add/subtract mirror), `error`, `form`, `number`, `random`, `string`, `time`, `url`, `validation`.

**`/browser` entry** — `clipboard`, `image`, `storage`.

Highlights over typical hand-rolled versions: calendar arithmetic clamps (Jan 31 + 1 month is Feb 28/29), YYYY-MM-DD output is the local date rather than UTC-shifted, per-currency minor-unit digits come from Intl (JPY-safe), case conversion keeps digits attached to their word, `parse*` returns `null` instead of guessing, crypto randomness for redeemable codes, and every validator returns one `{ valid, message? }` shape. One dependency: `date-fns`, for the four things worth a dependency.
