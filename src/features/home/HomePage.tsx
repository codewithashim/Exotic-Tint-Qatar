import InstagramReelsShowreel from './components/reels/InstagramReelsShowreel';
import HappyClientsSection from './components/sections/HappyClientsSection';
import HeroSection from './components/sections/HeroSection';
import PromoTickerRibbons from './components/sections/PromoTickerRibbons';
import QuickBookingSection from './components/sections/QuickBookingSection';
import ServiceAreasSection from './components/sections/ServiceAreasSection';
import ServicesBentoSection from './components/sections/ServicesBentoSection';
import TrustBenefitsSection from './components/sections/TrustBenefitsSection';

/** Home page composition — sections render top to bottom in this order. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBenefitsSection />
      <PromoTickerRibbons />
      <InstagramReelsShowreel />
      <ServiceAreasSection />
      <QuickBookingSection />
      <ServicesBentoSection />
      <HappyClientsSection />
    </>
  );
}
