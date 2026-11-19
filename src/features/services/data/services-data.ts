import { ASSETS } from '@/config/assets';

/*
 * Service catalogue. The order here is the order on the site (numbering, menus, booking forms).
 *
 * Content rule: only publish figures (percentages, temperatures, warranty years, durations) that
 * the business can back up. The three services added in Nov 2026 (Wallpaper & Wall Finishing,
 * Smart Film, Safety & Security Film) intentionally use qualitative wording and
 * "confirmed in your quote" — replace with real product specs when available.
 */

export interface SimulatorOption {
  id: string;
  label: string;
  vltOrFinish: string;
  irRejection: string;
  uvBlock: string;
  glareOrStainReduction: string;
  warranty: string;
  bestFor: string;
  previewTintOpacity: string;
}

export interface EstimatorOption {
  id: string;
  label: string;
  duration: string;
  coverage: string;
  popularFilm: string;
  benefitSummary: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  color: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export type ServiceCategory = 'glass-film' | 'surface-interior';

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  'glass-film': 'Glass & Window Films',
  'surface-interior': 'Surface & Interior Finishes',
};

/** Labels for the 4 spec tiles under the simulator (irRejection, uvBlock, glareOrStain, warranty). */
export type SpecLabels = [string, string, string, string];
export const DEFAULT_SPEC_LABELS: SpecLabels = ['Heat / Thermal', 'UV Defense', 'Protection', 'Warranty'];

export interface ServiceDetail {
  slug: string;
  id: string;
  num: string;
  category: ServiceCategory;
  badge: string;
  shortTitle: string;
  title: string;
  seoHeadline: string;
  heroSubheadline: string;
  desc: string;
  longDescription: string;
  bgClass: string;
  accentHex: string;
  image: string;
  alt: string;
  keyStats: {
    label: string;
    value: string;
    sub: string;
  }[];
  benefitsList: string[];
  simulatorTitle: string;
  simulatorSubtitle: string;
  /** Overrides DEFAULT_SPEC_LABELS for services where "Heat / UV" do not apply. */
  specLabels?: SpecLabels;
  simulatorOptions: SimulatorOption[];
  estimatorTitle: string;
  estimatorOptions: EstimatorOption[];
  processSteps: ProcessStep[];
  comparisonRows: {
    feature: string;
    exoticTint: string;
    standardOption: string;
  }[];
  faqs: ServiceFAQ[];
  /** Only real, attributable client feedback. Omit when there is none. */
  clientReview?: {
    name: string;
    role: string;
    quote: string;
  };
}

const QUOTE_CONFIRMED = 'Confirmed in Your Quote';
const AFTER_SITE_VISIT = 'Confirmed After Free Site Visit';

