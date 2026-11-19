export {
  BookingSelectionProvider,
  DEFAULT_BOOKING_AREA,
  DEFAULT_BOOKING_SERVICE,
  useBookingSelection,
} from './context/BookingSelectionContext';
export { createTicketNumber, validateContactDetails } from './lib/validation';
export type { ContactValidationResult } from './lib/validation';
export { default as BookingAreaOptions } from './components/BookingAreaOptions';
