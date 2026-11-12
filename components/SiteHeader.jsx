'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteHeader() {
  const { user, isOwner, loading, signIn, signOutUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-sharp ${
        scrolled
          ? 'border-ink bg-white/90 backdrop-blur-md'
          : 'border-transparent bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="container-sharp flex h-[68px] items-center justify-between">
        <a href="#top" className="focus-ring group flex items-center gap-2.5">
          <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full border border-ink bg-white ring-1 ring-gold-400/70 ring-offset-1 ring-offset-white">
            <Image
              src="/images/pfp.png"
              alt="Jacky"
              fill
              sizes="36px"
              priority
              className="object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-[0.18em] text-ink">
            Jacky
          </span>
          <span className="h-[7px] w-[7px] rounded-full bg-gold-500" aria-hidden="true" />
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/45 sm:block">
            Editor
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring group relative text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold-500 transition-all duration-300 ease-sharp group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-8 w-8 rounded-full border border-ink object-cover"
                />
              ) : null}
              <span className="max-w-[120px] truncate text-[12px] font-semibold text-ink/70">
                {isOwner ? 'Owner' : user.displayName || 'Signed in'}
              </span>
              <button
                type="button"
                onClick={signOutUser}
                className="focus-ring text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={signIn}
              className="focus-ring hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-ink sm:block"
              title="Owner sign-in"
            >
              Owner Sign-In
            </button>
          )}

          <a
            href="#contact"
            className="btn-sharp hidden bg-ink text-white hover:bg-gold-500 hover:text-ink sm:inline-flex"
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring flex h-9 w-9 items-center justify-center border border-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-[4px]">
              <span className="block h-[2px] w-4 bg-ink" />
              <span className="block h-[2px] w-4 bg-ink" />
              <span className="block h-[2px] w-4 bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-ink/10 bg-white md:hidden"
        >
          <div className="container-sharp flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink/5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink/75"
              >
                {link.label}
              </a>
            ))}
            {!user ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signIn();
                }}
                className="py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45"
              >
                Owner Sign-In
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signOutUser();
                }}
                className="py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45"
              >
                Sign out
              </button>
            )}
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
