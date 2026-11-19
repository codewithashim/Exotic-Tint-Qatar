import { ASSETS } from '@/config/assets';

export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  mediaType: MediaType;
  thumbnailUrl: string; // Used for grid preview (both images and video posters)
  mediaUrl: string;     // Full-res image link or video source URL
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  tags: string[];
  clientOrProject?: string;
  publishedAt: string;
  // Additional rich project metadata for Exotic Tint Qatar
  durationSec?: number;
  durationFormatted?: string;
  location?: string;
  serviceSlug?: string;
  serviceTitle?: string;
  accentColor?: string;
  specs?: { label: string; value: string }[];
}

export const GALLERY_FILTER_TAGS = [
  'Commercial',
  'Residential',
  'Frosted Film',
  'Marble Shield',
  'Nano Coating',
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'etq-gal-02',
    title: 'Live Spill Test: Hydrophobic SiO2 Nano Coating on Cream Majlis Sofa',
    description:
      'Watch concentrated red berry juice bead and roll right off an untreated-looking cream linen Majlis sofa in Al Gharrafa. Breathable, odorless fluorocarbon-free nano shield.',
    mediaType: 'video',
    thumbnailUrl: ASSETS.services.fabricNanoCoating,
    mediaUrl: ASSETS.services.fabricNanoCoating,
    aspectRatio: '16:9',
    tags: ['Nano Coating', 'Residential', 'Hydrophobic Test'],
    clientOrProject: 'Al-Thani Private Majlis · Al Gharrafa',
    publishedAt: '2025-03-12',
    durationSec: 28,
    durationFormatted: '00:28',
    location: 'Al Gharrafa, Doha',
    serviceSlug: 'fabric-nano-coating',
    serviceTitle: 'Fabric Nano Coating',
    accentColor: '#a78bfa',
    specs: [
      { label: 'Contact Angle', value: '142° Super-Hydrophobic' },
      { label: 'Curing Time', value: '4 Hours On-Site' },
      { label: 'Fabric Feel', value: 'Zero Stiffness / Odorless' },
    ],
  },
  {
    id: 'etq-gal-03',
    title: '8-Mil Self-Healing TPU Film Installation on Black Nero Marquina Marble',
    description:
      'Wet-bond optical application of 8-mil aliphatic TPU stone protection film on a luxury dining table and kitchen island in The Pearl-Qatar. 100% immune to lemon juice, vinegar etching, and hot cookware.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.marbleProtection,
    mediaUrl: ASSETS.services.marbleProtection,
    aspectRatio: '16:9',
    tags: ['Marble Shield', 'Residential', 'Self-Healing TPU'],
    clientOrProject: 'Giardino Village Villa · The Pearl-Qatar',
    publishedAt: '2025-03-10',
    location: 'The Pearl-Qatar',
    serviceSlug: 'surface-protection-film',
    serviceTitle: 'Surface Protection Film',
    accentColor: '#f45b9a',
    specs: [
      { label: 'Film Thickness', value: '8.0 Mil Optical TPU' },
      { label: 'Heat Resistance', value: 'Up to 180°C' },
      { label: 'Self-Healing', value: 'Thermal Swirl Recovery' },
    ],
  },
  {
    id: 'etq-gal-04',
    title: 'Commercial Curtain-Wall Solar Film — 32% HVAC Load Reduction',
    description:
      'Full exterior-and-interior solar control window tinting for a 4,200 m² commercial headquarters in West Bay. Eliminated 87% of screen glare while cutting peak summer cooling demand.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.commercial,
    mediaUrl: ASSETS.services.commercial,
    aspectRatio: '1:1',
    tags: ['Commercial', 'Energy Saving', 'Solar Control'],
    clientOrProject: 'Gulf FinTech Plaza · West Bay Doha',
    publishedAt: '2025-03-08',
    location: 'West Bay, Doha',
    serviceSlug: 'sun-control-window-film',
    serviceTitle: 'Sun Control Window Film',
    accentColor: '#d9f941',
    specs: [
      { label: 'Total Solar Rejected', value: '79% TSER' },
      { label: 'HVAC Load Drop', value: '-32% Kahramaa Bill' },
      { label: 'Glare Reduction', value: '87% Eye Comfort' },
    ],
  },
  {
    id: 'etq-gal-05',
    title: 'CNC-Plotter Custom Botanical Mandala Frosted Glass Partitions',
    description:
      'Precision CAD-cut architectural sandblast film installed across executive boardrooms in Msheireb Downtown Doha. Delivers 92% privacy while transmitting natural ambient daylight.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.frostedFilm,
    mediaUrl: ASSETS.services.frostedFilm,
    aspectRatio: '1:1',
    tags: ['Frosted Film', 'Commercial', 'Custom CNC Cut'],
    clientOrProject: 'Aura Executive Suites · Msheireb Downtown',
    publishedAt: '2025-03-05',
    location: 'Msheireb Downtown Doha',
    serviceSlug: 'frosted-decorative-film',
    serviceTitle: 'Frosted & Decorative Film',
    accentColor: '#fbbf24',
    specs: [
      { label: 'Plotter Precision', value: '0.1mm Vector Cut' },
      { label: 'Light Transmission', value: '78% Soft Diffused' },
      { label: 'Finish Grade', value: 'Matte Etched Crystal' },
    ],
  },
  {
    id: 'etq-gal-07',
    title: 'Dual-Reflective Daytime Privacy Villa Window Tinting in Al Waab',
    description:
      'Floor-to-ceiling villa glass treated with Spectrally Selective Dual-Reflective film. Complete daytime one-way mirror privacy from outside while preserving crystal-clear garden views at night.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.residential,
    mediaUrl: ASSETS.services.residential,
    aspectRatio: '4:3',
    tags: ['Residential', 'Daytime Privacy', 'UV Protection'],
    clientOrProject: 'Private Compound Villa · Al Waab',
    publishedAt: '2025-02-28',
    location: 'Al Waab, Doha',
    serviceSlug: 'sun-control-window-film',
    serviceTitle: 'Sun Control Window Film',
    accentColor: '#6ee7b7',
    specs: [
      { label: 'UV Ray Block', value: '99.9% Fade Stop' },
      { label: 'Daytime Privacy', value: '95% Exterior Mirror' },
      { label: 'Interior View', value: 'Low-Reflective Neutral' },
    ],
  },
  {
    id: 'etq-gal-08',
    title: 'On-Site Video: Wet-Bond TPU Marble Shield Squeegee & Edge Wrapping',
    description:
      'Watch our master surface technicians wrap a curved Nero Marquina waterfall countertop in Lusail with invisible 8-mil TPU stone protection film.',
    mediaType: 'video',
    thumbnailUrl: ASSETS.services.marbleProtection,
    mediaUrl: ASSETS.services.marbleProtection,
    aspectRatio: '4:3',
    tags: ['Marble Shield', 'Residential', 'Live Installation'],
    clientOrProject: 'Penthouse Kitchen · Lusail Fox Hills',
    publishedAt: '2025-02-25',
    durationSec: 45,
    durationFormatted: '00:45',
    location: 'Fox Hills, Lusail',
    serviceSlug: 'surface-protection-film',
    serviceTitle: 'Surface Protection Film',
    accentColor: '#f45b9a',
    specs: [
      { label: 'Stone Type', value: 'Polished Italian Marble' },
      { label: 'Gloss Enhancement', value: '+22% Depth Clarity' },
      { label: 'Edge Seal', value: 'Wrapped Under-Bevel' },
    ],
  },
  {
    id: 'etq-gal-09',
    title: 'High-Rise Architectural Solar Glaze in Lusail Marina Twin Towers',
    description:
      'Multi-floor commercial window tinting project for a financial consultancy in Lusail Marina. Balanced natural daylight with high infrared heat rejection.',
    mediaType: 'video',
    thumbnailUrl: ASSETS.services.commercial,
    mediaUrl: ASSETS.services.commercial,
    aspectRatio: '16:9',
    tags: ['Commercial', 'Architectural', 'Lusail'],
    clientOrProject: 'Marina Commercial Tower · Lusail',
    publishedAt: '2025-02-20',
    durationSec: 38,
    durationFormatted: '00:38',
    location: 'Lusail Marina District',
    serviceSlug: 'sun-control-window-film',
    serviceTitle: 'Sun Control Window Film',
    accentColor: '#d9f941',
    specs: [
      { label: 'Glass Area', value: '1,850 m² Installed' },
      { label: 'Execution Window', value: 'After-Hours Zero Disruption' },
      { label: 'ROI Payback', value: '14 Months via AC Savings' },
    ],
  },
  {
    id: 'etq-gal-10',
    title: 'White Velvet Majlis & Dining Chairs Hydrophobic Nano Treatment',
    description:
      'Complete 18-seat Majlis sofa and Persian silk carpet nano-coating package in Al Rayyan. Protects delicate textiles from Arabic coffee, karak tea, and saffron stains.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.fabricNanoCoating,
    mediaUrl: ASSETS.services.fabricNanoCoating,
    aspectRatio: '4:3',
    tags: ['Nano Coating', 'Residential', 'Majlis Protection'],
    clientOrProject: 'Royal Majlis Residence · Al Rayyan',
    publishedAt: '2025-02-17',
    location: 'Al Rayyan, Qatar',
    serviceSlug: 'fabric-nano-coating',
    serviceTitle: 'Fabric Nano Coating',
    accentColor: '#a78bfa',
    specs: [
      { label: 'Treated Surface', value: '18-Seat Majlis + Rugs' },
      { label: 'Protection Span', value: 'Up to 36 Months' },
      { label: 'Safety Rating', value: 'Child & Pet Certified' },
    ],
  },
  {
    id: 'etq-gal-11',
    title: 'Corporate Geometric Band & Logo Cutout Frosted Glass Film',
    description:
      'Custom-plotted corporate identity bands and privacy gradients for a medical clinic and law firm in Al Sadd, Doha.',
    mediaType: 'video',
    thumbnailUrl: ASSETS.services.frostedFilm,
    mediaUrl: ASSETS.services.frostedFilm,
    aspectRatio: '1:1',
    tags: ['Frosted Film', 'Commercial', 'Office Branding'],
    clientOrProject: 'Doha Specialist Medical Center · Al Sadd',
    publishedAt: '2025-02-14',
    durationSec: 31,
    durationFormatted: '00:31',
    location: 'Al Sadd, Doha',
    serviceSlug: 'frosted-decorative-film',
    serviceTitle: 'Frosted & Decorative Film',
    accentColor: '#fbbf24',
    specs: [
      { label: 'Partition Count', value: '24 Glass Suites' },
      { label: 'Opacity Level', value: '88% Frosted Matte' },
      { label: 'Removal', value: '100% Residue-Free Adhesive' },
    ],
  },
  {
    id: 'etq-gal-13',
    title: 'Sunroom & Poolside Villa Glass Heat Shield in The Pearl-Qatar',
    description:
      'Eliminated afternoon solar hot-spots in a west-facing waterfront villa living room without darkening the panoramic Arabian Gulf view.',
    mediaType: 'video',
    thumbnailUrl: ASSETS.services.residential,
    mediaUrl: ASSETS.services.residential,
    aspectRatio: '16:9',
    tags: ['Residential', 'Solar Control', 'The Pearl'],
    clientOrProject: 'Qanat Quartier Townhouse · The Pearl',
    publishedAt: '2025-02-06',
    durationSec: 42,
    durationFormatted: '00:42',
    location: 'The Pearl-Qatar',
    serviceSlug: 'sun-control-window-film',
    serviceTitle: 'Sun Control Window Film',
    accentColor: '#6ee7b7',
    specs: [
      { label: 'Visible Light', value: '65% Natural Daylight' },
      { label: 'Infrared Blocked', value: '94% Solar IR' },
      { label: 'Furniture Shield', value: '99.9% UV Blocked' },
    ],
  },
  {
    id: 'etq-gal-14',
    title: 'Calacatta Gold Bathroom Vanity & Majlis Coffee Table Stone Shield',
    description:
      'Invisible protection against perfume alcohol, cosmetics, and acidic beverages across 6 marble surfaces in a Duhail luxury villa.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.marbleProtection,
    mediaUrl: ASSETS.services.marbleProtection,
    aspectRatio: '1:1',
    tags: ['Marble Shield', 'Residential', 'Vanity & Tables'],
    clientOrProject: 'Private Villa · Duhail Doha',
    publishedAt: '2025-02-02',
    location: 'Duhail, Doha',
    serviceSlug: 'surface-protection-film',
    serviceTitle: 'Surface Protection Film',
    accentColor: '#f45b9a',
    specs: [
      { label: 'Surfaces Wrapped', value: '6 Marble Tops' },
      { label: 'Finish Option', value: 'High-Gloss Mirror TPU' },
      { label: 'Warranty', value: '10-Year Non-Yellowing' },
    ],
  },
  {
    id: 'etq-gal-15',
    title: 'Showroom Anti-UV & Anti-Shatter Security Glazing in Salwa Road',
    description:
      'Combined solar-control and safety glazing film for a luxury retail showroom frontage on Salwa Road, blocking 99.9% of merchandise-fading UV rays.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.commercial,
    mediaUrl: ASSETS.services.commercial,
    aspectRatio: '4:3',
    tags: ['Commercial', 'Safety Glaze', 'Showroom'],
    clientOrProject: 'Luxury Auto & Watch Showroom · Salwa Rd',
    publishedAt: '2025-01-28',
    location: 'Salwa Road, Doha',
    serviceSlug: 'safety-security-film',
    serviceTitle: 'Safety & Security Film',
    accentColor: '#d9f941',
    specs: [
      { label: 'UV Protection', value: '99.9% Display Safe' },
      { label: 'Glass Retention', value: 'Shatter-Hold Adhesive' },
      { label: 'Optical Clarity', value: 'Distortion-Free View' },
    ],
  },
  {
    id: 'etq-gal-16',
    title: 'Villa Staircase & Majlis Entrance Custom Islamic Geometric Frosted Film',
    description:
      'Bespoke laser-measured frosted glass pattern designed for a double-height villa entrance in Al Wakrah, providing complete family privacy with warm diffused light.',
    mediaType: 'image',
    thumbnailUrl: ASSETS.services.frostedFilm,
    mediaUrl: ASSETS.services.frostedFilm,
    aspectRatio: '4:3',
    tags: ['Frosted Film', 'Residential', 'Bespoke Pattern'],
    clientOrProject: 'Al-Mansoori Family Villa · Al Wakrah',
    publishedAt: '2025-01-22',
    location: 'Al Wakrah, Qatar',
    serviceSlug: 'frosted-decorative-film',
    serviceTitle: 'Frosted & Decorative Film',
    accentColor: '#fbbf24',
    specs: [
      { label: 'Pattern Style', value: 'Custom Arabesque & Botanical' },
      { label: 'Durability', value: 'Humidity & UV Proof' },
      { label: 'Privacy Index', value: '94% Two-Way Obscuration' },
    ],
  },
];

