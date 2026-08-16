import type { UsageLevel } from "./_shared.js";

/**
 * Buckets a usage percentage into a band, so the caller maps the band to its own colours.
 *
 * The original returned Tailwind class names directly (`"text-red-600 dark:text-red-400"`),
 * which pinned it to one design system and one framework. Thresholds stay adjustable
 * because "high" means different things for a disk quota and an API rate limit.
 *
 * @example getUsageLevel(95) // "critical"
 * @example getUsageLevel(60) // "medium"
 */
export function getUsageLevel(
  percent: number,
  thresholds: { medium: number; high: number; critical: number } = {
    medium: 50,
    high: 70,
    critical: 90,
  },
): UsageLevel {
  if (percent >= thresholds.critical) return "critical";
  if (percent >= thresholds.high) return "high";
  if (percent >= thresholds.medium) return "medium";
  return "low";
}
