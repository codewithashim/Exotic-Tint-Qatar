import { ASSETS } from '@/config/assets';

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

export interface ServiceDetail {
  slug: string;
  id: string;
  num: string;
  category: 'window-tinting' | 'surface-protection';
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
  clientReview: {
    name: string;
    role: string;
    quote: string;
  };
}

export const ALL_SERVICES: ServiceDetail[] = [
  {
    slug: 'automotive-window-tinting',
    id: 'Automotive Window Tinting',
    num: '01',
    category: 'window-tinting',
    badge: 'MOBILE & HOME SERVICE',
    shortTitle: 'Automotive Tinting',
    title: 'Automotive Window Tinting',
    seoHeadline: 'Car Window Tinting Qatar – Mobile & Studio Nano-Ceramic Tint',
    heroSubheadline:
      'Beat 50°C Doha summers with 96% infrared heat rejection, 99% UV protection, and convenient mobile home garage installation.',
    desc: 'Our car window tinting Qatar services provide premium heat rejection, UV protection, and privacy. We offer mobile car tinting services and car window tinting home service for convenience.',
    longDescription:
      'At Exotic Tint Qatar, our automotive window tinting service is engineered specifically for the extreme solar heat of Doha, Lusail, Al Rayyan, and Wakra. Using multi-layer nano-ceramic technology, our films block up to 96% of infrared heat and 99.9% of harmful UV rays without interfering with 5G mobile signals, GPS navigation, or keyless entry. Choose between visiting our dust-controlled Doha studio or booking our mobile car tinting home service right inside your private garage.',
    bgClass: 'bg-[#f27438]',
    accentHex: '#f27438',
    image: ASSETS.services.automotive,
    alt: 'Automotive Window Tinting – Car window tinting Qatar',
    keyStats: [
      { label: 'Infrared Heat Rejection', value: 'Up to 96%', sub: 'Nano-Ceramic IR Barrier' },
      { label: 'Ultraviolet Defense', value: '99.9% UV', sub: 'Protects Leather & Skin' },
      { label: 'Signal Clarity', value: '100% Safe', sub: 'Zero GPS / 5G Interference' },
      { label: 'Installation Mode', value: 'Home / Studio', sub: 'Mobile Garage Service' },
    ],
    benefitsList: [
      'Mobile car tinting services & car window tinting home service across Qatar',
      'Qatar Traffic Department (Moroor) compliant VLT shades available',
      'Optical clarity for safe night driving with zero haze or purple bubbling',
      'Shatter-resistant safety layer holds glass together upon impact',
    ],
    simulatorTitle: 'Interactive Car Tint VLT & Heat Simulator',
    simulatorSubtitle:
      'Select a tint shade below to compare heat rejection, daytime privacy, and Qatar compliance.',
    simulatorOptions: [
      {
        id: 'ceramic-70',
        label: '70% VLT Clear Ceramic (Windshield)',
        vltOrFinish: '70% Visible Light',
        irRejection: '92% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '30% Glare Cut',
        warranty: '10-Year Warranty',
        bestFor: 'Front windshields & maximum night visibility with full heat rejection.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'ceramic-35',
        label: '35% VLT Qatar Legal Executive',
        vltOrFinish: '35% Visible Light',
        irRejection: '95% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '62% Glare Cut',
        warranty: '10-Year Warranty',
        bestFor: 'Front & side windows — balanced privacy, cool cabin, and traffic compliance.',
        previewTintOpacity: 'opacity-80',
      },
      {
        id: 'ceramic-20',
        label: '20% VLT Factory Privacy Dark',
        vltOrFinish: '20% Visible Light',
        irRejection: '96% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '78% Glare Cut',
        warranty: '10-Year Warranty',
        bestFor: 'Rear passenger windows & SUVs needing high daytime privacy.',
        previewTintOpacity: 'opacity-65',
      },
      {
        id: 'ceramic-05',
        label: '05% VLT VIP Limo Blackout',
        vltOrFinish: '05% Visible Light',
        irRejection: '98% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '94% Glare Cut',
        warranty: '10-Year Warranty',
        bestFor: 'Rear VIP cabins & commercial fleet vehicles requiring maximum privacy.',
        previewTintOpacity: 'opacity-45',
      },
    ],
    estimatorTitle: 'Smart Vehicle Coverage & Time Estimator',
    estimatorOptions: [
      {
        id: 'sedan-coupe',
        label: 'Luxury Sedan / Sports Coupe',
        duration: '90 – 120 Mins',
        coverage: 'All Side Windows + Rear Windshield (Optional Front Shield)',
        popularFilm: 'Nano-Ceramic 96% IR Series',
        benefitSummary: 'Drops cabin temperature by up to 14°C when parked in Doha sun.',
      },
      {
        id: 'suv-4x4',
        label: 'Full-Size SUV (Land Cruiser / Patrol / Range Rover)',
        duration: '120 – 150 Mins',
        coverage: 'Full 7-Seater Glass + Panoramic Sunroof Heat Shield',
        popularFilm: 'Multi-Layer Ceramic Extreme',
        benefitSummary: 'Keeps rear AC zones ice-cold for family passengers across Qatar.',
      },
      {
        id: 'supercar',
        label: 'Exotic Supercar (911 / Ferrari / McLaren / Urus)',
        duration: '150 – 180 Mins',
        coverage: 'Micro-Edged Frameless Glass + Engine Bay / Cabin UV Shield',
        popularFilm: 'Ultra-Clear 96% IR Ceramic',
        benefitSummary: 'Preserves Alcantara & carbon-fiber interiors with mobile garage install.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Dust-Free Glass Decontamination',
        desc: 'We deep-clean and clay-bar every window pane in your home garage or our studio to ensure zero dust specks.',
        color: 'bg-[#f27438]',
      },
      {
        step: '02',
        title: 'Computer Plotter & Micro-Edge Cut',
        desc: 'Patterns are precision-cut to match your exact vehicle make and model without touching your car’s rubber seals.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Thermal Contour Heat Shrinking',
        desc: 'Our master technicians heat-form the nano-ceramic film to fit curved windshields with a seamless factory look.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Optical Inspection & Warranty',
        desc: 'Final squeegee extraction, edge sealing, and issuance of your Exotic Tint Qatar warranty against peeling or fading.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Infrared Solar Heat Rejection',
        exoticTint: 'Up to 96% IR Blocked',
        standardOption: '15% – 25% IR Blocked',
      },
      {
        feature: 'UV Ray Protection',
        exoticTint: '99.9% UV Defense',
        standardOption: '40% – 60% UV',
      },
      {
        feature: 'Mobile Home Garage Service',
        exoticTint: 'Included Across Qatar',
        standardOption: 'Shop Drop-Off Only',
      },
      {
        feature: 'GPS & 5G Phone Signal',
        exoticTint: '100% Signal Safe (Non-Metallic)',
        standardOption: 'Can Block Signals',
      },
      {
        feature: 'Color Stability Over Time',
        exoticTint: 'Never Turns Purple or Bubbles',
        standardOption: 'Fades in 1 Gulf Summer',
      },
    ],
    faqs: [
      {
        q: 'How does your car window tinting home service work in Qatar?',
        a: 'Our mobile team arrives at your villa or underground parking in Lusail, The Pearl, Al Kheesa, Al Gharrafa, Al Rayyan, or Wakra with portable lighting and filtration tools. All we need is a covered parking spot out of direct wind.',
      },
      {
        q: 'Will nano-ceramic tint make my car too dark to drive at night?',
        a: 'No! Nano-ceramic technology rejects heat through microscopic ceramic particles rather than dark dyes. Even our 35% and 70% VLT shades reject up to 92–96% of infrared heat while keeping night visibility crystal clear.',
      },
    ],
    clientReview: {
      name: 'Harold Harrison',
      role: 'Verified Car Window Tinting Client · Qatar',
      quote:
        'I used their car window tinting Qatar service, and the heat rejection window film keeps my car cool. Highly recommend Exotic Tint Qatar!',
    },
  },
  {
    slug: 'commercial-window-tinting',
    id: 'Commercial Window Tinting',
    num: '02',
    category: 'window-tinting',
    badge: 'DOHA OFFICES & TOWERS',
    shortTitle: 'Commercial Tinting',
    title: 'Commercial Window Tinting',
    seoHeadline: 'Commercial Window Tinting Doha – Office Energy Savings & Privacy',
    heroSubheadline:
      'Lower Kahramaa AC bills, eliminate harsh computer screen glare, and upgrade office privacy with one-way mirror, frosted, and blackout films.',
    desc: 'At Exotic Tint Qatar, our commercial window tinting Doha services enhance energy efficiency, privacy, and UV protection. We offer one-way mirror films, frosted window film designs, and blackout films for offices, plus stone protection film services for marble and wood.',
    longDescription:
      'Glass-fronted commercial buildings in Doha, West Bay, and Lusail absorb massive solar thermal loads year-round. Exotic Tint Qatar provides high-performance commercial window tinting Doha solutions—including solar-control ceramic films, architectural one-way mirror films, frosted window film designs for meeting rooms, blackout films, and stone protection film services for executive reception marble and wood tables.',
    bgClass: 'bg-[#d9f941]',
    accentHex: '#d9f941',
    image: ASSETS.services.commercial,
    alt: 'Commercial Window Tinting Doha',
    keyStats: [
      { label: 'HVAC Cooling Savings', value: '-32% kWh', sub: 'Lower Electricity Bills' },
      { label: 'Screen Glare Reduction', value: 'Up to 85%', sub: 'Comfortable Workspaces' },
      { label: 'UV Ray Blockage', value: '99.9% UV', sub: 'Protects Office Interiors' },
      { label: 'Film Options', value: '4+ Types', sub: 'Mirror, Ceramic, Frosted, Blackout' },
    ],
    benefitsList: [
      'One-way mirror films for daytime exterior office privacy',
      'Frosted window film designs & blackout films for conference rooms',
      'Reduces HVAC load and hot-spots near floor-to-ceiling curtain walls',
      'Stone protection film services available for reception marble and conference wood tables',
    ],
    simulatorTitle: 'Commercial Glazing Film Selector',
    simulatorSubtitle:
      'Compare our 4 most popular commercial office films installed across Doha and Lusail.',
    simulatorOptions: [
      {
        id: 'solar-ceramic',
        label: 'Architectural Solar Ceramic Film',
        vltOrFinish: 'Neutral Clear / Low Reflectance',
        irRejection: '94% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '68% Glare Cut',
        warranty: '10-Year Commercial Warranty',
        bestFor: 'Retail showrooms & corporate towers needing heat rejection without changing facade look.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'one-way-mirror',
        label: 'One-Way Silver / Bronze Mirror Film',
        vltOrFinish: 'Reflective Exterior Privacy',
        irRejection: '96% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '85% Glare Cut',
        warranty: '10-Year Commercial Warranty',
        bestFor: 'Ground-floor offices, clinics, and high-sun facades requiring maximum daytime privacy.',
        previewTintOpacity: 'opacity-70',
      },
      {
        id: 'office-frosted',
        label: 'Frosted Partition & Branding Film',
        vltOrFinish: 'Matte Etched Sandblast Finish',
        irRejection: 'Diffused Light',
        uvBlock: '98% UV',
        glareOrStainReduction: '100% Visual Privacy',
        warranty: '10-Year Interior Warranty',
        bestFor: 'Boardrooms, HR offices, and glass corridors needing custom logos or privacy bands.',
        previewTintOpacity: 'opacity-60',
      },
      {
        id: 'blackout-film',
        label: 'Total Blackout / Media Room Film',
        vltOrFinish: '0% Light Transmission',
        irRejection: '99% Solar Block',
        uvBlock: '100% UV',
        glareOrStainReduction: '100% Light Block',
        warranty: '10-Year Warranty',
        bestFor: 'Server rooms, medical imaging suites, auditoriums, and storage zones.',
        previewTintOpacity: 'opacity-30',
      },
    ],
    estimatorTitle: 'Commercial Project Scope Estimator',
    estimatorOptions: [
      {
        id: 'executive-suite',
        label: 'Executive Office Suite / Retail Storefront (Up to 50 m²)',
        duration: 'Same-Day Installation (4–6 Hours)',
        coverage: 'Exterior Windows + Internal Boardroom Partitions',
        popularFilm: 'Solar Ceramic + Custom Frosted Bands',
        benefitSummary: 'Zero disruption to your staff — after-hours & weekend crews available.',
      },
      {
        id: 'full-floor',
        label: 'Full Commercial Floor Plate (50 – 250 m²)',
        duration: '1 – 2 Days (Multi-Tech Crew)',
        coverage: 'Curtain Wall Glazing + Reception Marble & Wood Table Protection',
        popularFilm: 'One-Way Solar Mirror + Stone TPU Shield',
        benefitSummary: 'Immediate drop in afternoon office temperatures and AC energy usage.',
      },
      {
        id: 'multi-story',
        label: 'Entire Building / Clinic / School Campus (250 m²+)',
        duration: 'Custom Phased Schedule',
        coverage: 'Full Facade Solar Control + Safety Shatter Retention',
        popularFilm: 'High-ROI Architectural Solar Control Series',
        benefitSummary: 'Includes free on-site thermal laser audit and flat-rate commercial pricing.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Free On-Site Doha Glazing Audit',
        desc: 'We measure your glass panes, test solar heat gain with digital meters, and bring physical film samples to your office.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '02',
        title: 'Flat-Rate Proposal & Scheduling',
        desc: 'Transparent per-square-meter pricing with zero hidden fees. We schedule during or outside business hours.',
        color: 'bg-[#f27438]',
      },
      {
        step: '03',
        title: 'Clean Commercial Installation',
        desc: 'Our uniformed technicians prep glass edges, apply optical-grade film, and protect surrounding desks and floors.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Final Sign-Off & 10-Yr Warranty',
        desc: 'We inspect every pane with your facility manager and provide full commercial warranty documentation.',
        color: 'bg-[#4fd1c5]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Air Conditioning Energy Costs',
        exoticTint: 'Reduces HVAC Load by up to 32%',
        standardOption: 'Continuous AC Overwork',
      },
      {
        feature: 'Computer Monitor Glare',
        exoticTint: 'Cuts 85% Glare Without Dark Blinds',
        standardOption: 'Requires Closing Blinds All Day',
      },
      {
        feature: 'Natural Daylight Preservation',
        exoticTint: 'Keeps Open Panoramic Views',
        standardOption: 'Darkens Workspace',
      },
      {
        feature: 'Additional Surface Protection',
        exoticTint: 'Includes Marble & Wood Table Films',
        standardOption: 'Glass Only',
      },
    ],
    faqs: [
      {
        q: 'Can you install commercial window tinting outside of our normal office hours in Doha?',
        a: 'Yes! We operate 7 days a week and frequently schedule commercial installations in West Bay, Lusail, and Msheireb during evenings or weekends so your team experiences zero downtime.',
      },
      {
        q: 'Do you also provide frosted film and marble table protection for offices?',
        a: 'Absolutely. Alongside solar window tinting, we install custom CNC-cut frosted privacy designs on glass partitions and clear stone protection film on conference tables and reception desks.',
      },
    ],
    clientReview: {
      name: 'Miranda Snyder',
      role: 'Verified Commercial Window Tinting Client · Doha',
      quote:
        'Exotic Tint Qatar provided excellent commercial window tinting in Doha. The frosted window film designs are perfect for our office, and the heat reduction is amazing!',
    },
  },
  {
    slug: 'residential-window-tinting',
    id: 'Residential Window Tinting',
    num: '03',
    category: 'window-tinting',
    badge: 'CERAMIC & VILLA PRIVACY',
    shortTitle: 'Residential Tinting',
    title: 'Residential Window Tinting',
    seoHeadline: 'Residential Window Tinting Near Me – Home & Villa Window Tint Qatar',
    heroSubheadline:
      'Keep your villa cool, protect expensive furniture from UV fading, and enjoy daytime family privacy without closing your curtains.',
    desc: 'Upgrade your home with residential window tinting near me. Our house window tinting services feature ceramic films, privacy window tinting, and heat rejection window film options to match your style and reduce energy costs.',
    longDescription:
      'Your home should be a cool sanctuary from Qatar’s intense sunlight. Our residential window tinting near me service brings advanced ceramic films, one-way daytime privacy window tinting, and heat rejection window film directly to villas and apartments in Lusail, The Pearl-Qatar, Al Kheesa, Al Gharrafa, Al Rayyan, and Wakra. Enjoy sunlit rooms without the heat, lower your monthly electricity bills, and stop 99.9% of UV rays from fading your curtains, sofas, and silk carpets.',
    bgClass: 'bg-[#6ee7b7]',
    accentHex: '#6ee7b7',
    image: ASSETS.services.residential,
    alt: 'Residential Window Tinting near me in Qatar',
    keyStats: [
      { label: 'Heat Rejection', value: 'Up to 96%', sub: 'Cooler Villa Rooms' },
      { label: 'Furniture UV Shield', value: '99.9% UV', sub: 'Stops Carpet & Sofa Fading' },
      { label: 'Daytime Privacy', value: 'One-Way View', sub: 'See Out, Nobody Sees In' },
      { label: 'Electricity Bill Impact', value: '-30% AC Load', sub: 'Home Energy Savings' },
    ],
    benefitsList: [
      'Ceramic films that block desert heat while keeping rooms bright and natural',
      'Privacy window tinting for ground-floor villas, swimming pool glass, and Majlis halls',
      'Protects luxury curtains, hardwood floors, and artwork from sun bleaching',
      'Fast, clean installation by respectful residential technicians across Qatar',
    ],
    simulatorTitle: 'Home & Villa Window Film Comparison',
    simulatorSubtitle:
      'Explore the ideal film for your villa living room, bedrooms, or Majlis windows.',
    simulatorOptions: [
      {
        id: 'villa-privacy-20',
        label: 'Daytime One-Way Villa Privacy Film',
        vltOrFinish: 'Warm Neutral / Exterior Mirror',
        irRejection: '95% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '78% Glare Cut',
        warranty: '10-Year Home Warranty',
        bestFor: 'Family living rooms, courtyard-facing windows, and ground-floor villas.',
        previewTintOpacity: 'opacity-75',
      },
      {
        id: 'villa-ceramic-50',
        label: 'Invisible Nano-Ceramic 50% View Film',
        vltOrFinish: 'Crystal Clear Natural Light',
        irRejection: '93% IR Rejected',
        uvBlock: '99.9% UV',
        glareOrStainReduction: '48% Glare Cut',
        warranty: '10-Year Home Warranty',
        bestFor: 'Sea-view apartments in The Pearl & Lusail where HOA rules require a natural glass look.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'villa-frosted',
        label: 'Bathroom & Entrance Frosted Privacy',
        vltOrFinish: '24/7Opaque Etched Finish',
        irRejection: '65% Heat Block',
        uvBlock: '99% UV',
        glareOrStainReduction: '100% Day & Night Privacy',
        warranty: '10-Year Home Warranty',
        bestFor: 'Bathrooms, dressing rooms, stairwell windows, and front villa doors.',
        previewTintOpacity: 'opacity-55',
      },
    ],
    estimatorTitle: 'Home & Villa Tinting Estimator',
    estimatorOptions: [
      {
        id: 'apartment-penthouse',
        label: 'Pearl / Lusail Apartment or Penthouse',
        duration: '3 – 4 Hours',
        coverage: 'Living Room Balcony Sliders + Master Bedroom Windows',
        popularFilm: 'Invisible Nano-Ceramic Series',
        benefitSummary: 'Eliminates afternoon sea-glare and keeps balcony glass cool to the touch.',
      },
      {
        id: 'family-villa',
        label: 'Standalone Family Villa (Al Kheesa / Al Gharrafa / Al Rayyan)',
        duration: '5 – 7 Hours (1 Day)',
        coverage: 'All Ground & First Floor Windows + Outdoor Majlis Glass',
        popularFilm: 'One-Way Daytime Privacy + Ceramic Heat Shield',
        benefitSummary: 'Complete family privacy during the day plus major AC cooling relief.',
      },
      {
        id: 'skylight-sunroom',
        label: 'Villa Skylights, Glass Pergolas & Sunrooms',
        duration: '3 – 5 Hours',
        coverage: 'Overhead Roof Glass & Patio Enclosures',
        popularFilm: 'Extreme 98% IR Reflective Thermal Film',
        benefitSummary: 'Stops overhead greenhouse heat buildup immediately.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Free Home Consultation & Samples',
        desc: 'We visit your villa anywhere in Qatar, measure your windows, and hold film samples against your glass in real sunlight.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '02',
        title: 'Furniture & Floor Protection',
        desc: 'Our crew lays down clean drop-cloths and moves curtains or blinds safely before touching any window.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Precision Interior Application',
        desc: 'We purify the glass and install optical-grade residential film with neatly trimmed silicone-sealed edges.',
        color: 'bg-[#f27438]',
      },
      {
        step: '04',
        title: 'Instant Comfort & Care Walkthrough',
        desc: 'Feel the temperature drop immediately! We leave your windows spotless and hand over your warranty.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Natural Sunlight & Views',
        exoticTint: 'Preserves View While Blocking Heat',
        standardOption: 'Heavy Curtains Block All Light',
      },
      {
        feature: 'UV Protection for Sofas & Rugs',
        exoticTint: '99.9% UV Blocked 24/7',
        standardOption: 'Furniture Fades When Curtains Open',
      },
      {
        feature: 'Daytime Family Privacy',
        exoticTint: 'Full One-Way Daytime Privacy',
        standardOption: 'Exposed to Neighbors',
      },
      {
        feature: 'Monthly AC Electricity Bill',
        exoticTint: 'Up to 30% Lower Cooling Costs',
        standardOption: 'High Summer Peak Bills',
      },
    ],
    faqs: [
      {
        q: 'Is residential window tinting safe for double-glazed villa windows in Qatar?',
        a: 'Yes! We use dual-pane safe nano-ceramic and architectural films specifically rated for modern tempered and double-glazed villa windows in Qatar.',
      },
      {
        q: 'Can I combine house window tinting with sofa nano coating or marble protection?',
        a: 'Definitely! Many of our villa clients in Lusail, Al Kheesa, and Al Gharrafa book residential window tinting together with kitchen marble protection and Majlis sofa nano coating in a single visit.',
      },
    ],
    clientReview: {
      name: 'Miranda Snyder',
      role: 'Verified Window Tinting Client · Doha',
      quote:
        'Exotic Tint Qatar provided excellent window tinting in Doha. The film designs are perfect and the heat reduction is amazing!',
    },
  },
  {
    slug: 'customized-cut-frosted-film',
    id: 'Customized Cut Frosted Film',
    num: '04',
    category: 'window-tinting',
    badge: 'CUSTOM CNC DESIGNS',
    shortTitle: 'Frosted Film Designs',
    title: 'Customized Cut Frosted Film',
    seoHeadline: 'Customized Cut Frosted Film – Frosted Window Film Designs in Qatar',
    heroSubheadline:
      'Transform plain glass partitions, office doors, and home windows with precision computer-cut frosted patterns, logos, and privacy bands.',
    desc: 'Add a modern touch with our customized cut frosted film, perfect for offices and homes. Our frosted window film designs enhance privacy and aesthetics across Qatar.',
    longDescription:
      'Whether you want to brand your corporate headquarters in Doha with CNC-cut company logos or create elegant privacy in your home without sacrificing natural light, Exotic Tint Qatar delivers bespoke customized cut frosted film solutions. Our frosted window film designs replicate the luxury look of sandblasted or acid-etched glass at a fraction of the cost—and can be updated or removed cleanly whenever your space evolves.',
    bgClass: 'bg-[#fbbf24]',
    accentHex: '#fbbf24',
    image: ASSETS.services.frostedFilm,
    alt: 'Customized Cut Frosted Film designs in Qatar',
    keyStats: [
      { label: 'Visual Privacy', value: '24/7 Privacy', sub: 'Day & Night Opacity' },
      { label: 'Natural Light Flow', value: '75%+ Light', sub: 'Soft Diffused Glow' },
      { label: 'Cutting Precision', value: '0.1mm CNC', sub: 'Computer Plotter Cut' },
      { label: 'Applications', value: 'Home & Office', sub: 'Partitions, Doors & Showers' },
    ],
    benefitsList: [
      'Custom company logos, geometric stripes, and Arabic/modern architectural motifs',
      'Day-and-night two-way privacy without darkening hallways or meeting rooms',
      'Cost-effective, removable alternative to permanent sandblasted glass',
      'Ideal for corporate boardrooms, clinics, salons, and residential villa entrances',
    ],
    simulatorTitle: 'Interactive Frosted Design Style Preview',
    simulatorSubtitle:
      'Choose a frosted film style below to see how we customize glass for offices and villas.',
    simulatorOptions: [
      {
        id: 'cnc-geometric',
        label: 'Custom CNC Geometric & Arabic Motifs',
        vltOrFinish: 'Precision Plotter-Cut Pattern',
        irRejection: 'Diffused Solar Glow',
        uvBlock: '98% UV',
        glareOrStainReduction: 'Custom Privacy Zones',
        warranty: '10-Year Interior Warranty',
        bestFor: 'Villa Majlis doors, luxury reception lobbies, and boutique storefronts.',
        previewTintOpacity: 'opacity-85',
      },
      {
        id: 'corporate-logo',
        label: 'Corporate Logo & Striping Bands',
        vltOrFinish: 'Eye-Level Privacy Band + Negative-Cut Logo',
        irRejection: 'Diffused Solar Glow',
        uvBlock: '98% UV',
        glareOrStainReduction: 'Eye-Level Privacy',
        warranty: '10-Year Interior Warranty',
        bestFor: 'Conference rooms, executive glass offices, and glass safety manifestations.',
        previewTintOpacity: 'opacity-75',
      },
      {
        id: 'full-sandblast',
        label: 'Full-Height Matte Sandblast Frost',
        vltOrFinish: '100% Frosted Etched Look',
        irRejection: '65% Heat Block',
        uvBlock: '99% UV',
        glareOrStainReduction: '100% 24/7 Privacy',
        warranty: '10-Year Warranty',
        bestFor: 'Medical clinics, ladies’ salons, bathrooms, and private office suites.',
        previewTintOpacity: 'opacity-50',
      },
    ],
    estimatorTitle: 'Frosted Film Design & Installation Estimator',
    estimatorOptions: [
      {
        id: 'home-doors-windows',
        label: 'Home Entrance Doors, Bathrooms & Partitions (1–5 Panels)',
        duration: '2 – 3 Hours',
        coverage: 'Full Frost or Decorative Pattern Cut to Exact Window Size',
        popularFilm: 'Silver-Etch Matte Sandblast Film',
        benefitSummary: 'Instant 24-hour privacy that still lets soft daylight brighten the room.',
      },
      {
        id: 'office-partitions',
        label: 'Office Glass Partitions & Meeting Rooms (5–20 Panels)',
        duration: '4 – 6 Hours (Same Day)',
        coverage: 'Custom CAD Design + CNC Plotter Cutting + On-Site Transfer Application',
        popularFilm: 'Custom Branded Frosted Film',
        benefitSummary: 'Elevates your Doha office branding while giving teams distraction-free privacy.',
      },
      {
        id: 'commercial-project',
        label: 'Full Commercial Fit-Out / Clinic / Retail Space (20+ Panels)',
        duration: '1 – 2 Days',
        coverage: 'End-to-End Mockups, Vector Plotting & Multi-Floor Installation',
        popularFilm: 'Architectural Frosted & Dusted Crystal Series',
        benefitSummary: 'Fast turnaround for interior designers, contractors, and business owners.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Glass Measurement & Digital Mockup',
        desc: 'Send us your logo or choose from our pattern catalog—we prepare a digital preview scaled to your exact glass dimensions.',
        color: 'bg-[#fbbf24]',
      },
      {
        step: '02',
        title: 'High-Precision CNC Plotter Cutting',
        desc: 'Your design is computer-cut on premium architectural frosted vinyl with razor-sharp edges.',
        color: 'bg-[#f27438]',
      },
      {
        step: '03',
        title: 'Laser-Aligned On-Site Application',
        desc: 'We use laser levels to align bands and logos across multiple glass panels with millimeter accuracy.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Transfer Peel & Edge Finishing',
        desc: 'We remove the application tape to reveal crisp, bubble-free etched glass aesthetics ready for immediate use.',
        color: 'bg-[#d9f941]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Cost vs. Acid-Etched Glass',
        exoticTint: 'Up to 70% More Affordable',
        standardOption: 'Expensive Glass Replacement',
      },
      {
        feature: 'Future Updates / Rebranding',
        exoticTint: 'Easily Removable Without Damage',
        standardOption: 'Permanent — Must Replace Glass',
      },
      {
        feature: 'Custom Logos & Fine Details',
        exoticTint: '0.1mm CNC Plotter Precision',
        standardOption: 'Limited Stencil Detail',
      },
      {
        feature: 'Installation Mess',
        exoticTint: '100% Dust-Free In-Place Install',
        standardOption: 'Requires Removing Glass Doors',
      },
    ],
    faqs: [
      {
        q: 'Can you cut our company logo and Arabic calligraphy into the frosted film?',
        a: 'Yes! Our CNC plotter cuts intricate vector logos, bilingual English/Arabic typography, and geometric patterns with crisp precision.',
      },
      {
        q: 'Does frosted window film block light completely?',
        a: 'No—frosted film blocks visual sightlines for privacy while allowing 70% to 80% of soft, diffused natural light to pass through.',
      },
    ],
    clientReview: {
      name: 'Miranda Snyder',
      role: 'Verified Frosted Film Client · Doha',
      quote:
        'Exotic Tint Qatar provided excellent commercial window tinting in Doha. The frosted window film designs are perfect for our office, and the heat reduction is amazing!',
    },
  },
  {
    slug: 'marble-protection-film',
    id: 'Marble Protection Film',
    num: '05',
    category: 'surface-protection',
    badge: 'STONE & WOODEN TABLES',
    shortTitle: 'Marble Protection',
    title: 'Marble Protection Film',
    seoHeadline: 'Marble Protection Film Qatar – Stone & Wooden Table Protection',
    heroSubheadline:
      'Prevent scratches, lemon acid etching, coffee rings, and heat marks on your luxury marble countertops and wooden tables.',
    desc: 'Protect your surfaces with our marble protection and wooden table protection films. Our stone protection film services prevent scratches and stains, ideal for homes and offices in Qatar.',
    longDescription:
      'Natural marble, onyx, travertine, and fine wooden dining tables are porous and easily damaged by acidic spills (lemon juice, vinegar, perfume), hot serving dishes, and everyday scratches. Exotic Tint Qatar’s marble protection film and wooden table protection services apply an optically clear, self-healing polyurethane (TPU) armor directly over your stone and wood surfaces—preserving their natural beauty for years in homes, villas, hotels, and offices across Qatar.',
    bgClass: 'bg-[#f45b9a]',
    accentHex: '#f45b9a',
    image: ASSETS.services.marbleProtection,
    alt: 'Marble Protection Film and wooden table protection in Qatar',
    keyStats: [
      { label: 'Stain & Acid Immunity', value: '100% Sealed', sub: 'Blocks Coffee, Lemon & Oil' },
      { label: 'Scratch Technology', value: 'Self-Healing', sub: 'Micro-Scratches Vanish' },
      { label: 'Thermal Resistance', value: 'Up to 150°C', sub: 'Safe for Hot Dishes & Pots' },
      { label: 'Finish Options', value: 'Gloss / Matte', sub: 'Matches Polished or Honed Stone' },
    ],
    benefitsList: [
      'Optically invisible protection for kitchen islands, dining tables, vanities, and coffee tables',
      'Stops permanent acid etching on Calacatta, Carrara, and Statuario marble',
      'Wooden table protection film shields bespoke walnut, oak, and lacquered joinery',
      'Food-safe, hydrophobic topcoat wipes clean in seconds with water',
    ],
    simulatorTitle: 'Surface Finish & Protection Selector',
    simulatorSubtitle:
      'We match the exact sheen of your natural stone or wooden furniture.',
    simulatorOptions: [
      {
        id: 'high-gloss-tpu',
        label: 'Optical High-Gloss Marble Shield',
        vltOrFinish: 'Mirror-Like Depth & Clarity',
        irRejection: '150°C Thermal Barrier',
        uvBlock: '99% Anti-Yellowing UV',
        glareOrStainReduction: '100% Acid & Stain Proof',
        warranty: 'Up to 10-Year Surface Life',
        bestFor: 'Polished Italian marble kitchen islands, dining tables, and hotel reception counters.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'satin-matte-tpu',
        label: 'Honed / Satin Matte Stone Film',
        vltOrFinish: 'Velvety Non-Reflective Finish',
        irRejection: '150°C Thermal Barrier',
        uvBlock: '99% Anti-Yellowing UV',
        glareOrStainReduction: '100% Acid & Stain Proof',
        warranty: 'Up to 10-Year Surface Life',
        bestFor: 'Honed marble, travertine slabs, and matte-finished modern dining tables.',
        previewTintOpacity: 'opacity-80',
      },
      {
        id: 'wood-armor-tpu',
        label: 'Wooden Table & Joinery Protection Film',
        vltOrFinish: 'Warm Natural Grain Enhancement',
        irRejection: 'Hot Cup Ring Prevention',
        uvBlock: '99.9% UV Fade Block',
        glareOrStainReduction: 'Scratch & Water Ring Proof',
        warranty: 'Up to 10-Year Surface Life',
        bestFor: 'Solid wood dining tables, executive boardroom tables, and luxury sideboards.',
        previewTintOpacity: 'opacity-85',
      },
    ],
    estimatorTitle: 'Marble & Wood Surface Coverage Estimator',
    estimatorOptions: [
      {
        id: 'dining-coffee-table',
        label: 'Dining Table or Majlis Coffee Table Set',
        duration: '60 – 90 Mins',
        coverage: 'Full Tabletop + Wrapped or Precision-Trimmed Edges',
        popularFilm: '8-Mil Self-Healing Optical TPU',
        benefitSummary: 'Host family dinners and serve Arabic coffee with zero fear of rings or scratches.',
      },
      {
        id: 'kitchen-island',
        label: 'Kitchen Island + Countertops & Backsplash',
        duration: '2 – 4 Hours',
        coverage: 'Main Island Slab, Prep Counters & Sink Cutouts',
        popularFilm: 'Thermal-Resistant Gloss/Matte Stone Film',
        benefitSummary: 'Permanent defense against cooking oils, turmeric, lemon juice, and knife slips.',
      },
      {
        id: 'full-villa-stone',
        label: 'Full Villa Package (Kitchen + Dining + Bathroom Vanities)',
        duration: '4 – 6 Hours',
        coverage: 'All Marble, Onyx & Wooden Surfaces Across Your Home',
        popularFilm: 'Complete Custom-Fit Stone & Wood Armor',
        benefitSummary: 'Keeps every stone and wooden surface in your villa looking brand new.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Surface Purification & Inspection',
        desc: 'We deep-clean and degrease the marble or wood surface so it is 100% free of oils or dust.',
        color: 'bg-[#f45b9a]',
      },
      {
        step: '02',
        title: 'Custom Slab Sizing & Sink Cutouts',
        desc: 'We lay out single-piece seamless TPU film across wide kitchen islands and custom-fit around faucets or edges.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '03',
        title: 'Optical Wet-Bonding Extraction',
        desc: 'Using specialized soft squeegees, we bond the film to the stone with zero air bubbles or distortion.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '04',
        title: 'Precision Edge Chamfering',
        desc: 'Edges are laser-trimmed to a micro-bevel so the film is virtually undetectable to the eye and touch.',
        color: 'bg-[#a78bfa]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Lemon, Vinegar & Acid Etching',
        exoticTint: '100% Physical Barrier (Zero Etching)',
        standardOption: 'Liquid SealersStill Etch in Minutes',
      },
      {
        feature: 'Surface Scratches & Utensils',
        exoticTint: 'Self-Healing 8-Mil TPU Armor',
        standardOption: 'Zero Scratch Protection',
      },
      {
        feature: 'Annual Re-Sealing Needed?',
        exoticTint: 'No — One Application Lasts Years',
        standardOption: 'Requires Frequent Chemical Resealing',
      },
      {
        feature: 'Safe for Wooden Tables?',
        exoticTint: 'Yes — Protects Both Marble & Wood',
        standardOption: 'Stone Sealers Cannot Be Used on Wood',
      },
    ],
    faqs: [
      {
        q: 'Will marble protection film change the look or feel of my Italian marble?',
        a: 'Not at all! Our film is optically clear and available in both high-gloss (which enhances the depth of polished marble veins) and satin-matte (for honed stone and natural wood).',
      },
      {
        q: 'Can I place hot plates and coffee pots on the protected surface?',
        a: 'Yes, our stone and wooden table protection film is engineered to withstand high temperatures up to 150°C without yellowing or lifting.',
      },
    ],
    clientReview: {
      name: 'Debra Reyes',
      role: 'Verified Marble Protection & Nano Coating Client · Qatar',
      quote:
        'Their nano coating for sofa and marble protection services are incredible. My furniture and surfaces look brand new, thanks to nano coating Qatar from Exotic Tint Qatar.',
    },
  },
  {
    slug: 'fabric-nano-coating-service',
    id: 'Fabric Nano Coating Service',
    num: '06',
    category: 'surface-protection',
    badge: 'SOFAS & CARPETS SHIELD',
    shortTitle: 'Fabric Nano Coating',
    title: 'Fabric Nano Coating Service',
    seoHeadline: 'Nano Coating Qatar – Fabric Nano Coating for Sofa & Carpets',
    heroSubheadline:
      'Invisible hydrophobic SiO2 protection for luxury sofas, Majlis seating, dining chairs, and carpets so liquid spills bead up and wipe away.',
    desc: 'Safeguard your sofas and carpets with our nano coating Qatar services, including nano coating for sofa, ensuring long-lasting protection.',
    longDescription:
      'Light-colored bouclé sofas, custom Majlis seating, velvet armchairs, and hand-woven silk or wool carpets are the centerpiece of Qatar homes—but a single cup of Arabic coffee, tea, juice, or chocolate can leave a permanent stain. Exotic Tint Qatar’s fabric nano coating service applies an invisible, breathable SiO2 nano-shield around every individual textile fiber. Liquids cannot soak in; instead, they form droplets on the surface that you simply blot away with a tissue.',
    bgClass: 'bg-[#a78bfa]',
    accentHex: '#a78bfa',
    image: ASSETS.services.fabricNanoCoating,
    alt: 'Fabric Nano Coating Service for sofas and carpets in Qatar',
    keyStats: [
      { label: 'Liquid Repellency', value: 'Hydrophobic', sub: 'Coffee & Spills Bead Up' },
      { label: 'Fabric Feel & Color', value: '100% Natural', sub: 'Zero Stiffness or Odor' },
      { label: 'Family Safety', value: 'Non-Toxic', sub: 'Safe for Kids, Babies & Pets' },
      { label: 'Service Location', value: '100% At Home', sub: 'Applied On-Site in Your Villa' },
    ],
    benefitsList: [
      'Specialized nano coating for sofa, Majlis seating, dining chairs, and headboards',
      'Deep fiber protection for Persian rugs, silk carpets, and wall-to-wall carpeting',
      'Prevents liquid absorption, oil stains, dust-mite buildup, and UV fabric fading',
      'Completely invisible, breathable, and odorless once cured',
    ],
    simulatorTitle: 'Textile & Upholstery Nano-Shield Selector',
    simulatorSubtitle:
      'Select your furniture or carpet material below to see how our nano coating performs.',
    simulatorOptions: [
      {
        id: 'sofa-majlis',
        label: 'Luxury Sofas & Majlis Seating (Linen / Bouclé / Velvet)',
        vltOrFinish: '100% Invisible & Soft to Touch',
        irRejection: 'Breathable Fiber Bond',
        uvBlock: 'UV Color-Lock Shield',
        glareOrStainReduction: 'Repels Coffee, Tea, Juice & Oil',
        warranty: 'Up to 2–3 Years Protection',
        bestFor: 'White/cream living room sofas, traditional & modern Majlis suites, and dining chairs.',
        previewTintOpacity: 'opacity-95',
      },
      {
        id: 'silk-wool-carpets',
        label: 'Silk, Wool & Hand-Tufted Carpets',
        vltOrFinish: 'Preserves Natural Sheen & Pile',
        irRejection: 'Anti-Dust & Anti-Soil',
        uvBlock: 'Prevents Sun Fading',
        glareOrStainReduction: 'Stops Deep Pile Staining',
        warranty: 'Up to 3 Years Protection',
        bestFor: 'Fine area rugs, Majlis carpets, and high-traffic hallway runners.',
        previewTintOpacity: 'opacity-90',
      },
      {
        id: 'auto-yacht-interior',
        label: 'Car Seats, Alcantara & Yacht Upholstery',
        vltOrFinish: 'Matte Factory Finish',
        irRejection: 'Abrasion & Dye-Transfer Block',
        uvBlock: '99% UV Interior Shield',
        glareOrStainReduction: 'Blocks Denim Dye & Drink Spills',
        warranty: '2-Year Protection',
        bestFor: 'Luxury SUV leather/Alcantara seats and Pearl Qatar yacht cushions.',
        previewTintOpacity: 'opacity-85',
      },
    ],
    estimatorTitle: 'Sofa & Carpet Nano Coating Estimator',
    estimatorOptions: [
      {
        id: 'single-sofa-set',
        label: 'Living Room Sofa Set (L-Shape or 3+2+1 Seater)',
        duration: '60 – 90 Mins (On-Site at Your Home)',
        coverage: 'All Cushions, Armrests, Backrests & Throw Pillows',
        popularFilm: 'SiO2 Textile Nano-Shield Pro',
        benefitSummary: 'Dry and ready to use within hours — spills blot right off with a napkin.',
      },
      {
        id: 'majlis-plus-carpet',
        label: 'Full Majlis Suite + Large Center Carpet',
        duration: '2 – 3 Hours',
        coverage: 'Complete Majlis Seating + Dining Chairs + Area Rugs',
        popularFilm: 'Heavy-Duty Hydrophobic & Oleophobic Formula',
        benefitSummary: 'Ideal before Ramadan, Eid, or family gatherings to keep fabrics pristine.',
      },
      {
        id: 'whole-villa-textiles',
        label: 'Full Villa Upholstery & Carpet Protection Package',
        duration: '3 – 5 Hours',
        coverage: 'All Sofas, Majlis, Dining Chairs, Upholstered Beds & Carpets',
        popularFilm: 'Complete Home Textile Armor',
        benefitSummary: 'Maximum peace of mind for families with children, guests, and pets.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'HEPA Vacuum & Fiber Preparation',
        desc: 'We gently remove surface dust and lint so the nano-particles bond directly to clean textile fibers.',
        color: 'bg-[#a78bfa]',
      },
      {
        step: '02',
        title: 'Precision HVLP Nano-Mist Application',
        desc: 'Our technicians apply an even, fine mist of SiO2 nano-coating across cushions, seams, and carpet pile.',
        color: 'bg-[#6ee7b7]',
      },
      {
        step: '03',
        title: 'Cross-Link Fiber Curing',
        desc: 'The coating bonds at a molecular level without stiffening the fabric or changing its color or breathability.',
        color: 'bg-[#d9f941]',
      },
      {
        step: '04',
        title: 'Live Water-Bead Demonstration',
        desc: 'We test the hydrophobic droplet effect right in front of you so you can see liquids roll off effortlessly.',
        color: 'bg-[#4fd1c5]',
      },
    ],
    comparisonRows: [
      {
        feature: 'Arabic Coffee, Tea & Juice Spills',
        exoticTint: 'Beads Up on Top — Blots Off Cleanly',
        standardOption: 'Soaks Into Foam Immediately',
      },
      {
        feature: 'Fabric Texture & Breathability',
        exoticTint: '100% Unchanged & Soft',
        standardOption: 'Plastic Covers Ruin Comfort',
      },
      {
        feature: 'Odor & Chemical Safety',
        exoticTint: 'Odorless, Non-Toxic & Kid-Safe',
        standardOption: 'Harsh Aerosol Fumes',
      },
      {
        feature: 'Convenience',
        exoticTint: 'Applied At Your Home in 1–2 Hours',
        standardOption: 'Requires Sending Furniture Out',
      },
    ],
    faqs: [
      {
        q: 'Will nano coating for sofa change the color or softness of my white bouclé or velvet sofa?',
        a: 'No! Our SiO2 nano coating Qatar formula is 100% invisible, odor-free once cured, and leaves even delicate silk, velvet, and bouclé fabrics feeling completely natural.',
      },
      {
        q: 'How do I clean a spill after my sofa or carpet is nano-coated?',
        a: 'Simply touch a dry paper towel or cloth to the liquid droplets—the liquid will wick straight into the tissue without leaving a wet mark or stain on your sofa.',
      },
    ],
    clientReview: {
      name: 'Debra Reyes',
      role: 'Verified Nano Coating for Sofa Client · Qatar',
      quote:
        'Their nano coating for sofa and marble protection services are incredible. My furniture and surfaces look brand new, thanks to nano coating Qatar from Exotic Tint Qatar.',
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return ALL_SERVICES.find((service) => service.slug === slug);
}
