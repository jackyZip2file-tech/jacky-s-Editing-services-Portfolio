'use client';

import { motion, useReducedMotion } from 'framer-motion';

const STATS = [
  { value: '7', label: 'Years editing' },
  { value: '3', label: 'Core tools' },
  { value: '100%', label: 'Human-edited' },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="top" className="relative overflow-hidden border-b border-ink/10 pt-[68px]">
      {/* Gold side gradients fading upward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gold-rise opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-[320px] w-[320px] rounded-full bg-gold-400/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-[260px] w-[260px] rounded-full bg-gold-500/20 blur-[100px]"
      />

      <div className="container-sharp relative z-10 pb-20 pt-16 sm:pb-24 sm:pt-24">
        <motion.div {...rise(0)} className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border border-ink bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-ink">
            <span className="h-[6px] w-[6px] rounded-full bg-gold-500" aria-hidden="true" />
            Open for work
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/50">
            Video Editor &amp; Visual Designer
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          className="mt-7 max-w-[15ch] font-display text-[clamp(2.6rem,7.2vw,5.4rem)] font-bold leading-[0.94] tracking-[-0.03em] text-ink"
        >
          Edits that keep
          <br />
          people <span className="gold-text">watching</span>.
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-ink/70 sm:text-base"
        >
          I&apos;m Jacky. Nearly seven years of cutting video — trendy viral edits, meme
          compilations, clean tutorials and reference-driven recreations. Every frame is placed by
          hand. AI is a tool on my bench, never the hand on the timeline.
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="btn-sharp bg-ink text-white shadow-sharp-sm transition-transform hover:-translate-y-[2px] hover:bg-gold-500 hover:text-ink"
          >
            View the work
          </a>
          <a
            href="#process"
            className="btn-sharp border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-white"
          >
            How to work with me
          </a>
          <a
            href="#contact"
            className="focus-ring text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/55 underline decoration-ink/20 underline-offset-[6px] transition-colors hover:text-ink"
          >
            Get a quote
          </a>
        </motion.div>

        <motion.dl
          {...rise(0.32)}
          className="mt-16 grid max-w-[620px] grid-cols-3 border-t border-ink/15 pt-6"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="border-r border-ink/10 pr-4 last:border-r-0 last:pl-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {stat.value}
              </dd>
              <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
