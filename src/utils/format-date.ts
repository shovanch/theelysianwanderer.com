type DateFormat = 'full' | 'short';

export function formatDate(
  dateString: string | Date | undefined | null,
  format: DateFormat = 'full',
) {
  if (!dateString) {
    console.warn('formatDate received empty dateString:', dateString);
    return 'Invalid Date';
  }

  // Convert to string if it's a Date object
  const dateString_ =
    dateString instanceof Date ? dateString.toISOString() : String(dateString);

  // Handle both ISO strings and date-only strings
  let date: Date;
  if (dateString_.includes('T') || dateString_.includes('Z')) {
    // Already a full ISO string
    date = new Date(dateString_);
  } else {
    // Date-only string, append time
    date = new Date(`${dateString_}T00:00:00Z`);
  }

  if (isNaN(date.getTime())) {
    console.warn('formatDate received invalid dateString:', dateString);
    return 'Invalid Date';
  }

  if (format === 'short') {
    // "March, 2024" format
    const month = date.toLocaleDateString('en-US', {
      month: 'long',
      timeZone: 'UTC',
    });
    const year = date.getUTCFullYear();
    return `${month}, ${year}`;
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
