// Regenerates the API reference between the api markers in README.md from the source
// JSDoc. Run via `pnpm docs:api`; `pnpm verify` fails if the README is out of date, so
// the reference cannot drift from the code — the only way a comprehensive README stays
// truthful.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = new URL("../src", import.meta.url).pathname;
const README = new URL("../README.md", import.meta.url).pathname;

/** One hand-written "how you actually use it" snippet per module, shown above its
 *  generated reference. Kept here so the whole section regenerates as one unit. */
const MODULE_USAGE = {
  array: `const upcoming = getArraySortedByKey(events, "startDate");
const visible = getArrayItemsBySearchTerm(upcoming, query, ["name", "venue"]);
const chunks = getArrayChunks(visible, 20); // page-sized slices`,
  bytes: `formatBytes(file.size); // "4.20 MB"
const limit = parseSizeToBytes("50 MB"); // 52428800
getUsageLevel(getStoragePercent(used, quota)); // "high" -> map to your own colors`,
  cloudinary: `const url = buildCloudinaryUrl({ cloudName, publicId, transform: "w_800,q_auto,f_auto" });
<img src={buildCloudinaryResizedUrl(url, 768)} srcSet={buildCloudinarySrcset(url)} />`,
  country: `getCountryByCode("NG")?.flag; // "🇳🇬"
searchCountriesByName(query); // filter a country picker as the user types`,
  crypto: `if (!isTimingSafeEqual(providedToken, expectedToken)) return notFound(); // no timing leak
const checksum = await hashTextToSha256Hex(payload); // node, browser, and edge`,
  currency: `formatCurrencyFromMinorUnit(123450, "NGN", { locale: "en-NG" }); // "₦1,234.50"
const amount = parseCurrencyString(input); // number | null — "free" is not 0`,
  date: `formatDateToRelative(post.createdAt); // "2 hours ago"
const due = addMonthsToDate(new Date(), 1); // clamps: Jan 31 + 1mo = Feb 28/29
getTodayISODate(); // local calendar date, never UTC-shifted`,
  error: `catch (error) {
  toast.error(formatError(error, { messageForCode: (c) => AUTH_MESSAGES[c] }));
  if (hasErrorStatusCode(error, 429)) wait(getErrorRetryAfterSeconds(error));
}`,
  firestore: `const date = parseFirestoreTimestampToDate(doc.createdAt); // any wire/SDK shape, or null
events.sort((a, b) => getFirestoreTimestampSortMillis(a.startsAt) - getFirestoreTimestampSortMillis(b.startsAt));
<input type="datetime-local" value={convertFirestoreTimestampToDateTimeLocal(event.startsAt)} />`,
  form: `const message = findFirstErrorMessage(form.formState.errors); // works at any depth`,
  number: `formatCompactNumber(followers); // "1.5M", localized
const price = parseStringToNumber(input); // null for "", never 0`,
  random: `const code = generateReadableCode(); // "K3F7-9TXM", crypto-random, no ambiguous chars
const otp = generateNumericCode(6); // crypto-random too — users redeem these`,
  string: `convertStringToKebabCase("v2 Rollout"); // "v2-rollout" — digits stay attached
truncateString(title, 60); // never exceeds 60, ellipsis included
maskString(cardNumber); // "••••••••••••4242"`,
  time: `formatMillisToShortDuration(runtime); // "2h 30m"
convertTimeTo12Hour(14, 30); // "2:30 PM"`,
  url: `router.push(safeRedirectPath(searchParams.get("redirect"), "/")); // open-redirect safe
getOgImageUrl({ siteUrl, title: post.title }); // cover image or generated OG endpoint`,
  validation: `const result = validateEmail(input); // { valid: false, message: "Invalid email format" }
const results = validateFiles(files, (f) => validateImageFile(f, MY_TYPES));
if (hasValidationErrors(results)) show(results);`,
  clipboard: `const copied = await copyTextToClipboard(inviteCode);
setLabel(copied ? "Copied" : "Press ⌘C");`,
  image: `const upload = await compressImage(file, { maxWidth: 1920, quality: 0.8 });
// returns the ORIGINAL file if compression came out larger`,
  storage: `setLocalStorageItemWithExpiry("token", token, 3_600_000);
const token = getLocalStorageItemWithExpiry<string>("token"); // undefined once expired`,
};

function collapse(text) {
  return text.replace(/\s+/g, " ").trim();
}

