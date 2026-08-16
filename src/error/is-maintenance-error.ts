/**
 * Whether an error means "the platform is deliberately down", so an error boundary can
 * render the maintenance page instead of "Something went wrong". The structured code is
 * checked first; the message substring is the dev-mode fallback where frameworks
 * preserve messages.
 *
 * The code and substring are parameters because they are the app's contract with its
 * own kill switch — the defaults match the house convention.
 *
 * @example isMaintenanceError(err) // true
 */
export function isMaintenanceError(
  error: unknown,
  options: { code?: string; messageIncludes?: string } = {},
): boolean {
  const { code = "PLATFORM_MAINTENANCE", messageIncludes = "scheduled maintenance" } =
    options;
  if (error === null || typeof error !== "object") return false;

  const candidate = error as { code?: unknown; message?: unknown };
  if (candidate.code === code) return true;
  return (
    typeof candidate.message === "string" &&
    candidate.message.toLowerCase().includes(messageIncludes.toLowerCase())
  );
}
