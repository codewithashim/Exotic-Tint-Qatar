'use client';

import { useState } from 'react';

import AboutSubHeader from './components/sections/AboutSubHeader';
import AboutStorySection from './components/sections/AboutStorySection';
import AboutHeatLabSection from './components/sections/AboutHeatLabSection';
import AboutWhyChooseSection from './components/sections/AboutWhyChooseSection';
import AboutZonesSection from './components/sections/AboutZonesSection';
import AboutBookingTicket from './components/sections/AboutBookingTicket';
import { useBookingSelection } from '@/features/booking';
import { ZONE_DISPATCH_DETAILS } from '@/features/about/data/about-data';

/** About page: story, heat lab, promises, dispatch zones and a consultation ticket. */
export default function AboutPage() {
  const booking = useBookingSelection();
  const [activeZone, setActiveZone] = useState(booking.area);
  const [selectedService, setSelectedService] = useState(booking.service);

  const zoneInfo = ZONE_DISPATCH_DETAILS[activeZone] || ZONE_DISPATCH_DETAILS['Lusail'];

  return (
    <div className="space-y-14 sm:space-y-20 pb-12">
      <AboutSubHeader />

      <AboutStorySection />

      <AboutHeatLabSection />

      <AboutWhyChooseSection />

      <AboutZonesSection
        activeZone={activeZone}
        setActiveZone={setActiveZone}
        setSelectedService={setSelectedService}
        zoneInfo={zoneInfo}
      />

      <AboutBookingTicket
        activeZone={activeZone}
        setActiveZone={setActiveZone}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
    </div>
  );
}
