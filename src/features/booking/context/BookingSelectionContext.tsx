'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { BOOKING_AREAS } from '@/config/site';
import { ALL_SERVICES } from '@/features/services/data/services-data';

/** Service shown first in every booking form (matches `ServiceDetail.id`). */
export const DEFAULT_BOOKING_SERVICE: string = ALL_SERVICES[0].id;
export const DEFAULT_BOOKING_AREA: string = BOOKING_AREAS[0];

interface BookingSelection {
  /** Selected service id (the service title, e.g. "Sun Control Window Film"). */
  service: string;
  area: string;
  setService: (service: string) => void;
  setArea: (area: string) => void;
}

const BookingSelectionContext = createContext<BookingSelection | null>(null);

/**
 * Shares the customer's pre-selected service/area across the site, so a click in the
 * header mega menu, an area sticker or a reel can pre-fill booking forms on other pages.
 */
export function BookingSelectionProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState(DEFAULT_BOOKING_SERVICE);
  const [area, setArea] = useState(DEFAULT_BOOKING_AREA);
  const value = useMemo(() => ({ service, area, setService, setArea }), [service, area]);
  return (
    <BookingSelectionContext.Provider value={value}>{children}</BookingSelectionContext.Provider>
  );
}

export function useBookingSelection(): BookingSelection {
  const ctx = useContext(BookingSelectionContext);
  if (!ctx) throw new Error('useBookingSelection must be used inside <BookingSelectionProvider>');
  return ctx;
}
