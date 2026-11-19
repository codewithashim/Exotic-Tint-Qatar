import type { ServiceDetail } from './services-data';

export type ServicesFilterTab = 'all' | ServiceDetail['category'];

export const FILTER_TABS = [
  { id: 'all', label: 'All 6 Solutions' },
  { id: 'window-tinting', label: 'Window & Glass Tinting (01–04)' },
  { id: 'surface-protection', label: 'Surface & Fabric Shield (05–06)' },
] as const;

export const QUICK_MATCHER_OPTIONS = [
  {
    id: 'match-car',
    label: '🚗 Car, SUV or Supercar Glass',
    goal: '96% Heat Rejection + Mobile Home Garage Install',
    slug: 'automotive-window-tinting',
  },
  {
    id: 'match-office',
    label: '🏢 Commercial Office Building',
    goal: 'Lower AC Bills + Cut Monitor Glare + Mirror Privacy',
    slug: 'commercial-window-tinting',
  },
  {
    id: 'match-villa',
    label: '🏡 Villa & Apartment Windows',
    goal: 'One-Way Daytime Family Privacy + 99.9% UV Block',
    slug: 'residential-window-tinting',
  },
  {
    id: 'match-frosted',
    label: '🚪 Glass Partitions & Doors',
    goal: 'Custom CNC Cut Frosted Logos & 24/7 Privacy',
    slug: 'customized-cut-frosted-film',
  },
  {
    id: 'match-marble',
    label: '🪨 Marble Islands & Wood Tables',
    goal: 'Stop Lemon Acid Etching, Coffee Rings & Scratches',
    slug: 'marble-protection-film',
  },
  {
    id: 'match-sofa',
    label: '🛋️ Sofas, Majlis & Silk Carpets',
    goal: 'Hydrophobic SiO2 Shield So Spills Bead Up',
    slug: 'fabric-nano-coating-service',
  },
];
