const BYTES_IN_KB = 1024;

export const UNIT_MULTIPLIERS = {
  B: 1,
  KB: BYTES_IN_KB,
  MB: BYTES_IN_KB ** 2,
  GB: BYTES_IN_KB ** 3,
  TB: BYTES_IN_KB ** 4,
  PB: BYTES_IN_KB ** 5,
} as const;

export { BYTES_IN_KB };

export type ByteUnit = keyof typeof UNIT_MULTIPLIERS;

/** How full something is, as a band rather than a colour. The app maps a level to its
 *  own design tokens — a utilities package has no business naming colours. */
export type UsageLevel = "low" | "medium" | "high" | "critical";