/** Strips types from a parameter list for a compact display signature. */
function displayParams(raw) {
  const params = [];
  let depth = 0;
  let current = "";
  for (const char of raw) {
    if ("({[<".includes(char)) depth++;
    if (")}]>".includes(char)) depth--;
    if (char === "," && depth === 0) {
      params.push(current);
      current = "";
    } else current += char;
  }
  if (current.trim()) params.push(current);
  return params
    .map((p) => {
      const trimmed = p.trim();
      if (trimmed.startsWith("{")) return "options";
      const name = trimmed.split(":")[0].split("=")[0].trim().replace("?", "");
      // `(?<!=)=(?!>)` so `=>` in a function-typed param is never read as a default.
      const defaultMatch = trimmed.match(/(?<![=>!<])=(?!>)\s*([^,]+)$/);
      return defaultMatch && !trimmed.includes("{")
        ? `${name} = ${collapse(defaultMatch[1])}`
        : name;
    })
    .join(", ");
}

function parseModule(dir) {
  const entries = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith(".ts") || file === "index.ts" || file === "_shared.ts") continue;
    if (file.endsWith(".test.ts")) continue;
    const source = readFileSync(join(dir, file), "utf8");
    const exportRe =
      /(?:\/\*\*([\s\S]*?)\*\/\s*)?export (?:async )?(function|const|interface|type) ([A-Za-z0-9_]+)([\s\S]*?)(?=\n\}|\n(?:\/\*\*|export )|$)/g;
    for (const match of source.matchAll(exportRe)) {
      const [, jsdoc = "", kind, name, rest] = match;
      const lines = jsdoc
        .split("\n")
        .map((l) => l.replace(/^\s*\*\s?/, "").trim())
        .filter(Boolean);
      const description = collapse(
        lines
          .filter((l) => !l.startsWith("@"))
          .join(" ")
          .split(/(?<=[.!?])\s/)[0] ?? "",
      );
      const example = lines.find((l) => l.startsWith("@example"))?.slice(9).trim();
      let signature = `\`${name}\``;
      if (kind === "function") {
        const sigMatch = source
          .slice(match.index)
          .match(/export (?:async )?function [A-Za-z0-9_]+(<[^(]+>)?\(([\s\S]*?)\)(?::|\s*\{)/);
        signature = `\`${name}(${sigMatch ? displayParams(collapse(sigMatch[2])) : ""})\``;
      }
      entries.push({ name, kind, signature, description, example });
    }
  }
  return entries;
}

function renderModule(title, dir, anchorPrefix) {
  const entries = parseModule(dir);
  const usage = MODULE_USAGE[title];
  const fns = entries.filter((e) => e.kind === "function" || e.kind === "const");
  const types = entries.filter((e) => e.kind === "interface" || e.kind === "type");
  let out = `### \`${anchorPrefix}${title}\`\n\n`;
  if (usage) out += "```ts\n" + usage + "\n```\n\n";
  out += "<details>\n<summary>";
  out += `All ${fns.length} exports</summary>\n\n`;
  for (const e of fns) {
    out += `- **${e.signature}** — ${e.description || "See source."}`;
    if (e.example) out += ` \`${e.example}\``;
    out += "\n";
  }
  if (types.length) {
    out += `\nTypes: ${types.map((t) => `\`${t.name}\``).join(", ")}\n`;
  }
  out += "\n</details>\n\n";
  return out;
}

const rootModules = readdirSync(SRC, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "browser")
  .map((d) => d.name)
  .sort();
const browserModules = readdirSync(join(SRC, "browser"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let api = "## API reference\n\n";
api +=
  "Generated from the source JSDoc by `pnpm docs:api` — CI fails when it is out of date, so what you read here is what the code does. Each module below opens with how you would actually use it; expand the list for every export.\n\n";
api += "Jump to: " + [...rootModules, ...browserModules.map((m) => `browser/${m}`)].map((m) => `[${m}](#${m.replace("/", "")})`).join(" · ") + "\n\n";
api += "### Universal — `@timonwa/app-utilities`\n\n";
for (const m of rootModules) api += renderModule(m, join(SRC, m), "");
api += "### Browser — `@timonwa/app-utilities/browser`\n\n";
for (const m of browserModules) api += renderModule(m, join(SRC, "browser", m), "browser/");

const readme = readFileSync(README, "utf8");
const START = "<!-- api:start -->";
const END = "<!-- api:end -->";
if (!readme.includes(START) || !readme.includes(END)) {
  console.error("README.md is missing the api markers");
  process.exit(1);
}
const next =
  readme.slice(0, readme.indexOf(START) + START.length) +
  "\n\n" +
  api.trimEnd() +
  "\n\n" +
  readme.slice(readme.indexOf(END));
writeFileSync(README, next);
console.info(
  `README API reference regenerated: ${rootModules.length + browserModules.length} modules`,
);
