import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center space-y-5">
      <p className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#f27438]">404</p>
      <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">Page not found</h1>
      <p className="text-sm text-slate-300">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link
        href={ROUTES.home}
        className="inline-flex px-6 py-3 rounded-2xl bg-[#d9f941] text-[#121118] font-display font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000]"
      >
        Back to Home
      </Link>
    </section>
  );
}
