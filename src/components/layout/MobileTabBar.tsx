'use client';

import type { ComponentType } from 'react';
import { usePathname } from 'next/navigation';
import { CalendarCheck, House, Images, LayoutGrid } from 'lucide-react';
import SiteLink from '@/components/ui/SiteLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { ROUTES, getActivePage, getActiveServiceSlug, type PageKey } from '@/config/routes';

interface MobileTabBarProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

interface Tab {
  key: PageKey;
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

/**
 * App-style bottom navigation for phones (< md): Home · Services · WhatsApp · Gallery · Book.
 * Tabs are real links (crawlable); the centre button opens the WhatsApp chat panel.
 */
export default function MobileTabBar({ chatOpen, onToggleChat }: MobileTabBarProps) {
  const pathname = usePathname();
  const active = getActivePage(pathname);
  // On a service page "Book" jumps to that page's booking form; elsewhere it opens Contact.
  const bookHref = getActiveServiceSlug(pathname) ? '#service-booking-ticket' : ROUTES.contact;

  const left: Tab[] = [
    { key: 'home', label: 'Home', href: ROUTES.home, Icon: House },
    { key: 'services', label: 'Services', href: ROUTES.services, Icon: LayoutGrid },
  ];
  const right: Tab[] = [
    { key: 'gallery', label: 'Gallery', href: ROUTES.gallery, Icon: Images },
    { key: 'contact', label: 'Book', href: bookHref, Icon: CalendarCheck },
  ];

  const renderTab = ({ key, label, href, Icon }: Tab) => {
    const isActive = active === key;
    const className = `flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl text-[10px] font-extrabold transition-colors ${
      isActive ? 'text-[#d9f941]' : 'text-slate-300 active:text-white'
    }`;
    const content = (
      <>
        <span
          className={`flex items-center justify-center w-10 h-7 rounded-full transition-colors ${
            isActive ? 'bg-[#d9f941]/15' : ''
          }`}
        >
          <Icon className="w-5 h-5" />
        </span>
        <span>{label}</span>
      </>
    );
    return href.startsWith('#') ? (
      <a key={key} href={href} className={className}>
        {content}
      </a>
    ) : (
      <SiteLink
        key={key}
        href={href}
        className={className}
        aria-current={isActive ? 'page' : undefined}
      >
        {content}
      </SiteLink>
    );
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#121118]/95 backdrop-blur-xl border-t-2 border-black shadow-[0_-6px_24px_rgba(0,0,0,0.55)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-end px-2 pt-1.5 pb-1.5">
        {left.map(renderTab)}

        {/* Centre WhatsApp action, raised above the bar like an app FAB */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            data-whatsapp-launcher
            onClick={onToggleChat}
            aria-label={chatOpen ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
            aria-expanded={chatOpen}
            aria-controls="whatsapp-chat-panel"
            className="-mt-7 w-14 h-14 rounded-full flex items-center justify-center text-white border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-transform cursor-pointer"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon className="w-7 h-7" />
          </button>
          <span className="text-[10px] font-extrabold text-[#25D366] mt-0.5">WhatsApp</span>
        </div>

        {right.map(renderTab)}
      </div>
    </nav>
  );
}
