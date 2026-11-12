'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { CONTACT_CHANNELS } from '@/lib/data';

const BAR_COLORS = {
  fast: 'bg-gold-500',
  good: 'bg-gold-400',
  mid: 'bg-gold-300',
  slow: 'bg-ink/30',
};

export default function Contact() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden border-b border-ink/10 bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gold-rise opacity-50"
      />
      <div className="container-sharp relative z-10 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">05 — Contact &amp; Availability</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
              Reach me where I actually reply
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[42ch] text-sm leading-relaxed text-ink/70">
              The response rates below are completely honest. Pick the channel with the highest
              bar for the quickest turnaround.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {CONTACT_CHANNELS.map((channel, index) => (
            <Reveal key={channel.name} delay={0.05 * index}>
              <a
                href={channel.href}
                target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex h-full flex-col border-2 border-ink bg-white p-5 shadow-sharp-sm transition-all duration-300 ease-sharp hover:-translate-y-1 hover:shadow-sharp sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink group-hover:text-gold-600 transition-colors">
                      {channel.name}
                    </h3>
                    <p className="mt-0.5 break-all text-[12px] font-medium text-ink/50">
                      {channel.handle}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 border border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${
                      channel.tone === 'slow' ? 'bg-white text-ink/60' : 'bg-gold-400 text-ink'
                    }`}
                  >
                    {channel.label}
                  </span>
                </div>

                {/* Response Meter */}
                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">
                      Response Rate
                    </span>
                    <span className="font-display text-sm font-bold text-ink">{channel.rate}%</span>
                  </div>
                  <div className="mt-2 h-[8px] w-full border border-ink/20 bg-ink/5">
                    <motion.div
                      className={`h-full ${BAR_COLORS[channel.tone] || 'bg-gold-400'}`}
                      initial={!mounted || reduce ? { width: `${channel.rate}%` } : { width: 0 }}
                      animate={mounted ? { width: `${channel.rate}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-ink/65">{channel.note}</p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/60 transition-colors group-hover:text-ink">
                  Connect on {channel.name}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M2 10L10 2M4 2h6v6" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start gap-4 border-2 border-ink bg-ink px-6 py-7 text-white shadow-sharp sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400">
                Direct Inquiries
              </p>
              <p className="mt-1 font-display text-xl font-bold tracking-tight">
                Pitch your budget &amp; send the footage link
              </p>
            </div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sharp border-gold-400 bg-gold-400 text-ink transition-colors hover:bg-white"
            >
              DM On Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