/** Before/after comparisons shown in the gallery hero "lab". */
export const SPOTLIGHT_COMPARISONS = [
  {
    id: 'spot-marble',
    badge: '8-MIL SELF-HEALING TPU',
    title: 'Nero Marquina & Calacatta Marble Island Shield',
    location: 'The Pearl-Qatar Villa',
    beforeLabel: 'Raw Porous Marble (Prone to Lemon Acid Etching)',
    afterLabel: '8-Mil Optical TPU Shield (100% Acid & Scratch Proof)',
    image: ASSETS.services.marbleProtection,
    serviceSlug: 'surface-protection-film',
    accentColor: '#f45b9a',
    metrics: ['8.0 Mil Optical TPU', '180°C Heat Proof', '10-Yr Non-Yellowing'],
  },
  {
    id: 'spot-nano',
    badge: 'SIO2 HYDROPHOBIC SHIELD',
    title: 'Luxury White Majlis Sofa & Rug Spill Protection',
    location: 'Al Gharrafa & Al Rayyan',
    beforeLabel: 'Untreated Linen (Instant Coffee & Juice Absorption)',
    afterLabel: 'SiO2 Nano Coated (142° Liquid Bead & Roll-Off)',
    image: ASSETS.services.fabricNanoCoating,
    serviceSlug: 'fabric-nano-coating',
    accentColor: '#a78bfa',
    metrics: ['142° Bead Angle', 'Odorless & Breathable', 'Child & Pet Safe'],
  },
  {
    id: 'spot-comm',
    badge: 'ARCHITECTURAL SOLAR CONTROL',
    title: 'West Bay Commercial Tower Glaze (-32% AC Load)',
    location: 'West Bay & Lusail Commercial',
    beforeLabel: 'Clear Curtain Wall (Severe Screen Glare & Hotspots)',
    afterLabel: 'Dual-Reflective Solar Film (87% Glare Cut · -32% HVAC)',
    image: ASSETS.services.commercial,
    serviceSlug: 'sun-control-window-film',
    accentColor: '#d9f941',
    metrics: ['79% Total Solar Rejected', '-32% Kahramaa AC Savings', '87% Glare Reduction'],
  },
];
