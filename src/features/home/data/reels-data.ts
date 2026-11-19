import { ASSETS } from '@/config/assets';

export interface ReelSlide {
  id: string;
  num: string;
  title: string;
  caption: string;
  serviceSlug: string;
  serviceTitle: string;
  location: string;
  durationSec: number;
  durationFormatted: string;
  views: string;
  likes: number;
  comments: number;
  shares: number;
  image: string;
  badgeText: string;
  accentColor: string;
  topComment: {
    author: string;
    text: string;
  };
}

export const REELS_ITEMS: ReelSlide[] = [
  {
    id: 'reel-02',
    num: '01',
    title: 'Red Juice Spill Test on Nano-Coated Majlis Sofa!',
    caption:
      'Watch berry juice & coffee bead right off this cream sofa thanks to our hydrophobic SiO2 Fabric Nano Coating.',
    serviceSlug: 'fabric-nano-coating',
    serviceTitle: 'Fabric Nano Coating',
    location: 'Al Gharrafa & The Pearl',
    durationSec: 28,
    durationFormatted: '00:28',
    views: '62.9K',
    likes: 519,
    comments: 42,
    shares: 64,
    image: ASSETS.services.fabricNanoCoating,
    badgeText: 'HYDROPHOBIC SOFA SHIELD',
    accentColor: '#a78bfa',
    topComment: {
      author: '@noora_interiors_qa',
      text: 'Every white Majlis sofa in Qatar needs this treatment 💯',
    },
  },
  {
    id: 'reel-03',
    num: '02',
    title: '8-Mil Self-Healing TPU Marble Protection Film',
    caption:
      'Optical wet-bond stone protection film stops lemon acid etching, coffee stains & scratches on Italian marble islands.',
    serviceSlug: 'surface-protection-film',
    serviceTitle: 'Surface Protection Film',
    location: 'The Pearl-Qatar Villa',
    durationSec: 45,
    durationFormatted: '00:45',
    views: '54.1K',
    likes: 418,
    comments: 31,
    shares: 27,
    image: ASSETS.services.marbleProtection,
    badgeText: 'ACID & SCRATCH IMMUNE',
    accentColor: '#f45b9a',
    topComment: {
      author: '@debra_reyes_qa',
      text: 'My marble dining table and kitchen island look brand new!',
    },
  },
  {
    id: 'reel-04',
    num: '03',
    title: 'Commercial Window Tinting Doha — 32% AC Savings',
    caption:
      'Architectural solar-control & one-way mirror film installation for commercial office towers in West Bay & Lusail.',
    serviceSlug: 'sun-control-window-film',
    serviceTitle: 'Sun Control Window Film',
    location: 'West Bay Doha',
    durationSec: 38,
    durationFormatted: '00:38',
    views: '31.7K',
    likes: 264,
    comments: 16,
    shares: 14,
    image: ASSETS.services.commercial,
    badgeText: '-32% HVAC COOLING LOAD',
    accentColor: '#d9f941',
    topComment: {
      author: '@miranda_snyder_doha',
      text: 'Eliminated screen glare across our entire office floor.',
    },
  },
  {
    id: 'reel-05',
    num: '04',
    title: 'Daytime One-Way Villa Privacy Window Tinting',
    caption:
      'Keep your villa curtains open all day with crystal-clear outside views, 99.9% UV block, and full daytime privacy.',
    serviceSlug: 'sun-control-window-film',
    serviceTitle: 'Sun Control Window Film',
    location: 'Al Rayyan & Lusail Villas',
    durationSec: 41,
    durationFormatted: '00:41',
    views: '44.6K',
    likes: 387,
    comments: 24,
    shares: 22,
    image: ASSETS.services.residential,
    badgeText: 'ONE-WAY VILLA PRIVACY',
    accentColor: '#6ee7b7',
    topComment: {
      author: '@umm_abdullah_qa',
      text: 'Best upgrade we did for our living room and pool glass!',
    },
  },
  {
    id: 'reel-06',
    num: '05',
    title: '0.1mm CNC Customized Cut Frosted Film Designs',
    caption:
      'Precision plotter-cut frosted glass partition patterns, Arabic motifs, and corporate logos installed in Doha.',
    serviceSlug: 'frosted-decorative-film',
    serviceTitle: 'Frosted & Decorative Film',
    location: 'Doha Corporate Suites',
    durationSec: 32,
    durationFormatted: '00:32',
    views: '29.3K',
    likes: 235,
    comments: 19,
    shares: 15,
    image: ASSETS.services.frostedFilm,
    badgeText: 'CUSTOM CNC GLASS DESIGN',
    accentColor: '#fbbf24',
    topComment: {
      author: '@arch_studio_qatar',
      text: 'Looks just like luxury etched glass at a fraction of the cost.',
    },
  },
];
