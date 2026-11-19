'use client';

import { useState } from 'react';

import ContactSubHeader from './components/sections/ContactSubHeader';
import ContactChannelsSection from './components/sections/ContactChannelsSection';
import ContactBookingTicket from './components/sections/ContactBookingTicket';
import ContactZonesSection from './components/sections/ContactZonesSection';
import ContactFaqSection from './components/sections/ContactFaqSection';
import { useBookingSelection } from '@/features/booking';

/** Contact page. Area/service start from whatever the visitor picked elsewhere on the site. */
export default function ContactPage() {
  const booking = useBookingSelection();
  const [primaryService, setPrimaryService] = useState(booking.service);
  const [selectedArea, setSelectedArea] = useState(booking.area);

  const handleZoneClick = (area: string, defaultService: string) => {
    setSelectedArea(area);
    setPrimaryService(defaultService);
    const el = document.getElementById('contact-ticket-module');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-14">
      <ContactSubHeader />

      <ContactChannelsSection />

      <ContactBookingTicket
        primaryService={primaryService}
        setPrimaryService={setPrimaryService}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />

      <ContactZonesSection selectedArea={selectedArea} handleZoneClick={handleZoneClick} />

      <ContactFaqSection />
    </div>
  );
}
