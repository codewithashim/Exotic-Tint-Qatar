'use client';

import { useState } from 'react';

import { ALL_SERVICES } from '@/features/services/data/services-data';
import ServiceDetailSubHeader from './ServiceDetailSubHeader';
import ServiceHeroSimulator from './ServiceHeroSimulator';
import ServiceScopeEstimator from './ServiceScopeEstimator';
import ServiceProcessSteps from './ServiceProcessSteps';
import ServiceFaqAccordion from './ServiceFaqAccordion';
import ServiceBookingTicket from './ServiceBookingTicket';
import OtherServicesStrip from './OtherServicesStrip';
import { getServiceBySlug } from '@/features/services/data/services-data';

interface ServiceDetailPageProps {
  slug: string;
}

/**
 * Full detail page for one service. Render with `key={slug}` so all
 * interactive state resets when switching between services.
 */
export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const service = getServiceBySlug(slug) ?? ALL_SERVICES[0];
  const [selectedSimIdx, setSelectedSimIdx] = useState(0);
  const [selectedEstIdx, setSelectedEstIdx] = useState(0);

  const activeSim = service.simulatorOptions[selectedSimIdx] || service.simulatorOptions[0];
  const activeEst = service.estimatorOptions[selectedEstIdx] || service.estimatorOptions[0];

  return (
    <div className="space-y-14 sm:space-y-20 pb-12">
      <ServiceDetailSubHeader service={service} />

      <ServiceHeroSimulator
        service={service}
        selectedSimIdx={selectedSimIdx}
        setSelectedSimIdx={setSelectedSimIdx}
        activeSim={activeSim}
      />

      <ServiceScopeEstimator
        service={service}
        selectedEstIdx={selectedEstIdx}
        setSelectedEstIdx={setSelectedEstIdx}
        activeEst={activeEst}
      />

      <ServiceProcessSteps service={service} />

      <ServiceFaqAccordion service={service} />

      <ServiceBookingTicket service={service} activeSim={activeSim} activeEst={activeEst} />

      <OtherServicesStrip service={service} />
    </div>
  );
}