export const ALL_SERVICES: ServiceDetail[] = [
  // ---------------------------------------------------------------- 01
  {
    slug: 'sun-control-window-film',
    id: 'Sun Control Window Film',
    num: '01',
    category: 'glass-film',
    badge: 'COMMERCIAL & RESIDENTIAL',
    shortTitle: 'Sun Control Film',
    title: 'Sun Control Window Film',
    seoHeadline: 'Sun Control Window Film Qatar – Commercial & Residential Window Tinting',
    heroSubheadline:
      'Cooler rooms, lower AC bills and daytime privacy for villas, apartments, offices and commercial towers — without losing your view.',
    desc: 'Sun control window film for homes and businesses in Qatar: ceramic heat-rejection films, one-way daytime privacy, glare control and UV protection for villas, apartments, offices and towers.',
    longDescription:
      'Glass is where most of Qatar’s heat enters a building. Exotic Tint Qatar installs sun control window film on villas, apartments, offices, clinics, showrooms and commercial towers across Doha, Lusail, The Pearl-Qatar, Al Rayyan and Al Wakrah. Choose clear nano-ceramic film that keeps a natural glass look, one-way films for daytime privacy, or architectural solar-control and blackout films for commercial spaces — all applied to your existing glass with clean, sealed edges.',
    bgClass: 'bg-[#f27438]',
    accentHex: '#f27438',
    image: ASSETS.services.commercial,
    alt: 'Sun control window film on a glass building in Doha',
    keyStats: [
      { label: 'Heat Rejection', value: 'Up to 96%', sub: 'Ceramic IR Film Range' },
      { label: 'UV Ray Blockage', value: '99.9% UV', sub: 'Protects Furniture & Interiors' },
      { label: 'Daytime Privacy', value: 'One-Way View', sub: 'See Out, Nobody Sees In' },
      { label: 'Applications', value: 'Homes & Offices', sub: 'Villas, Apartments, Towers' },
    ],
    benefitsList: [
      'Ceramic films that block heat while keeping rooms bright and views natural',
      'One-way daytime privacy for ground-floor villas, Majlis halls and street-facing offices',
      'Cuts screen glare and hot spots near floor-to-ceiling glass and curtain walls',
      'Protects curtains, carpets, wooden floors and artwork from UV fading',
    ],
    simulatorTitle: 'Sun Control Film Selector',
    simulatorSubtitle:
      'Compare our most popular sun control films for homes and commercial buildings.',
    simulatorOptions: [
      {
        id: 'clear-ceramic',
        label: 'Invisible Nano-Ceramic View Film',
        vltOrFinish: 'Crystal Clear Natural Light',
        irRejection: '93% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '48% Glare Cut',
        warranty: '10-Year Warranty',
        bestFor: 'Sea-view apartments and buildings where a natural glass look is required.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'architectural-ceramic',
        label: 'Architectural Solar Ceramic Film',
        vltOrFinish: 'Neutral Clear / Low Reflectance',
        irRejection: '94% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '68% Glare Cut',
        warranty: '10-Year Commercial Warranty',
        bestFor: 'Showrooms and corporate offices needing heat rejection without changing the facade.',
        previewTintOpacity: 'opacity-85',
      },
      {
        id: 'one-way-privacy',
        label: 'One-Way Daytime Privacy Film',
        vltOrFinish: 'Reflective Exterior / Mirror',
        irRejection: '95% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '78% Glare Cut',
        warranty: '10-Year Warranty',
        bestFor: 'Villa living rooms, ground-floor offices and clinics needing daytime privacy.',
        previewTintOpacity: 'opacity-70',
      },
      {
        id: 'blackout',
        label: 'Total Blackout Film',
        vltOrFinish: '0% Light Transmission',
        irRejection: '99% Solar Block',
        uvBlock: '100% UV',
        glareOrStainReduction: '100% Light Block',
        warranty: '10-Year Warranty',
        bestFor: 'Server rooms, media rooms, storage zones and bedrooms needing full darkness.',
        previewTintOpacity: 'opacity-30',
      },
    ],
    estimatorTitle: 'Sun Control Project Scope Estimator',
    estimatorOptions: [
      {
        id: 'apartment',
        label: 'Apartment or Penthouse (Pearl / Lusail)',
        duration: '3 – 4 Hours',
        coverage: 'Balcony Sliders + Living Room & Bedroom Windows',
        popularFilm: 'Invisible Nano-Ceramic Series',
        benefitSummary: 'Cuts afternoon glare and keeps balcony glass cool to the touch.',
      },
      {
        id: 'family-villa',
        label: 'Family Villa (Ground & First Floor)',
        duration: '5 – 7 Hours (1 Day)',
        coverage: 'All Villa Windows + Majlis & Skylight Glass',
        popularFilm: 'One-Way Daytime Privacy + Ceramic Heat Shield',
        benefitSummary: 'Daytime family privacy plus noticeable AC cooling relief.',
      },
      {
        id: 'office-suite',
        label: 'Office Suite or Retail Storefront (Up to 50 m²)',
        duration: 'Same-Day Installation (4–6 Hours)',
        coverage: 'Exterior Windows + Internal Glass',
        popularFilm: 'Architectural Solar Ceramic',
        benefitSummary: 'After-hours and weekend installation so your team keeps working.',
      },
      {
        id: 'commercial-building',
        label: 'Full Floor, Building, Clinic or School (50 m²+)',
        duration: 'Custom Phased Schedule',
        coverage: 'Curtain Wall & Facade Glazing',
        popularFilm: 'Architectural Solar Control Series',
        benefitSummary: 'Free on-site survey and per-square-meter commercial pricing.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Free On-Site Survey & Samples',
        desc: 'We measure your glass and hold film samples against your windows in real sunlight.',
        color: 'bg-[#f27438]',
      },
      {
        step: '02',
        title: 'Clear Proposal & Scheduling',
        desc: 'Transparent per-square-meter pricing. We schedule around your family or business hours.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Clean, Protected Installation',
        desc: 'Floors and furniture are covered, glass is deep-cleaned and the film is applied with sealed edges.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Inspection & Warranty Handover',
        desc: 'We inspect every pane with you and hand over your warranty documentation.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Natural Light & Views',
        exoticTint: 'Keeps the View While Blocking Heat',
        standardOption: 'Curtains & Blinds Block All Light',
      },
      {
        feature: 'UV Protection for Interiors',
        exoticTint: '99.9% UV Blocked 24/7',
        standardOption: 'Furniture Fades When Curtains Open',
      },
      {
        feature: 'Daytime Privacy',
        exoticTint: 'One-Way Privacy Film Options',
        standardOption: 'Exposed or Curtains Closed All Day',
      },
      {
        feature: 'Screen & Window Glare',
        exoticTint: 'Glare Reduced Without Darkening Rooms',
        standardOption: 'Blinds Closed All Day',
      },
    ],
    faqs: [
      {
        q: 'Can sun control film be installed on double-glazed villa windows?',
        a: 'Yes. We choose films rated for modern tempered and double-glazed units, and we confirm compatibility during the free site survey.',
      },
      {
        q: 'Can you install in our office outside working hours?',
        a: 'Yes. We work 7 days a week and regularly schedule commercial installations in the evening or at weekends so your team is not disturbed.',
      },
      {
        q: 'Will one-way privacy film work at night?',
        a: 'One-way films give privacy when it is brighter outside than inside. At night with the lights on, the effect reverses — we will recommend frosted, smart or blackout film where you need privacy 24/7.',
      },
    ],
    clientReview: {
      name: 'Miranda Snyder',
      role: 'Verified Commercial Window Film Client · Doha',
      quote:
        'Exotic Tint Qatar provided excellent commercial window tinting in Doha. The frosted window film designs are perfect for our office, and the heat reduction is amazing!',
    },
  },

  // ---------------------------------------------------------------- 02
  {
    slug: 'surface-protection-film',
    id: 'Surface Protection Film',
    num: '02',
    category: 'surface-interior',
    badge: 'MARBLE · STONE · STEEL · WOOD',
    shortTitle: 'Surface Protection',
    title: 'Surface Protection Film',
    seoHeadline: 'Surface Protection Film Qatar – Marble, Stone, Stainless Steel & Wood',
    heroSubheadline:
      'Clear protective film that guards marble, stone, stainless steel, wood, furniture and architectural surfaces against scratches, stains and etching.',
    desc: 'Clear surface protection film for marble, stone, stainless steel, wood, furniture and architectural surfaces in homes, hotels and offices across Qatar.',
    longDescription:
      'Marble and natural stone etch from lemon juice and vinegar, wooden tables mark from hot cups and water rings, and stainless steel and lacquered finishes scratch from everyday use. Exotic Tint Qatar applies optically clear protective film directly over these surfaces — kitchen islands, dining and coffee tables, vanities, reception counters, elevator and lift panels, stainless steel appliances, joinery and furniture — so they keep their original look for years.',
    bgClass: 'bg-[#f45b9a]',
    accentHex: '#f45b9a',
    image: ASSETS.services.marbleProtection,
    alt: 'Clear surface protection film on a marble countertop in Qatar',
    keyStats: [
      { label: 'Stain & Acid Protection', value: 'Sealed Surface', sub: 'Coffee, Lemon & Oil' },
      { label: 'Scratch Technology', value: 'Self-Healing', sub: 'Light Scratches Fade' },
      { label: 'Surfaces', value: 'Stone · Steel · Wood', sub: 'Plus Furniture & Panels' },
      { label: 'Finish Options', value: 'Gloss / Matte', sub: 'Matches Your Surface Sheen' },
    ],
    benefitsList: [
      'Near-invisible protection for kitchen islands, tables, vanities and reception counters',
      'Stops acid etching on marble and natural stone',
      'Protects stainless steel, lift panels, joinery and furniture from scratches and fingerprints',
      'Wipes clean with water — and can be replaced instead of refinishing the surface',
    ],
    simulatorTitle: 'Surface Finish & Protection Selector',
    simulatorSubtitle: 'We match the sheen of your stone, metal or wooden surface.',
    specLabels: ['Heat', 'UV Stability', 'Protection', 'Warranty'],
    simulatorOptions: [
      {
        id: 'high-gloss-stone',
        label: 'High-Gloss Marble & Stone Shield',
        vltOrFinish: 'Mirror-Like Depth & Clarity',
        irRejection: '150°C Thermal Barrier',
        uvBlock: '99% Anti-Yellowing UV',
        glareOrStainReduction: 'Acid & Stain Proof',
        warranty: 'Up to 10-Year Surface Life',
        bestFor: 'Polished marble kitchen islands, dining tables and hotel reception counters.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'satin-matte-stone',
        label: 'Honed / Satin Matte Stone Film',
        vltOrFinish: 'Velvety Non-Reflective Finish',
        irRejection: '150°C Thermal Barrier',
        uvBlock: '99% Anti-Yellowing UV',
        glareOrStainReduction: 'Acid & Stain Proof',
        warranty: 'Up to 10-Year Surface Life',
        bestFor: 'Honed marble, travertine and matte-finished stone surfaces.',
        previewTintOpacity: 'opacity-80',
      },
      {
        id: 'wood-furniture',
        label: 'Wood & Furniture Protection Film',
        vltOrFinish: 'Warm Natural Grain',
        irRejection: 'Hot Cup Ring Prevention',
        uvBlock: '99.9% UV Fade Block',
        glareOrStainReduction: 'Scratch & Water Ring Proof',
        warranty: 'Up to 10-Year Surface Life',
        bestFor: 'Dining tables, boardroom tables, sideboards and bespoke joinery.',
        previewTintOpacity: 'opacity-85',
      },
      {
        id: 'steel-architectural',
        label: 'Stainless Steel & Architectural Surfaces',
        vltOrFinish: 'Clear, Matched to Brushed or Polished Metal',
        irRejection: 'Everyday Use',
        uvBlock: 'Non-Yellowing Clear Film',
        glareOrStainReduction: 'Scratch & Fingerprint Guard',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Lift and elevator panels, stainless steel appliances, cladding and door frames.',
        previewTintOpacity: 'opacity-90',
      },
    ],
    estimatorTitle: 'Surface Coverage Estimator',
    estimatorOptions: [
      {
        id: 'table-set',
        label: 'Dining Table or Majlis Coffee Table Set',
        duration: '60 – 90 Mins',
        coverage: 'Full Tabletop + Wrapped or Trimmed Edges',
        popularFilm: 'Self-Healing Optical TPU',
        benefitSummary: 'Serve coffee and host dinners without worrying about rings or scratches.',
      },
      {
        id: 'kitchen',
        label: 'Kitchen Island, Countertops & Backsplash',
        duration: '2 – 4 Hours',
        coverage: 'Island Slab, Prep Counters & Sink Cutouts',
        popularFilm: 'Gloss or Matte Stone Film',
        benefitSummary: 'Defense against cooking oils, turmeric, lemon juice and knife slips.',
      },
      {
        id: 'commercial-surfaces',
        label: 'Hotel, Office or Building Surfaces',
        duration: AFTER_SITE_VISIT,
        coverage: 'Reception Counters, Lift Panels, Stainless Steel & Joinery',
        popularFilm: 'Matched Per Surface',
        benefitSummary: 'Keeps high-traffic public surfaces looking new between refurbishments.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Surface Cleaning & Inspection',
        desc: 'We deep-clean and degrease the surface so it is completely free of oil and dust.',
        color: 'bg-[#f45b9a]',
      },
      {
        step: '02',
        title: 'Custom Sizing & Cutouts',
        desc: 'Film is laid out in large single pieces and cut around sinks, taps, handles and edges.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Bubble-Free Bonding',
        desc: 'Soft squeegees bond the film to the surface without air bubbles or distortion.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Precision Edge Finishing',
        desc: 'Edges are trimmed and finished so the film is barely visible to the eye or touch.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Lemon, Vinegar & Acid Etching',
        exoticTint: 'Physical Barrier Over the Stone',
        standardOption: 'Liquid Sealers Still Etch',
      },
      {
        feature: 'Scratches',
        exoticTint: 'Self-Healing Protective Layer',
        standardOption: 'No Scratch Protection',
      },
      {
        feature: 'Metal, Wood & Furniture',
        exoticTint: 'One Film Family for All Surfaces',
        standardOption: 'Different Products per Material',
      },
      {
        feature: 'Ongoing Maintenance',
        exoticTint: 'No Re-Sealing — Replace Film if Needed',
        standardOption: 'Frequent Re-Sealing or Refinishing',
      },
    ],
    faqs: [
      {
        q: 'Will the film change the look of my marble or wood?',
        a: 'The film is optically clear and comes in high-gloss (for polished surfaces) and satin-matte (for honed stone, brushed metal and natural wood) so it matches the original finish.',
      },
      {
        q: 'Can it be used on stainless steel and lift panels?',
        a: 'Yes. We protect stainless steel appliances, lift and elevator panels, door frames and cladding against scratches and fingerprints. Film choice and warranty are confirmed after we see the surface.',
      },
    ],
    clientReview: {
      name: 'Debra Reyes',
      role: 'Verified Surface Protection & Nano Coating Client · Qatar',
      quote:
        'Their nano coating for sofa and marble protection services are incredible. My furniture and surfaces look brand new, thanks to nano coating Qatar from Exotic Tint Qatar.',
    },
  },

  // ---------------------------------------------------------------- 03
  {
    slug: 'frosted-decorative-film',
    id: 'Frosted & Decorative Film',
    num: '03',
    category: 'glass-film',
    badge: 'PRIVACY · CUSTOM DESIGNS',
    shortTitle: 'Frosted & Decorative',
    title: 'Frosted & Decorative Film',
    seoHeadline: 'Frosted & Decorative Window Film Qatar – Privacy & Custom Designs',
    heroSubheadline:
      'Frosted glass privacy, decorative patterns and custom-cut logos for office partitions, doors, bathrooms and villa entrances.',
    desc: 'Frosted and decorative window film for privacy and style: frosted glass finishes, privacy bands, patterns and custom-cut logos for offices and homes in Qatar.',
    longDescription:
      'Frosted and decorative film gives glass the look of sandblasted or etched glass at a fraction of the cost — and it can be changed or removed cleanly later. Exotic Tint Qatar installs full frosted finishes, privacy bands, geometric and Arabic motifs, and computer-cut company logos on meeting rooms, glass partitions, doors, shower screens and villa entrances across Qatar.',
    bgClass: 'bg-[#fbbf24]',
    accentHex: '#fbbf24',
    image: ASSETS.services.frostedFilm,
    alt: 'Frosted and decorative film on glass partitions in Qatar',
    keyStats: [
      { label: 'Visual Privacy', value: '24/7 Privacy', sub: 'Day & Night Opacity' },
      { label: 'Natural Light', value: 'Soft Diffused', sub: 'Rooms Stay Bright' },
      { label: 'Custom Designs', value: 'CNC Cut', sub: 'Logos, Patterns & Bands' },
      { label: 'Applications', value: 'Home & Office', sub: 'Partitions, Doors & Showers' },
    ],
    benefitsList: [
      'Company logos, geometric stripes and Arabic or modern motifs',
      'Privacy day and night without darkening corridors or meeting rooms',
      'Affordable, removable alternative to sandblasted or acid-etched glass',
      'For boardrooms, clinics, salons, bathrooms and villa entrances',
    ],
    simulatorTitle: 'Frosted & Decorative Style Preview',
    simulatorSubtitle: 'Choose a style to see how we customize glass for offices and villas.',
    specLabels: ['Light', 'UV Defense', 'Privacy', 'Warranty'],
    simulatorOptions: [
      {
        id: 'cnc-geometric',
        label: 'Custom Geometric & Arabic Motifs',
        vltOrFinish: 'Precision Plotter-Cut Pattern',
        irRejection: 'Diffused Light',
        uvBlock: '98% UV',
        glareOrStainReduction: 'Custom Privacy Zones',
        warranty: '10-Year Interior Warranty',
        bestFor: 'Majlis doors, reception lobbies and boutique storefronts.',
        previewTintOpacity: 'opacity-85',
      },
      {
        id: 'corporate-logo',
        label: 'Corporate Logo & Privacy Bands',
        vltOrFinish: 'Eye-Level Band + Cut-Out Logo',
        irRejection: 'Diffused Light',
        uvBlock: '98% UV',
        glareOrStainReduction: 'Eye-Level Privacy',
        warranty: '10-Year Interior Warranty',
        bestFor: 'Conference rooms, glass offices and glass safety markings.',
        previewTintOpacity: 'opacity-75',
      },
      {
        id: 'full-frost',
        label: 'Full-Height Matte Frost',
        vltOrFinish: 'Frosted Etched-Glass Look',
        irRejection: 'Diffused Light',
        uvBlock: '99% UV',
        glareOrStainReduction: 'Full 24/7 Privacy',
        warranty: '10-Year Warranty',
        bestFor: 'Clinics, salons, bathrooms and private office suites.',
        previewTintOpacity: 'opacity-50',
      },
    ],
    estimatorTitle: 'Frosted Film Design & Installation Estimator',
    estimatorOptions: [
      {
        id: 'home-panels',
        label: 'Home Doors, Bathrooms & Partitions (1–5 Panels)',
        duration: '2 – 3 Hours',
        coverage: 'Full Frost or Pattern Cut to Exact Glass Size',
        popularFilm: 'Matte Etched-Glass Film',
        benefitSummary: 'Instant privacy that still lets soft daylight into the room.',
      },
      {
        id: 'office-partitions',
        label: 'Office Partitions & Meeting Rooms (5–20 Panels)',
        duration: '4 – 6 Hours (Same Day)',
        coverage: 'Custom Design + Plotter Cutting + On-Site Application',
        popularFilm: 'Custom Branded Frosted Film',
        benefitSummary: 'Office branding plus distraction-free privacy for your team.',
      },
      {
        id: 'fit-out',
        label: 'Full Fit-Out, Clinic or Retail Space (20+ Panels)',
        duration: '1 – 2 Days',
        coverage: 'Mock-Ups, Plotting & Multi-Floor Installation',
        popularFilm: 'Architectural Frosted & Decorative Series',
        benefitSummary: 'Fast turnaround for designers, contractors and business owners.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Measurement & Digital Mock-Up',
        desc: 'Send your logo or pick a pattern — we prepare a preview scaled to your glass.',
        color: 'bg-[#fbbf24]',
      },
      {
        step: '02',
        title: 'Precision Plotter Cutting',
        desc: 'Your design is computer-cut on architectural frosted film with sharp, clean edges.',
        color: 'bg-[#f27438]',
      },
      {
        step: '03',
        title: 'Aligned On-Site Application',
        desc: 'Bands and logos are laser-aligned across multiple glass panels.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Finishing & Handover',
        desc: 'Application tape is removed to reveal a crisp, bubble-free finish ready to use.',
        color: 'bg-[#d9f941]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Cost vs. Etched Glass',
        exoticTint: 'Far More Affordable',
        standardOption: 'Expensive Glass Replacement',
      },
      {
        feature: 'Future Changes / Rebranding',
        exoticTint: 'Removable Without Damage',
        standardOption: 'Permanent — Glass Must Be Replaced',
      },
      {
        feature: 'Logos & Fine Detail',
        exoticTint: 'Computer-Cut Precision',
        standardOption: 'Limited Stencil Detail',
      },
      {
        feature: 'Installation',
        exoticTint: 'Applied In Place, No Dust',
        standardOption: 'Glass Doors Removed & Sent Out',
      },
    ],
    faqs: [
      {
        q: 'Can you cut our company logo or Arabic calligraphy into the film?',
        a: 'Yes. We cut vector logos, bilingual English/Arabic text and geometric patterns from your artwork, and show you a mock-up before cutting.',
      },
      {
        q: 'Does frosted film block light completely?',
        a: 'No. Frosted film blocks the view for privacy while still letting soft, diffused daylight through.',
      },
    ],
    clientReview: {
      name: 'Miranda Snyder',
      role: 'Verified Frosted Film Client · Doha',
      quote:
        'Exotic Tint Qatar provided excellent commercial window tinting in Doha. The frosted window film designs are perfect for our office, and the heat reduction is amazing!',
    },
  },

  // ---------------------------------------------------------------- 04
  {
    slug: 'fabric-nano-coating',
    id: 'Fabric Nano Coating',
    num: '04',
    category: 'surface-interior',
    badge: 'WATER & STAIN PROTECTION',
    shortTitle: 'Fabric Nano Coating',
    title: 'Fabric Nano Coating',
    seoHeadline: 'Fabric Nano Coating Qatar – Water & Stain Protection for Sofas & Carpets',
    heroSubheadline:
      'Invisible water and stain protection for sofas, Majlis seating, dining chairs, curtains and carpets — spills bead up and wipe away.',
    desc: 'Fabric nano coating for sofas, Majlis seating, chairs, curtains and carpets in Qatar: invisible water, stain and surface protection applied at your home.',
    longDescription:
      'Light-coloured sofas, Majlis seating, velvet chairs and fine carpets are the centrepiece of Qatar homes — and one cup of coffee or juice can leave a permanent stain. Exotic Tint Qatar applies an invisible, breathable nano coating to the fibres of your fabrics at your home. Liquids sit on the surface as droplets instead of soaking in, so you can blot them away.',
    bgClass: 'bg-[#a78bfa]',
    accentHex: '#a78bfa',
    image: ASSETS.services.fabricNanoCoating,
    alt: 'Water beading on a nano-coated sofa fabric',
    keyStats: [
      { label: 'Liquid Repellency', value: 'Hydrophobic', sub: 'Spills Bead Up' },
      { label: 'Fabric Feel & Colour', value: 'Unchanged', sub: 'No Stiffness or Odour' },
      { label: 'Family Safety', value: 'Non-Toxic', sub: 'Safe Once Cured' },
      { label: 'Service Location', value: 'At Your Home', sub: 'Applied On-Site' },
    ],
    benefitsList: [
      'For sofas, Majlis seating, dining chairs, headboards and curtains',
      'Protects rugs, silk carpets and wall-to-wall carpeting',
      'Helps prevent liquid absorption, oil stains and colour fading',
      'Invisible, breathable and odourless once cured',
    ],
    simulatorTitle: 'Fabric Nano-Shield Selector',
    simulatorSubtitle: 'Select your furniture or carpet type to see how the coating performs.',
    specLabels: ['Fibre Bond', 'Colour Care', 'Protection', 'Protection Life'],
    simulatorOptions: [
      {
        id: 'sofa-majlis',
        label: 'Sofas & Majlis Seating (Linen / Bouclé / Velvet)',
        vltOrFinish: 'Invisible & Soft to Touch',
        irRejection: 'Breathable Fibre Bond',
        uvBlock: 'UV Colour-Lock Shield',
        glareOrStainReduction: 'Repels Coffee, Tea, Juice & Oil',
        warranty: 'Up to 2–3 Years Protection',
        bestFor: 'Cream and white sofas, Majlis suites and dining chairs.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'carpets',
        label: 'Silk, Wool & Hand-Tufted Carpets',
        vltOrFinish: 'Keeps Natural Sheen & Pile',
        irRejection: 'Anti-Dust & Anti-Soil',
        uvBlock: 'Helps Prevent Sun Fading',
        glareOrStainReduction: 'Stops Deep Pile Staining',
        warranty: 'Up to 3 Years Protection',
        bestFor: 'Area rugs, Majlis carpets and hallway runners.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'curtains-headboards',
        label: 'Curtains, Headboards & Cushions',
        vltOrFinish: 'No Change to Drape or Colour',
        irRejection: 'Breathable Fibre Bond',
        uvBlock: 'UV Colour-Lock Shield',
        glareOrStainReduction: 'Water & Stain Resistant',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Bedroom headboards, scatter cushions and fabric curtains.',
        previewTintOpacity: 'opacity-90',
      },
    ],
    estimatorTitle: 'Sofa & Carpet Nano Coating Estimator',
    estimatorOptions: [
      {
        id: 'sofa-set',
        label: 'Living Room Sofa Set (L-Shape or 3+2+1)',
        duration: '60 – 90 Mins (At Your Home)',
        coverage: 'Cushions, Armrests, Backrests & Pillows',
        popularFilm: 'Textile Nano-Shield',
        benefitSummary: 'Ready to use within hours — spills blot off with a napkin.',
      },
      {
        id: 'majlis-carpet',
        label: 'Full Majlis Suite + Large Carpet',
        duration: '2 – 3 Hours',
        coverage: 'Majlis Seating + Dining Chairs + Area Rugs',
        popularFilm: 'Water & Oil Repellent Formula',
        benefitSummary: 'Ideal before Ramadan, Eid or family gatherings.',
      },
      {
        id: 'whole-villa',
        label: 'Whole Villa Upholstery & Carpets',
        duration: '3 – 5 Hours',
        coverage: 'Sofas, Majlis, Chairs, Beds, Curtains & Carpets',
        popularFilm: 'Complete Home Textile Protection',
        benefitSummary: 'Peace of mind for families with children, guests and pets.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Vacuum & Fibre Preparation',
        desc: 'We remove dust and lint so the coating bonds directly to clean fibres.',
        color: 'bg-[#a78bfa]',
      },
      {
        step: '02',
        title: 'Even Nano-Mist Application',
        desc: 'A fine, even mist is applied across cushions, seams and carpet pile.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '03',
        title: 'Curing',
        desc: 'The coating bonds to the fibres without stiffening or changing the colour.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '04',
        title: 'Live Water-Bead Test',
        desc: 'We test the droplet effect in front of you so you can see liquids roll off.',
        color: 'bg-[#4fd1c5]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Coffee, Tea & Juice Spills',
        exoticTint: 'Beads Up — Blots Off Cleanly',
        standardOption: 'Soaks Into the Fabric',
      },
      {
        feature: 'Fabric Feel',
        exoticTint: 'Unchanged & Breathable',
        standardOption: 'Plastic Covers Ruin Comfort',
      },
      {
        feature: 'Convenience',
        exoticTint: 'Applied At Your Home',
        standardOption: 'Furniture Sent Out',
      },
    ],
    faqs: [
      {
        q: 'Will nano coating change the colour or softness of my sofa?',
        a: 'No. The coating is invisible, odour-free once cured, and leaves fabrics feeling natural.',
      },
      {
        q: 'How do I clean a spill after coating?',
        a: 'Touch a dry paper towel or cloth to the droplets — the liquid wicks into the towel instead of the fabric.',
      },
    ],
    clientReview: {
      name: 'Debra Reyes',
      role: 'Verified Nano Coating Client · Qatar',
      quote:
        'Their nano coating for sofa and marble protection services are incredible. My furniture and surfaces look brand new, thanks to nano coating Qatar from Exotic Tint Qatar.',
    },
  },

  // ---------------------------------------------------------------- 05 (new)
  {
    slug: 'wallpaper-wall-finishing',
    id: 'Wallpaper & Wall Finishing',
    num: '05',
    category: 'surface-interior',
    badge: 'PREMIUM WALLPAPER',
    shortTitle: 'Wallpaper & Walls',
    title: 'Wallpaper & Wall Finishing',
    seoHeadline: 'Wallpaper Installation Qatar – Premium Wallpaper & Decorative Walls',
    heroSubheadline:
      'Premium wallpaper and decorative wall solutions for villas, Majlis rooms, bedrooms, offices and hospitality spaces.',
    desc: 'Premium wallpaper supply and installation and decorative wall finishing for homes, Majlis rooms, offices and hotels across Qatar.',
    longDescription:
      'A finished wall changes a whole room. Exotic Tint Qatar supplies and installs premium wallpaper and decorative wall solutions — feature walls, full-room wallpaper, textured and patterned finishes — for villas, apartments, Majlis rooms, offices, clinics and hospitality spaces. We prepare the walls, match patterns across seams and leave clean, straight edges at ceilings, skirting and sockets.',
    bgClass: 'bg-[#6ee7b7]',
    accentHex: '#6ee7b7',
    image: ASSETS.services.wallpaper,
    alt: 'Wallpaper & Wall Finishing by Exotic Tint Qatar',
    keyStats: [
      { label: 'Styles', value: 'Patterned & Textured', sub: 'Feature or Full-Room' },
      { label: 'Spaces', value: 'Homes & Business', sub: 'Villas, Majlis, Offices' },
      { label: 'Finish', value: 'Pattern-Matched', sub: 'Clean, Aligned Seams' },
      { label: 'Service', value: 'Supply & Install', sub: 'Wall Prep Included' },
    ],
    benefitsList: [
      'Premium wallpaper for feature walls, bedrooms, Majlis rooms and living areas',
      'Decorative wall solutions for offices, clinics, showrooms and hotels',
      'Wall preparation before installation for a smooth, lasting finish',
      'Patterns matched across seams with clean edges at ceilings and skirting',
    ],
    simulatorTitle: 'Wall Finish Selector',
    simulatorSubtitle: 'Choose the type of wall finish you are planning.',
    specLabels: ['Look', 'Best Rooms', 'Finish', 'Warranty'],
    simulatorOptions: [
      {
        id: 'feature-wall',
        label: 'Feature Wall Wallpaper',
        vltOrFinish: 'Statement Pattern or Texture',
        irRejection: 'Bold Accent',
        uvBlock: 'Living, Majlis, Bedroom',
        glareOrStainReduction: 'Pattern-Matched Seams',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'One statement wall behind a sofa, bed or TV, or in a Majlis.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'full-room',
        label: 'Full-Room Wallpaper',
        vltOrFinish: 'Continuous Wall Finish',
        irRejection: 'Complete Room Look',
        uvBlock: 'Bedrooms, Dressing Rooms, Offices',
        glareOrStainReduction: 'Clean Edges & Corners',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Bedrooms, dressing rooms, private offices and hotel rooms.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'decorative-commercial',
        label: 'Decorative Walls for Business Spaces',
        vltOrFinish: 'Branded or Textured Finish',
        irRejection: 'Professional Interior',
        uvBlock: 'Offices, Clinics, Showrooms',
        glareOrStainReduction: 'Durable Commercial Finish',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Receptions, corridors, meeting rooms and retail interiors.',
        previewTintOpacity: 'opacity-85',
      },
    ],
    estimatorTitle: 'Wallpaper Project Estimator',
    estimatorOptions: [
      {
        id: 'single-wall',
        label: 'Single Feature Wall',
        duration: AFTER_SITE_VISIT,
        coverage: 'One Wall Including Preparation',
        popularFilm: 'Premium Patterned Wallpaper',
        benefitSummary: 'The quickest way to transform a room.',
      },
      {
        id: 'rooms',
        label: 'One or More Full Rooms',
        duration: AFTER_SITE_VISIT,
        coverage: 'All Walls in the Selected Rooms',
        popularFilm: 'Premium Wallpaper Collection',
        benefitSummary: 'A complete, consistent finish room by room.',
      },
      {
        id: 'commercial-walls',
        label: 'Office, Clinic or Hospitality Project',
        duration: 'Scheduled Around Your Business',
        coverage: 'Receptions, Corridors & Rooms',
        popularFilm: 'Commercial-Grade Wall Finishes',
        benefitSummary: 'Phased installation to keep your space open.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Site Visit & Selection',
        desc: 'We measure your walls and help you choose a wallpaper or decorative finish.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '02',
        title: 'Wall Preparation',
        desc: 'Walls are checked, repaired and primed so the finish sits smooth and lasts.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Precise Installation',
        desc: 'Panels are hung plumb with patterns matched across every seam.',
        color: 'bg-[#f27438]',
      },
      {
        step: '04',
        title: 'Clean Finish & Handover',
        desc: 'Edges are trimmed at ceilings, skirting and sockets and the room is left clean.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Design Choice',
        exoticTint: 'Patterns, Textures & Feature Walls',
        standardOption: 'Plain Paint Colours',
      },
      {
        feature: 'Seams & Edges',
        exoticTint: 'Pattern-Matched, Clean Edges',
        standardOption: 'Visible Joins & Misalignment',
      },
      {
        feature: 'Wall Preparation',
        exoticTint: 'Included Before Installation',
        standardOption: 'Paper Hung Over Imperfections',
      },
    ],
    faqs: [
      {
        q: 'Do you supply the wallpaper or only install it?',
        a: 'Both. We can supply premium wallpaper and decorative finishes, or install a wallpaper you have already chosen. We confirm everything in your quote after the site visit.',
      },
      {
        q: 'Is wallpaper suitable for Qatar’s climate?',
        a: 'Yes, when the right product and wall preparation are used. We check the walls during the site visit and recommend products suited to the room.',
      },
    ],
  },

  // ---------------------------------------------------------------- 06 (new)
  {
    slug: 'smart-film',
    id: 'Smart Film',
    num: '06',
    category: 'glass-film',
    badge: 'SWITCHABLE PRIVACY GLASS',
    shortTitle: 'Smart Film',
    title: 'Smart Film',
    seoHeadline: 'Smart Film Qatar – Switchable Privacy Glass Film',
    heroSubheadline:
      'Switch your glass from clear to frosted at the touch of a button — instant privacy for meeting rooms, offices, clinics, bathrooms and villas.',
    desc: 'Smart film (switchable privacy glass film) for offices, clinics and homes in Qatar: turn existing glass from clear to frosted on demand.',
    longDescription:
      'Smart film is a switchable privacy film applied to existing glass. With the power on, the glass is clear; switch it off and the glass turns frosted for instant privacy. Exotic Tint Qatar supplies and installs smart film for meeting rooms, executive offices, clinics, bathrooms, villa partitions and storefronts, including the power supply and switch or remote control, so you get the effect of switchable glass without replacing your glass.',
    bgClass: 'bg-[#d9f941]',
    accentHex: '#d9f941',
    image: ASSETS.services.smartFilm,
    alt: 'Smart Film switchable privacy glass by Exotic Tint Qatar',
    keyStats: [
      { label: 'Privacy', value: 'On Demand', sub: 'Clear ↔ Frosted' },
      { label: 'Control', value: 'Switch or Remote', sub: 'Chosen per Project' },
      { label: 'Installation', value: 'On Existing Glass', sub: 'No Glass Replacement' },
      { label: 'Applications', value: 'Office & Home', sub: 'Meeting Rooms, Clinics, Villas' },
    ],
    benefitsList: [
      'Clear glass when you want openness, frosted glass when you need privacy',
      'Applied to existing glass partitions, doors and windows',
      'Ideal for meeting rooms, executive offices, clinics and bathrooms',
      'Supplied with power supply and switch or remote control',
    ],
    simulatorTitle: 'Smart Film Application Selector',
    simulatorSubtitle: 'Pick where you want switchable privacy.',
    specLabels: ['Mode', 'Control', 'Privacy', 'Warranty'],
    simulatorOptions: [
      {
        id: 'meeting-room',
        label: 'Meeting Rooms & Glass Offices',
        vltOrFinish: 'Clear When On · Frosted When Off',
        irRejection: 'Clear ↔ Frosted',
        uvBlock: 'Wall Switch or Remote',
        glareOrStainReduction: 'Privacy On Demand',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Boardrooms, executive offices and glass-walled meeting rooms.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'clinic-bathroom',
        label: 'Clinics, Bathrooms & Private Rooms',
        vltOrFinish: 'Clear When On · Frosted When Off',
        irRejection: 'Clear ↔ Frosted',
        uvBlock: 'Wall Switch or Remote',
        glareOrStainReduction: 'Privacy On Demand',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Consultation rooms, bathroom glass and dressing rooms.',
        previewTintOpacity: 'opacity-70',
      },
      {
        id: 'storefront',
        label: 'Storefronts & Display Glass',
        vltOrFinish: 'Clear When On · Frosted When Off',
        irRejection: 'Clear ↔ Frosted',
        uvBlock: 'Switch, Remote or Timer',
        glareOrStainReduction: 'Hide or Reveal Displays',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Shop windows and display glass that open or close the view.',
        previewTintOpacity: 'opacity-80',
      },
    ],
    estimatorTitle: 'Smart Film Project Estimator',
    estimatorOptions: [
      {
        id: 'single-room',
        label: 'Single Room or Partition',
        duration: AFTER_SITE_VISIT,
        coverage: 'Glass Panels + Power Supply + Control',
        popularFilm: 'Self-Adhesive Smart Film',
        benefitSummary: 'Switchable privacy without replacing your glass.',
      },
      {
        id: 'multi-room',
        label: 'Several Rooms or a Full Office Floor',
        duration: AFTER_SITE_VISIT,
        coverage: 'Multiple Partitions with Individual Controls',
        popularFilm: 'Self-Adhesive Smart Film',
        benefitSummary: 'Each room controlled separately.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Site Survey & Power Check',
        desc: 'We measure the glass and plan the power supply route and control position.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '02',
        title: 'Made-to-Measure Film',
        desc: 'Smart film panels are prepared to the exact size of each glass panel.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '03',
        title: 'Installation & Wiring',
        desc: 'Film is applied to the glass and connected to the power supply and controls.',
        color: 'bg-[#f27438]',
      },
      {
        step: '04',
        title: 'Testing & Handover',
        desc: 'We test the clear and frosted modes with you and explain the controls.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Privacy Control',
        exoticTint: 'Clear or Frosted at a Switch',
        standardOption: 'Blinds or Permanent Frosting',
      },
      {
        feature: 'Existing Glass',
        exoticTint: 'Applied to Your Current Glass',
        standardOption: 'Switchable Glass Needs Replacement',
      },
      {
        feature: 'Look',
        exoticTint: 'Clean Glass, No Blinds',
        standardOption: 'Blinds Collect Dust',
      },
    ],
    faqs: [
      {
        q: 'How does smart film work?',
        a: 'When powered, the film is clear. When the power is switched off, it turns frosted and blocks the view. You control it with a switch or remote.',
      },
      {
        q: 'Does smart film need electrical work?',
        a: 'Yes — each installation needs a power supply and a control. We plan this during the site survey and include it in your quote.',
      },
    ],
  },

  // ---------------------------------------------------------------- 07 (new)
  {
    slug: 'safety-security-film',
    id: 'Safety & Security Film',
    num: '07',
    category: 'glass-film',
    badge: 'SHATTER PROTECTION',
    shortTitle: 'Safety & Security',
    title: 'Safety & Security Film',
    seoHeadline: 'Safety & Security Window Film Qatar – Glass Shatter Protection',
    heroSubheadline:
      'Glass safety film that holds broken glass together — reducing injury risk and making windows harder to break through.',
    desc: 'Safety and security window film for homes, schools, offices and shops in Qatar: holds shattered glass together and helps protect against break-ins.',
    longDescription:
      'Broken glass is dangerous. Safety and security film is a strong, clear film bonded to the inside of your glass. If the glass breaks, the film helps hold the pieces together instead of letting sharp shards fall, and it makes windows and doors harder to break through. Exotic Tint Qatar installs safety and security film for villas, schools, nurseries, offices, clinics, showrooms and shops across Qatar.',
    bgClass: 'bg-[#049adb]',
    accentHex: '#049adb',
    image: ASSETS.services.safetyFilm,
    alt: 'Safety & Security Film by Exotic Tint Qatar',
    keyStats: [
      { label: 'Glass Retention', value: 'Holds Shards', sub: 'If the Glass Breaks' },
      { label: 'Security', value: 'Harder to Break In', sub: 'Delays Forced Entry' },
      { label: 'Appearance', value: 'Clear', sub: 'Or Combined with Sun Control' },
      { label: 'Applications', value: 'Homes & Business', sub: 'Schools, Shops, Offices' },
    ],
    benefitsList: [
      'Helps hold broken glass together to reduce injury risk',
      'Makes windows, doors and shopfronts harder to break through',
      'Clear film that keeps your view, or combined with sun control',
      'For villas, schools, nurseries, offices, clinics and retail',
    ],
    simulatorTitle: 'Safety Film Grade Selector',
    simulatorSubtitle: 'Choose the protection level that fits your building.',
    specLabels: ['Purpose', 'Appearance', 'Protection', 'Warranty'],
    simulatorOptions: [
      {
        id: 'safety',
        label: 'Clear Safety Film',
        vltOrFinish: 'Clear, Keeps the View',
        irRejection: 'Injury Risk Reduction',
        uvBlock: 'Clear Glass Look',
        glareOrStainReduction: 'Holds Broken Glass',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Homes, schools, nurseries and glass doors in busy areas.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'security',
        label: 'Heavy-Duty Security Film',
        vltOrFinish: 'Clear, Thicker Film',
        irRejection: 'Break-In Resistance',
        uvBlock: 'Clear Glass Look',
        glareOrStainReduction: 'Delays Forced Entry',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Ground-floor windows, shopfronts, showrooms and offices.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'safety-solar',
        label: 'Safety Film with Sun Control',
        vltOrFinish: 'Tinted Safety Film',
        irRejection: 'Safety + Heat Control',
        uvBlock: 'Tinted Glass Look',
        glareOrStainReduction: 'Holds Glass, Cuts Glare',
        warranty: QUOTE_CONFIRMED,
        bestFor: 'Sun-facing glass that also needs safety protection.',
        previewTintOpacity: 'opacity-75',
      },
    ],
    estimatorTitle: 'Safety Film Project Estimator',
    estimatorOptions: [
      {
        id: 'home',
        label: 'Villa or Apartment',
        duration: AFTER_SITE_VISIT,
        coverage: 'Ground-Floor Windows, Glass Doors & Balustrades',
        popularFilm: 'Clear Safety Film',
        benefitSummary: 'Safer glass for children and family members.',
      },
      {
        id: 'business',
        label: 'Shop, Office, School or Clinic',
        duration: 'Scheduled Around Your Hours',
        coverage: 'Shopfronts, Entrances & Internal Glass',
        popularFilm: 'Heavy-Duty Security Film',
        benefitSummary: 'Protection for staff, visitors and stock.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Glass Survey',
        desc: 'We check each pane and recommend the right safety or security grade.',
        color: 'bg-[#049adb]',
      },
      {
        step: '02',
        title: 'Glass Cleaning',
        desc: 'Glass is deep-cleaned so the film bonds fully across the surface.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Film Installation',
        desc: 'The film is applied edge to edge on the inside of the glass.',
        color: 'bg-[#f27438]',
      },
      {
        step: '04',
        title: 'Inspection & Handover',
        desc: 'Every pane is inspected and care instructions are handed over.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'If the Glass Breaks',
        exoticTint: 'Film Helps Hold Pieces Together',
        standardOption: 'Sharp Shards Fall Loose',
      },
      {
        feature: 'Break-In Attempts',
        exoticTint: 'Harder and Slower to Get Through',
        standardOption: 'Glass Breaks Quickly',
      },
      {
        feature: 'Cost vs. Replacing Glass',
        exoticTint: 'Upgrades Existing Glass',
        standardOption: 'Laminated Glass Replacement',
      },
    ],
    faqs: [
      {
        q: 'Does safety film make glass unbreakable?',
        a: 'No. Safety and security film does not stop glass from breaking — it helps hold the broken glass together and makes it harder and slower to break through.',
      },
      {
        q: 'Can safety film also reduce heat?',
        a: 'Yes. Tinted safety films combine shatter protection with sun control. We recommend the right option during the glass survey.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return ALL_SERVICES.find((service) => service.slug === slug);
}
