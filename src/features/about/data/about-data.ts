import { ASSETS } from '@/config/assets';

export const HEAT_LAB_SCENARIOS = [
  {
    id: 'villa-living',
    label: 'Residential Villa (Lusail / Al Rayyan / Pearl)',
    icon: '🏡',
    unprotectedTemp: '36°C Window Zone',
    protectedTemp: '23°C Balanced Room',
    irRejected: '95% IR Blocked',
    uvBlocked: '99.9% UV Shield',
    energySaved: 'Up to 30% Lower AC Bill',
    summary:
      'Residential ceramic and daytime one-way privacy films let your family enjoy sunlit rooms and open curtains without neighbors seeing in or UV rays fading silk carpets.',
    recommendedSlug: 'sun-control-window-film',
    recommendedTitle: 'Sun Control Window Film',
    image: ASSETS.services.residential,
    bgClass: 'bg-[#6ee7b7]',
  },
  {
    id: 'commercial-tower',
    label: 'Commercial Office Floor (Doha / West Bay)',
    icon: '🏢',
    unprotectedTemp: 'High Glare & Hotspots',
    protectedTemp: '85% Glare Cut · 22°C',
    irRejected: '96% Solar Control',
    uvBlocked: '99.9% UV Shield',
    energySaved: '-32% HVAC Chiller Load',
    summary:
      'Architectural solar-control, one-way mirror, and CNC frosted partition films slash commercial electricity bills while upgrading employee comfort and boardroom privacy.',
    recommendedSlug: 'sun-control-window-film',
    recommendedTitle: 'Sun Control Window Film',
    image: ASSETS.services.commercial,
    bgClass: 'bg-[#d9f941]',
  },
  {
    id: 'marble-sofa',
    label: 'Villa Marble Countertops & Majlis Sofas',
    icon: '🛋️',
    unprotectedTemp: 'Permanent Acid Etching',
    protectedTemp: '100% Stain & Etch Proof',
    irRejected: '150°C Thermal TPU',
    uvBlocked: '99% Anti-Yellowing',
    energySaved: 'Saves 15,000+ QAR Refinishing',
    summary:
      'Combine optically clear self-healing TPU marble protection film with hydrophobic SiO2 sofa nano coating so coffee, lemon juice, and food spills wipe away effortlessly.',
    recommendedSlug: 'surface-protection-film',
    recommendedTitle: 'Marble & Sofa Protection',
    image: ASSETS.services.marbleProtection,
    bgClass: 'bg-[#f45b9a]',
  },
];

export interface ZoneDispatchDetail {
  eta: string;
  popular: string;
  highlight: string;
  slug: string;
}

export const ZONE_DISPATCH_DETAILS: Record<string, ZoneDispatchDetail> = {
  Lusail: {
    eta: '25 – 35 Mins Mobile Dispatch',
    popular: 'Villa Sun Control Film, Marble Island Shield & Smart Film',
    highlight: 'Serving Fox Hills, Waterfront, Marina & Yasmeen City daily.',
    slug: 'sun-control-window-film',
  },
  'Pearl qatar': {
    eta: '25 – 35 Mins Mobile Dispatch',
    popular: 'HOA-Compliant Clear Ceramic Glass Tint & Sofa Nano Coating',
    highlight: 'Serving Porto Arabia, Viva Bahriya, Qanat Quartier & Giardino.',
    slug: 'fabric-nano-coating',
  },
  Doha: {
    eta: '20 – 30 Mins Studio & On-Site',
    popular: 'Commercial Sun Control, Frosted Logos & Smart Film',
    highlight: 'Serving West Bay, Msheireb, Al Sadd, Bin Mahmoud & Old Airport.',
    slug: 'sun-control-window-film',
  },
  'Al kheesa': {
    eta: '25 – 35 Mins Mobile Dispatch',
    popular: 'Villa Privacy Film, Safety Film & Wallpaper',
    highlight: 'Family villa glass protection, privacy and safety film.',
    slug: 'sun-control-window-film',
  },
  'Al garaffa': {
    eta: '25 – 35 Mins Mobile Dispatch',
    popular: 'Majlis Sofa Nano Coating, Marble Table Film & House Window Tinting',
    highlight: 'Complete interior surface armor and solar window films for family villas.',
    slug: 'fabric-nano-coating',
  },
  'Al Rayyan': {
    eta: '30 – 40 Mins Mobile Dispatch',
    popular: 'Heat Rejection Villa Window Film & Surface Protection',
    highlight: 'Maximum infrared heat rejection for standalone compounds and villas.',
    slug: 'sun-control-window-film',
  },
  Wakra: {
    eta: '30 – 45 Mins Mobile Dispatch',
    popular: 'Home Window Film, Fabric Nano Coating & Wallpaper',
    highlight: 'Dedicated mobile teams serving Al Wakrah and Al Mashaf 7 days a week.',
    slug: 'sun-control-window-film',
  },
};
