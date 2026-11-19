/** Area "stickers" shown on the home page and dispatch zones on About/Contact. */
export interface ServiceArea {
  area: string;
  service: string;
  title: string;
  sub: string;
  bg: string;
  rotate: string;
  icon: string;
}

export const SERVICE_AREAS_DATA: ServiceArea[] = [
  {
    area: 'Lusail',
    service: 'Residential Window Tinting',
    title: 'Lusail',
    sub: 'Window Tinting & Marble Protection in Lusail',
    bg: 'bg-[#f27438]',
    rotate: 'sm:-rotate-2',
    icon: '🏙️',
  },
  {
    area: 'Al kheesa',
    service: 'Automotive Window Tinting',
    title: 'Al kheesa',
    sub: 'Car Window Tinting Home Service & Villa Tint',
    bg: 'bg-[#d9f941]',
    rotate: 'sm:rotate-2',
    icon: '🚗',
  },
  {
    area: 'Al garaffa',
    service: 'Fabric Nano Coating Service',
    title: 'Al garaffa',
    sub: 'House Window Tinting & Nano Coating for Sofa',
    bg: 'bg-[#f45b9a]',
    rotate: 'sm:-rotate-1',
    icon: '🛋️',
  },
  {
    area: 'Pearl qatar',
    service: 'Marble Protection Film',
    title: 'Pearl qatar',
    sub: 'Luxury Villa Glass Tint & Stone Protection Film',
    bg: 'bg-[#6ee7b7]',
    rotate: 'sm:rotate-2',
    icon: '🏝️',
  },
  {
    area: 'Doha',
    service: 'Commercial Window Tinting',
    title: 'Doha',
    sub: 'Commercial Window Tinting Doha & Frosted Film',
    bg: 'bg-[#a78bfa]',
    rotate: 'sm:-rotate-2',
    icon: '🏢',
  },
  {
    area: 'Al Rayyan',
    service: 'Residential Window Tinting',
    title: 'Al Rayyan',
    sub: 'Heat Rejection Window Film & UV Protection',
    bg: 'bg-[#fbbf24]',
    rotate: 'sm:rotate-1',
    icon: '☀️',
  },
  {
    area: 'Wakra',
    service: 'Automotive Window Tinting',
    title: 'Wakra',
    sub: 'Vehicle Window Tinting Near Me & Home Tint',
    bg: 'bg-[#4fd1c5]',
    rotate: 'sm:-rotate-2',
    icon: '🛡️',
  },
  {
    area: 'Doha',
    service: 'Customized Cut Frosted Film',
    title: 'Surrounding Areas',
    sub: 'Mobile Car Tinting & On-Site Protection Across Qatar',
    bg: 'bg-[#f8fafc]',
    rotate: 'sm:rotate-1',
    icon: '📍',
  },
];
