---
"@timonwa/app-utilities": patch
---

`formatCompactCurrencyAmount` now formats whole amounts identically on every supported Node version. The minimum fraction digits were left to the engine, and ICU 76 and earlier derive them from the currency's own digits — so `formatCompactCurrencyAmount(950, "USD")` produced `"$950.0"` on Node 22 but `"$950"` on Node 26.
