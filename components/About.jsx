'use client';

import Image from 'next/image';
import Reveal from '@/components/Reveal';

const TIMELINE = [
  {
    year: '2019',
    title: 'The Lockdown Spark',
    body: 'Stuck inside during the 2019–2020 lockdowns. Played chess, experimented with random creative tools — and video editing instantly hooked me.',
  },
  {
    year: '2021',
    title: 'Honing the Craft & Timing',
    body: 'Hundreds of personal edits. Kinetic captioning, meme dynamics, sound design, and retention pacing became pure muscle memory.',
  },
  {
    year: '2023',
    title: 'The Professional Turning Point',
    body: 'Family asked for a personal video edit. They loved the result so much they insisted on paying — proving my craft held real value.',
  },
  {
    year: 'Today',
    title: 'Open for Creators & Brands',
    body: 'Ready to bring that exact same high energy, sharp humor, and frame-accurate attention to detail to your next video.',
  },
];

const PHILOSOPHY_PILLARS = [
  {
    title: 'Zero AI Slop Guarantee',
    body: 'I hate AI slop. I never rely on lazy automated filler or soulless prompt-and-dump videos. Every single cut, text animation, and audio cue is chosen by a human editor.',
    accent: 'border-l-4 border-gold-500',
  },
  {
    title: 'AI Strictly as a Precision Scalpel',
    body: 'I only touch AI for targeted utility: clean AI voiceovers when the client’s original microphone failed, custom reference images, or targeted visual upscales.',
    accent: 'border-l-4 border-ink',
  },
  {
    title: 'Retention-First Pacing',
    body: 'Hooking the viewer in the first 2 seconds, maintaining kinetic momentum through the middle, and delivering the punchline before they can scroll away.',
    accent: 'border-l-4 border-gold-400',
  },
];

export default function About() {
  return (
    <section id="about" className="relative border-b border-ink/10 bg-white">
      <div className="container-sharp py-16 sm:py-24">
        {/* Main Grid: Portrait + Bio Story */}
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Column 1: Robotic Renaissance Graphic */}
          <Reveal>
            <figure className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              <div className="relative border-2 border-ink bg-white p-3 shadow-sharp">
                <div className="relative aspect-square w-full overflow-hidden border border-ink bg-ink">
                  <Image
                    src="/images/introduction.png"
                    alt="Jacky — Robotic Renaissance portrait"
                    fill
                    sizes="(max-width: 1024px) 420px, 420px"
                    priority
                    className="object-cover"
                  />
                  {/* Subtle top badge */}
                  <span className="absolute left-2.5 top-2.5 border border-ink bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-ink shadow-sharp-sm">
                    Jacky // Visual Identity
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/60">
                    The Editor Behind The Timeline
                  </span>
                  <span className="border border-ink bg-gold-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
                    Since 2019
                  </span>
                </div>
              </div>

              {/* Verified Anti-AI Slop Seal */}
              <div className="mt-4 flex items-center gap-2.5 border border-ink bg-gold-50 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-sharp-sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="text-gold-600"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636Zm.287 5.984-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L6.5 9.293l3.146-3.147a.5.5 0 0 1 .708.708Z" />
                </svg>
                <span>Anti-AI Slop Guarantee: 100% Hand-Crafted</span>
              </div>
            </figure>
          </Reveal>

          {/* Column 2: Bio & Personal Story */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="eyebrow">01 — About Jacky</span>
                <span className="h-1 w-6 bg-gold-500" />
              </div>
              <h2 className="mt-3 font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
                Hey, I&apos;m Jacky!
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-600">
                Nearly 7 years of turning creative chaos into high-retention video
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/75">
              <p>
                My editing journey started nearly 7 years ago during the 2019–2020 lockdowns. With
                plenty of free time at home, I dove into the internet to pick up new hobbies — playing
                chess, creating content, and experimenting with digital tools. Out of everything I
                tried, video editing completely hooked me.
              </p>
              <p>
                Growing up, I always had tons of ideas, jokes, and creative concepts in my head that I
                struggled to put into words. Editing became my voice — the best way for me to express
                my humor, creativity, and style visually. Whether it&apos;s fast-paced trendy edits,
                meme compilations, clean tutorials, or reference-heavy videos, I love crafting edits
                that keep people watching.
              </p>
              <p>
                What started purely as a fun hobby quickly turned into a serious skill. The turning
                point came when family members asked me to put together a personal video edit for
                them. They loved the final result so much that they insisted on paying me for my work.
                That moment made me realize I could turn my passion into real value for other
                creators and clients.
              </p>
              <p className="border-l-2 border-gold-500 bg-gold-50/50 py-2.5 pl-4 pr-3 font-medium text-ink">
                Today, I&apos;m here to bring that same energy, creativity, and sharp attention to
                detail to your videos. Check out my work below, see my editing styles, and reach out
                through my socials if you&apos;re ready to make something great together!
              </p>
            </Reveal>
          </div>
        </div>

        {/* Section 2: Philosophy Callout (Anti-AI Slop Manifesto) */}
        <div className="mt-16">
          <Reveal>
            <div className="border-2 border-ink bg-ink p-7 text-white shadow-sharp sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold-400">
                  Creative Philosophy // Anti-&quot;AI Slop&quot;
                </span>
                <span className="border border-gold-400/40 bg-gold-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
                  Human-Led Timeline
                </span>
              </div>

              <h3 className="mt-4 font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
                &ldquo;I hate AI slop. Every cut, pause, and joke is placed by human hands.&rdquo;
              </h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {PHILOSOPHY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className={`bg-white/5 p-5 backdrop-blur-sm ${pillar.accent}`}
                  >
                    <h4 className="font-display text-base font-bold text-white">
                      {pillar.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Section 3: 7-Year Timeline */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center justify-between border-b border-ink/15 pb-4">
              <div>
                <p className="eyebrow">The 7-Year Journey</p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  How the hobby became a career
                </h3>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-600">
                2019 → Present
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((step, index) => (
              <Reveal key={step.year} delay={0.05 * index}>
                <div className="flex h-full flex-col border border-ink bg-white p-5 shadow-sharp-sm transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                    <span className="font-display text-lg font-bold text-gold-600">
                      {step.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                      Phase 0{index + 1}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-base font-bold text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/65">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
