import { ASSETS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

/** The transparent logo icon mark. Size (and any frame) comes from `className`. */
export function BrandLogo({ className, alt = `${SITE_CONFIG.name} Logo` }: BrandLogoProps) {
  return (
    <span className={cn('flex items-center justify-center overflow-hidden shrink-0', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.brand.logoMark}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain"
      />
    </span>
  );
}

/** "Exotic Tint Qatar" wordmark, matching the logo: "Exotic" in the logo's blue (#049adb). */
export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="text-[#049adb]">Exotic</span> Tint Qatar
    </span>
  );
}
