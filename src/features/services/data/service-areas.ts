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
    service: 'Sun Control Window Film',
    title: 'Lusail',
    sub: 'Window Tinting & Marble Protection in Lusail',
    bg: 'bg-[#f27438]',
    rotate: 'sm:-rotate-2',
    icon: '🏙️',
  },
  {
    area: 'Al kheesa',
    service: 'Sun Control Window Film',
    title: 'Al kheesa',
    sub: 'Villa Window Film & Privacy Tint',
    bg: 'bg-[#d9f941]',
    rotate: 'sm:rotate-2',
    icon: '🏡',
  },
  {
    area: 'Al garaffa',
    service: 'Fabric Nano Coating',
    title: 'Al garaffa',
    sub: 'House Window Tinting & Nano Coating for Sofa',
    bg: 'bg-[#f45b9a]',
    rotate: 'sm:-rotate-1',
    icon: '🛋️',
  },
  {
    area: 'Pearl qatar',
    service: 'Surface Protection Film',
    title: 'Pearl qatar',
    sub: 'Luxury Villa Glass Tint & Stone Protection Film',
    bg: 'bg-[#6ee7b7]',
    rotate: 'sm:rotate-2',
    icon: '🏝️',
  },
  {
    area: 'Doha',
    service: 'Sun Control Window Film',
    title: 'Doha',
    sub: 'Commercial Window Tinting Doha & Frosted Film',
    bg: 'bg-[#a78bfa]',
    rotate: 'sm:-rotate-2',
    icon: '🏢',
  },
  {
    area: 'Al Rayyan',
    service: 'Sun Control Window Film',
    title: 'Al Rayyan',
    sub: 'Heat Rejection Window Film & UV Protection',
    bg: 'bg-[#fbbf24]',
    rotate: 'sm:rotate-1',
    icon: '☀️',
  },
  {
    area: 'Wakra',
    service: 'Safety & Security Film',
    title: 'Wakra',
    sub: 'Home Window Film & Glass Safety Film',
    bg: 'bg-[#4fd1c5]',
    rotate: 'sm:-rotate-2',
    icon: '🛡️',
  },
  {
    area: 'Doha',
    service: 'Frosted & Decorative Film',
    title: 'Surrounding Areas',
    sub: 'Mobile & On-Site Service Across Qatar',
    bg: 'bg-[#f8fafc]',
    rotate: 'sm:rotate-1',
    icon: '📍',
  },
];
