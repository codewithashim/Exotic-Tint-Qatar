import { BOOKING_AREAS } from '@/config/site';

/** `<option>` list for every "Service Area" select. */
export default function BookingAreaOptions() {
  return (
    <>
      {BOOKING_AREAS.map((area) => (
        <option key={area} value={area}>
          {area}
        </option>
      ))}
    </>
  );
}
