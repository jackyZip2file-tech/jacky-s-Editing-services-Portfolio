'use client';

import Image from 'next/image';
import Reveal from '@/components/Reveal';

const TIMELINE = [
  {
    year: '2019',
    title: 'The lockdown rabbit hole',
    body: 'Chess, content, random digital tools — then video editing ate everything else.',
  },
  {
    year: '2021',
    title: 'Hobby becomes a skill',
    body: 'Hundreds of personal edits. Timing, pacing and sound design drilled into muscle memory.',
  },
  {
    year: '2023',
    title: 'First paid client',
    body: 'Family asked for an edit, loved it, insisted on paying. The bench went professional.',
  },
  {
    year: 'Today',
    title: 'Open for creators & brands',
    body: 'Bring the footage. I bring pacing, humour and a clean delivery.',
  },
];

const PRINCIPLES = [
  {
    title: 'Zero AI slop',
    body: 'No lazy prompt-and-publish. Every cut, caption and sound cue is decided by a human who cares how it lands.',
  },
  {
    title: 'AI as a scalpel',
    body: 'Clean voiceovers when the original audio is unusable, generated reference assets, targeted upscales — precision only, never filler.',
  },
  {
    title: 'Retention first',
    body: 'Hook in the first second, momentum through the middle, payoff before the drop-off. The edit serves the watch time.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative border-b border-ink/10 bg-white">
      <div className="container-sharp py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Introduction visual */}
          <Reveal>
            <figure className="relative mx-auto max-w-[420px] lg:mx-0">
              <div className="relative border-2 border-ink bg-white p-2 shadow-sharp">
                <div className="relative aspect-square w-full overflow-hidden border border-ink bg-ink">
                  <Image
                    src="/images/introduction.png"
                    alt="Jacky — the editor behind the timeline"
                    fill
                    sizes="(max-width: 1024px) 420px, 420px"
                    loading="eager"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="absolute -bottom-3 right-3 border border-ink bg-gold-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-ink">
                Human-edited · since 2019
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">01 — About</p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
                Hey, I&apos;m Jacky.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/70">
              <p>
                My editing journey started nearly seven years ago, during the 2019–2020 lockdowns.
                With plenty of free time at home, I dove into the internet to pick up new hobbies —
                playing chess, creating content, and experimenting with digital tools. Out of
                everything I tried, video editing completely hooked me.
              </p>
              <p>
                Growing up, I always had ideas, jokes and creative concepts in my head that I
                struggled to put into words. Editing became my voice — the best way to express my
                humour, creativity and style visually. Whether it&apos;s fast-paced trendy edits,
                meme compilations, clean tutorials or reference-heavy videos, I love crafting edits
                that keep people watching.
              </p>
              <p>
                What started as a hobby turned into a serious skill. The turning point came when
                family members asked me to put together a personal edit for them — they loved the
                result so much they insisted on paying. That moment made it real: this is something
                I can bring to other creators and clients.
              </p>
              <p className="border-l-2 border-gold-500 pl-4 font-medium text-ink">
                Today I&apos;m here to bring that same energy, creativity and sharp attention to
                detail to your videos.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">The philosophy</p>
            </Reveal>
            <div className="mt-5 space-y-px border border-ink bg-ink/10">
              {PRINCIPLES.map((item, index) => (
                <Reveal key={item.title} delay={0.06 * index}>
                  <div className="group bg-white p-6 transition-colors duration-300 hover:bg-gold-50">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-[11px] font-bold tracking-[0.2em] text-gold-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">The road here</p>
            </Reveal>
            <ol className="mt-5 space-y-5">
              {TIMELINE.map((step, index) => (
                <li key={step.year}>
                  <Reveal delay={0.05 * index} className="flex gap-4">
                    <span className="mt-[3px] w-14 shrink-0 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-gold-600">
                      {step.year}
                    </span>
                    <div className="border-l border-ink/15 pl-4">
                      <p className="text-sm font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">{step.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
