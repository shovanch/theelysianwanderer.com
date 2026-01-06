/**
 * Validate and format date string
 * Client-safe utility (no fs/server dependencies)
 */
export function getValidDate(
  dateValue: string | undefined,
): string | undefined {
  if (!dateValue) return undefined;

  // Check if it's a malformed date
  if (dateValue.startsWith('0002-') || dateValue.length < 8) {
    return undefined;
  }

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return undefined;
    }
    return date.toISOString();
  } catch {
    return undefined;
  }
}
