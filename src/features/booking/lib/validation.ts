export type ContactValidationResult =
  | { ok: true; name: string; phone: string; digits: string }
  | { ok: false; error: string };

const MIN_NAME_LENGTH = 2;
const MIN_PHONE_DIGITS = 8;

/** Shared name + phone validation used by every booking/quote form on the site. */
export function validateContactDetails(fullName: string, phone: string): ContactValidationResult {
  const name = fullName.trim();
  const cleanPhone = phone.trim();

  if (name.length < MIN_NAME_LENGTH) {
    return { ok: false, error: 'Please enter your full name.' };
  }

  const digits = cleanPhone.replace(/\D/g, '');
  if (digits.length < MIN_PHONE_DIGITS) {
    return { ok: false, error: 'Please enter a valid Qatar phone number (e.g., +974 31608423).' };
  }

  return { ok: true, name, phone: cleanPhone, digits };
}

/** Builds a human-friendly ticket reference, e.g. `ETQ-SRV-8423`. */
export function createTicketNumber(prefix: string, phoneDigits: string): string {
  return `${prefix}-${phoneDigits.slice(-4)}`;
}
