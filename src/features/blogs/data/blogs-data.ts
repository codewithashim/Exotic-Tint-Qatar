import { ASSETS } from '@/config/assets';

export interface BlogPost {
  slug: string;
  id: string;
  num: string;
  category:
    | 'Commercial Tinting'
    | 'Residential Tinting'
    | 'Frosted Film Designs'
    | 'Marble & Wood Shield'
    | 'Fabric Nano Coating';
  title: string;
  excerpt: string;
  readTime: string;
  /** Display date shown on the page, e.g. "March 2026". */
  publishDate: string;
  /**
   * Optional exact publication date (ISO 8601, e.g. "2026-03-14") for structured data and the
   * sitemap. When omitted, the month from `publishDate` is used — never an invented day.
   */
  publishedAt?: string;
  author: string;
  authorRole: string;
  bgClass: string;
  image: string;
  alt: string;
  relatedServiceSlug: string;
  relatedServiceTitle: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string;
    proTip?: string;
  }[];
  quickSpecComparison: {
    metric: string;
    withExoticTint: string;
    withoutProtection: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'commercial-window-tinting-doha-office-energy-savings',
    id: 'blog-02',
    num: '01',
    category: 'Commercial Tinting',
    title:
      'Commercial Window Tinting Doha: How Offices & Towers Cut HVAC Cooling Costs by 32%',
    excerpt:
      'Floor-to-ceiling glass curtain walls look impressive in West Bay and Lusail, but they create hot-spots and blinding monitor glare. Here is how architectural window films solve both.',
    readTime: '5 Min Read',
    publishDate: 'March 2026',
    author: 'Exotic Tint Qatar Commercial Division',
    authorRole: 'Architectural Glazing Consultants · Doha',
    bgClass: 'bg-[#d9f941]',
    image: ASSETS.services.commercial,
    alt: 'Commercial window tinting Doha office building glass facade',
    relatedServiceSlug: 'sun-control-window-film',
    relatedServiceTitle: 'Sun Control Window Film',
    keyTakeaways: [
      'Untreated commercial glass accounts for up to 40% of a building’s summer air-conditioning load in Doha.',
      'Architectural solar-control and one-way mirror films cut solar heat gain by up to 82% and reduce HVAC electricity consumption by up to 32%.',
      'Eliminates 85% of harsh sunlight glare on laptops and conference room screens without closing blinds.',
      'Weekend and after-hours installation crews ensure zero disruption to your employees or retail customers.',
    ],
    sections: [
      {
        heading: '1. Eliminating Office Hot-Spots & Monitor Glare Without Darkening Views',
        body: 'In modern Doha commercial towers, employees sitting near south- and west-facing windows often suffer from intense afternoon heat and screen glare, forcing teams to pull down heavy blinds and work under artificial fluorescent lights all day. Our architectural solar ceramic and one-way mirror films filter out the infrared heat and harsh glare while preserving bright, natural panoramic views of the Doha skyline.',
        proTip:
          'Ask our commercial team for a free on-site digital solar transmission test on your existing office glass before you choose a film.',
      },
      {
        heading: '2. Daytime One-Way Mirror Privacy vs. Blackout Films',
        body: 'For ground-floor clinics, banks, showrooms, and corporate offices in Doha, daytime privacy is essential. Our one-way reflective mirror films create a sleek exterior mirror finish during daylight hours while letting your staff see outside clearly. For server rooms, medical imaging suites, or media rooms, we also supply 100% opaque blackout films.',
      },
      {
        heading: '3. Complete Office Package: Glass Tint, Frosted Logos & Boardroom Table Protection',
        body: 'Exotic Tint Qatar is a one-stop commercial partner. In addition to exterior solar window tinting, we custom-cut CNC frosted privacy bands for internal glass partitions and apply optically clear TPU stone & wood protection film on executive marble reception desks and wooden boardroom tables.',
      },
    ],
    quickSpecComparison: [
      {
        metric: 'Monthly HVAC Cooling Load',
        withExoticTint: 'Reduced by up to 32%',
        withoutProtection: 'Peak Chiller Overwork',
      },
      {
        metric: 'Computer Screen Glare',
        withExoticTint: 'Up to 85% Glare Reduction',
        withoutProtection: 'Requires Closing Blinds',
      },
      {
        metric: 'Daytime Exterior Privacy',
        withExoticTint: 'Full One-Way Mirror Shield',
        withoutProtection: 'Exposed to Street View',
      },
    ],
  },
  {
    slug: 'residential-window-tinting-near-me-qatar-villa-privacy',
    id: 'blog-03',
    num: '02',
    category: 'Residential Tinting',
    title:
      'Residential Window Tinting Near Me: Daytime Privacy & Heat Rejection for Qatar Villas',
    excerpt:
      'Want to open your villa curtains in Lusail, Al Kheesa, or Al Rayyan without neighbors seeing inside—or the desert sun fading your silk carpets? Read our complete home tinting guide.',
    readTime: '4 Min Read',
    publishDate: 'February 2026',
    author: 'Exotic Tint Qatar Home Specialists',
    authorRole: 'Residential Villa Glazing Team · Qatar',
    bgClass: 'bg-[#6ee7b7]',
    image: ASSETS.services.residential,
    alt: 'Residential window tinting near me for luxury villa glass windows in Qatar',
    relatedServiceSlug: 'sun-control-window-film',
    relatedServiceTitle: 'Sun Control Window Film',
    keyTakeaways: [
      'Enjoy natural daylight across your living room and Majlis while maintaining daytime one-way family privacy.',
      'Blocks 99.9% of UV rays that bleach expensive curtains, Persian rugs, bouclé sofas, and hardwood floors.',
      'Safe for modern double-glazed and tempered villa windows across The Pearl, Lusail, Al Kheesa, and Al Gharrafa.',
      'Lowers summer AC electricity bills by keeping sunlit rooms up to 8°C–12°C cooler.',
    ],
    sections: [
      {
        heading: '1. Open Your Curtains Again with Daytime One-Way Villa Privacy',
        body: 'Most villa owners in Qatar keep heavy blackout curtains closed all day for family privacy and heat relief—turning bright architectural homes into dark caves. With our residential one-way privacy window tinting, outdoor daylight creates a subtle exterior privacy shield so passersby cannot see inside during the day, while your family enjoys an unobstructed view of your garden, courtyard, or pool.',
        proTip:
          'For apartments in The Pearl-Qatar and Lusail with strict facade appearance rules, our Invisible 50%–70% Nano-Ceramic film delivers 94% heat rejection with zero reflective mirror look.',
      },
      {
        heading: '2. Stopping UV Sun Bleaching on Luxury Furniture & Carpets',
        body: 'Direct Gulf sunlight through untreated glass will fade silk carpets, velvet Majlis seating, and artwork within months. Our house window tinting films incorporate dual-layer UV absorbers that block 99.9% of ultraviolet rays for 10+ years.',
      },
      {
        heading: '3. Respectful, Clean & Fast Home Installation',
        body: 'Our residential technicians arrive on time, wear clean shoe covers, protect your floors and furniture with drop-cloths, and leave every window pane spotless. Most standalone villas in Doha, Al Rayyan, and Wakra are completed in a single day.',
      },
    ],
    quickSpecComparison: [
      {
        metric: 'Daytime Family Privacy',
        withExoticTint: 'See Out Clearly / Private Inside',
        withoutProtection: 'Must Keep Curtains Closed',
      },
      {
        metric: 'Furniture & Carpet UV Fading',
        withExoticTint: '99.9% UV Blocked 24/7',
        withoutProtection: 'Rapid Sun Bleaching',
      },
      {
        metric: 'Villa Room Comfort',
        withExoticTint: 'Eliminates Window Heat Zones',
        withoutProtection: 'Hot Rooms Even With AC On',
      },
    ],
  },
  {
    slug: 'customized-cut-frosted-window-film-designs-qatar',
    id: 'blog-04',
    num: '03',
    category: 'Frosted Film Designs',
    title:
      '2026 Guide to Customized Cut Frosted Film Designs for Doha Offices & Homes',
    excerpt:
      'From CNC-cut corporate logos on glass meeting rooms to botanical & geometric privacy patterns for villa entrances—see how custom frosted film transforms plain glass.',
    readTime: '3 Min Read',
    publishDate: 'February 2026',
    author: 'Exotic Tint Qatar Design Studio',
    authorRole: 'CAD & CNC Plotter Specialists · Doha',
    bgClass: 'bg-[#fbbf24]',
    image: ASSETS.services.frostedFilm,
    alt: 'Customized cut frosted film designs on glass office partition in Qatar',
    relatedServiceSlug: 'frosted-decorative-film',
    relatedServiceTitle: 'Frosted & Decorative Film',
    keyTakeaways: [
      'Delivers 24/7 day-and-night visual privacy while still transmitting 75%+ of soft, natural ambient light.',
      'Up to 70% more affordable than permanent sandblasted or acid-etched glass—and 100% removable for future rebranding.',
      '0.1mm computer plotter precision for company logos, Arabic calligraphy, geometric bands, and botanical motifs.',
    ],
    sections: [
      {
        heading: '1. Why Custom-Cut Frosted Film Beats Sandblasted Glass',
        body: 'Permanent acid-etched glass is expensive, impossible to modify if your company rebrands, and easily stained by fingerprints. Our architectural polymeric frosted film replicates the exact matte-silver texture of etched glass, wipes clean effortlessly, and can be precision-cut on our computer plotters to feature any pattern or logo.',
        proTip:
          'Combine an eye-level frosted band (120cm–160cm height) with negative-cut company logos to give conference rooms privacy while keeping the top and bottom glass open.',
      },
      {
        heading: '2. Popular Frosted Film Applications in Qatar Homes & Offices',
        body: 'In commercial spaces across Doha, we install custom frosted film on boardroom partitions, HR offices, medical clinic cubicles, and reception doors. In residential villas, clients love our bespoke geometric and botanical frosted designs for Majlis dividers, stairwell windows, shower enclosures, and front entrance sidelights.',
      },
    ],
    quickSpecComparison: [
      {
        metric: 'Day & Night Privacy',
        withExoticTint: '24/7 Two-Way Visual Privacy',
        withoutProtection: 'Zero Privacy When Lights Are On',
      },
      {
        metric: 'Natural Light Transmission',
        withExoticTint: '75%–80% Soft Diffused Glow',
        withoutProtection: 'Blinds Block All Daylight',
      },
      {
        metric: 'Cost vs. Etched Glass',
        withExoticTint: 'Up to 70% Cost Savings',
        withoutProtection: 'Requires Full Glass Replacement',
      },
    ],
  },
  {
    slug: 'marble-protection-film-qatar-stone-wooden-table-shield',
    id: 'blog-05',
    num: '04',
    category: 'Marble & Wood Shield',
    title:
      'Marble Protection Film vs. Liquid Sealers: How to Stop Acid Etching & Scratches Forever',
    excerpt:
      'Lemon juice, Arabic coffee, perfume, and hot serving dishes can permanently etch Italian marble in seconds. Learn how optically clear self-healing TPU stone film protects marble and wood.',
    readTime: '4 Min Read',
    publishDate: 'January 2026',
    author: 'Exotic Tint Qatar Surface Lab',
    authorRole: 'Stone & Wood TPU Specialists · Qatar',
    bgClass: 'bg-[#f45b9a]',
    image: ASSETS.services.marbleProtection,
    alt: 'Marble protection film installation on luxury stone table in Qatar',
    relatedServiceSlug: 'surface-protection-film',
    relatedServiceTitle: 'Surface Protection Film',
    keyTakeaways: [
      'Traditional liquid stone sealers only slow down staining—they offer ZERO protection against acid etching (lemon, vinegar, soda) or physical scratches.',
      'Our 8-mil optical TPU marble protection film creates an impenetrable, invisible physical barrier over marble, onyx, travertine, and wooden tables.',
      'Self-healing topcoat makes fine utensil micro-scratches vanish automatically with warm water.',
      'Available in both mirror High-Gloss (for polished marble) and Satin-Matte (for honed stone and natural wood tables).',
    ],
    sections: [
      {
        heading: '1. The Hidden Truth About Porous Marble & Chemical Etching',
        body: 'Calacatta, Carrara, and Statuario marble slabs are rich in calcium carbonate. The moment a drop of lemon juice, salad dressing, tomato sauce, or bathroom perfume touches bare or liquid-sealed marble, a chemical reaction dissolves the polish and leaves a dull white chalky ring (an etch mark) that can only be fixed by mechanical diamond grinding. Exotic Tint Qatar’s marble protection film stops acids from ever touching the stone.',
        proTip:
          'Protect new kitchen islands, dining tables, and bathroom vanities immediately after handover before the first stain or scratch occurs.',
      },
      {
        heading: '2. Wooden Table Protection Film for Dining & Boardroom Tables',
        body: 'In addition to natural stone, our crystal-clear TPU film is the ultimate upgrade for solid walnut, oak, and high-gloss lacquered dining tables and office conference tables—preventing hot cup rings, kids’ cutlery scratches, and sun discoloration without hiding the natural wood grain.',
      },
    ],
    quickSpecComparison: [
      {
        metric: 'Lemon & Vinegar Acid Spills',
        withExoticTint: '100% Immune (Zero Etching)',
        withoutProtection: 'Permanent Dull Etch Marks',
      },
      {
        metric: 'Knife & Utensil Scratches',
        withExoticTint: '8-Mil Self-Healing TPU Armor',
        withoutProtection: 'Scratches Stone & Wood Finish',
      },
      {
        metric: 'Heat Resistance',
        withExoticTint: 'Up to 150°C Thermal Shield',
        withoutProtection: 'Hot Dishes Leave White Rings',
      },
    ],
  },
  {
    slug: 'fabric-nano-coating-qatar-sofa-carpet-hydrophobic-protection',
    id: 'blog-06',
    num: '05',
    category: 'Fabric Nano Coating',
    title:
      'Why Every Luxury Sofa & Majlis Carpet in Qatar Needs Hydrophobic SiO2 Nano Coating',
    excerpt:
      'Watch coffee, tea, juice, and chocolate spills bead up like mercury on white bouclé sofas and silk carpets—without changing the fabric’s softness, color, or breathability.',
    readTime: '4 Min Read',
    publishDate: 'January 2026',
    author: 'Exotic Tint Qatar Nano Care Team',
    authorRole: 'Certified SiO2 Textile Specialists · Qatar',
    bgClass: 'bg-[#a78bfa]',
    image: ASSETS.services.fabricNanoCoating,
    alt: 'Fabric nano coating service for sofa in Qatar showing liquid spill beading',
    relatedServiceSlug: 'fabric-nano-coating',
    relatedServiceTitle: 'Fabric Nano Coating',
    keyTakeaways: [
      'SiO2 (silicon dioxide) nanoparticles wrap around individual textile fibers at a molecular level without clogging the weave.',
      'Spills of Arabic coffee, Karak tea,berry juice, or sauces stay suspended as round droplets on top of the cushion.',
      '100% non-toxic, odor-free once cured, and safe for children, babies, and pets.',
      'Applied 100% on-site at your villa across Doha, Lusail, The Pearl, Al Kheesa, Al Gharrafa, and Al Rayyan.',
    ],
    sections: [
      {
        heading: '1. How SiO2 Fabric Nano Coating Works on White & Cream Sofas',
        body: 'Interior design in Qatar favors bright cream, ivory, and beige linen, velvet, and bouclé upholstery—as well as intricate Majlis seating and silk carpets. Unlike cheap store-bought silicone sprays that leave a sticky residue and chemical smell, our professional SiO2 fabric nano coating forms a microscopic lotus-leaf structure on every fiber. When liquid is spilled, surface tension forces it into tight spheres that cannot penetrate the cushion foam.',
        proTip:
          'When a spill happens on a nano-coated sofa, do not rub it in! Simply touch a dry tissue to the droplet and watch the liquid wick straight into the paper towel.',
      },
      {
        heading: '2. Ideal for Majlis Suites, Dining Chairs, Silk Rugs & Curtains',
        body: 'Our mobile team treats complete villa living rooms, traditional and modern Majlis halls, upholstered dining chairs, bedroom headboards, Persian carpets, and fabric curtains right at your home in 60 to 120 minutes.',
      },
    ],
    quickSpecComparison: [
      {
        metric: 'Coffee, Tea & Juice Spills',
        withExoticTint: 'Beads Up & Blots Away Cleanly',
        withoutProtection: 'Soaks Deep Into Cushion Foam',
      },
      {
        metric: 'Fabric Feel & Breathability',
        withExoticTint: '100% Soft, Invisible & Natural',
        withoutProtection: 'Requires Ugly Plastic Covers',
      },
      {
        metric: 'Family & Child Safety',
        withExoticTint: 'Water-Based Non-Toxic SiO2',
        withoutProtection: 'Harsh Stain-Remover Chemicals',
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
