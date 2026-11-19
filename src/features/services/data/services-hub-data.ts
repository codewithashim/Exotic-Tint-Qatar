import { ALL_SERVICES, SERVICE_CATEGORY_LABELS, type ServiceCategory } from './services-data';

export type ServicesFilterTab = 'all' | ServiceCategory;

const countIn = (category: ServiceCategory) =>
  ALL_SERVICES.filter((s) => s.category === category).length;

export const FILTER_TABS: { id: ServicesFilterTab; label: string }[] = [
  { id: 'all', label: `All ${ALL_SERVICES.length} Solutions` },
  ...(Object.keys(SERVICE_CATEGORY_LABELS) as ServiceCategory[]).map((id) => ({
    id,
    label: `${SERVICE_CATEGORY_LABELS[id]} (${countIn(id)})`,
  })),
];

export const QUICK_MATCHER_OPTIONS = [
  {
    id: 'match-sun',
    label: '🏡 Hot Villa, Apartment or Office Windows',
    goal: 'Heat Rejection + UV Protection + Daytime Privacy',
    slug: 'sun-control-window-film',
  },
  {
    id: 'match-surface',
    label: '🪨 Marble, Stone, Steel & Wood Surfaces',
    goal: 'Stop Etching, Stains, Scratches & Fingerprints',
    slug: 'surface-protection-film',
  },
  {
    id: 'match-frosted',
    label: '🚪 Glass Partitions, Doors & Bathrooms',
    goal: 'Frosted Privacy, Patterns & Custom Logos',
    slug: 'frosted-decorative-film',
  },
  {
    id: 'match-fabric',
    label: '🛋️ Sofas, Majlis & Carpets',
    goal: 'Water & Stain Protection So Spills Bead Up',
    slug: 'fabric-nano-coating',
  },
  {
    id: 'match-walls',
    label: '🖼️ Plain Walls & Feature Walls',
    goal: 'Premium Wallpaper & Decorative Wall Finishes',
    slug: 'wallpaper-wall-finishing',
  },
  {
    id: 'match-smart',
    label: '💡 Meeting Rooms & Glass Offices',
    goal: 'Switch Glass From Clear to Frosted On Demand',
    slug: 'smart-film',
  },
  {
    id: 'match-safety',
    label: '🛡️ Glass Doors, Shopfronts & Schools',
    goal: 'Hold Broken Glass Together & Resist Break-Ins',
    slug: 'safety-security-film',
  },
];
