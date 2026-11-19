const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Converts a human date such as "March 2026" to an ISO 8601 month ("2026-03").
 * Full ISO dates ("2026-03-14") are returned unchanged. Returns undefined when the value
 * cannot be parsed, so callers omit the date instead of inventing one.
 */
export function toIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return undefined;
  const monthIndex = MONTHS.indexOf(match[1].toLowerCase());
  if (monthIndex === -1) return undefined;
  return `${match[2]}-${String(monthIndex + 1).padStart(2, '0')}`;
}

/** Collapses whitespace and shortens to `max` characters on a word boundary, adding "…". */
export function truncateText(value: string, max = 160): string {
  const text = value.replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s,;:.–—-]+$/, '')}…`;
}
