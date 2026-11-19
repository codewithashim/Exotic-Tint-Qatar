'use client';

import { useState } from 'react';
import { ALL_SERVICES, ServiceDetail } from '@/features/services/data/services-data';

import ServicesHubSubHeader from './ServicesHubSubHeader';
import ServicesHubHero from './ServicesHubHero';
import ServicesCatalogGrid from './ServicesCatalogGrid';
import ServicesComparisonMatrix from './ServicesComparisonMatrix';
import ServicesHubBookingTicket from './ServicesHubBookingTicket';
import { DEFAULT_BOOKING_SERVICE } from '@/features/booking';
import type { ServicesFilterTab } from '@/features/services/data/services-hub-data';

export default function ServicesHubPage() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState(DEFAULT_BOOKING_SERVICE);
  const [activeTab, setActiveTab] = useState<ServicesFilterTab>('all');
  const [selectedMatcherSlug, setSelectedMatcherSlug] = useState<string>(
    'automotive-window-tinting'
  );

  const filteredServices: ServiceDetail[] =
    activeTab === 'all'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.category === activeTab);

  const matchedService =
    ALL_SERVICES.find((s) => s.slug === selectedMatcherSlug) || ALL_SERVICES[0];

  const handleQuickBookService = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    const el = document.getElementById('services-hub-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-14">
      <ServicesHubSubHeader />

      <ServicesHubHero
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedMatcherSlug={selectedMatcherSlug}
        setSelectedMatcherSlug={setSelectedMatcherSlug}
        matchedService={matchedService}
        handleQuickBookService={handleQuickBookService}
      />

      <ServicesCatalogGrid
        filteredServices={filteredServices}
        handleQuickBookService={handleQuickBookService}
      />

      <ServicesComparisonMatrix />

      <ServicesHubBookingTicket
        selectedServiceTitle={selectedServiceTitle}
        setSelectedServiceTitle={setSelectedServiceTitle}
      />
    </div>
  );
}
