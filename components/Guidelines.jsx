'use client';

import Reveal from '@/components/Reveal';
import { FILE_HOSTS } from '@/lib/data';

const CARDS = [
  {
    number: '01',
    title: 'Sending Raw Footage',
    body: 'Upload raw files to a fast file transfer host and send me the link. Clean, single-link delivery keeps the project organized.',
    items: FILE_HOSTS,
    footnote: 'Please send one combined folder link and keep it active until final delivery.',
  },
  {
    number: '02',
    title: 'Format & Size Specs',
    body: 'I edit primarily on CapCut Desktop. CapCut does not natively support heavy 4K 60fps HDR or 20GB ProRes .mov files.',
    items: [
      'No native 4K 60fps HDR files',
      'No raw DaVinci ProRes .mov (19–20 GB)',
      'Converted to 1080p / 30fps standard',
      'Resulting working file ≈ 1 GB',
    ],
    footnote:
      'If you have massive raw files, you can still send them! I will compress/convert them to 1080p/30fps standard bitrate before editing.',
  },
  {
    number: '03',
    title: 'Pricing & PayPal',
    body: 'Pricing is completely negotiable depending on project scope (runtime, effects, turnaround time). Pitch your budget and we agree before work starts.',
    items: [
      'Flexible, scope-based pricing',
      'Pitch your budget upfront',
      'Payments accepted via PayPal',
      'Clear milestones & revisions',
    ],
    footnote: 'Zero surprise fees. If scope expands, we agree on adjustments before doing the work.',
  },
];

export default function Guidelines() {
  return (
    <section id="process" className="relative border-b border-ink/10 bg-white">
      <div className="container-sharp py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">04 — Client Guidelines</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
              How to work with me
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[42ch] text-sm leading-relaxed text-ink/70">
              Clear rules so your project runs smoothly from raw footage to final delivery.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card, index) => (
            <Reveal key={card.number} delay={0.06 * index}>
              <article className="flex h-full flex-col border-2 border-ink bg-white shadow-sharp-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between border-b-2 border-ink bg-gold-400 px-5 py-3">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
                    {card.title}
                  </h3>
                  <span className="font-display text-[11px] font-bold tracking-[0.18em] text-ink/70">
                    {card.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[13.5px] leading-relaxed text-ink/75">{card.body}</p>
                  <ul className="mt-4 space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-ink/80">
                        <span
                          className="mt-[6px] h-[6px] w-[6px] shrink-0 bg-gold-500"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-ink/10 pt-4 text-[12px] leading-relaxed text-ink/50">
                    {card.footnote}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-5 border-2 border-ink bg-ink p-6 text-white shadow-sharp sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400">
                Ready to cut your project?
              </p>
              <p className="mt-1.5 max-w-[56ch] font-display text-lg font-bold leading-snug tracking-tight">
                Send the brief, file link, and your budget. Delivered ready to post with quick turnaround.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-sharp shrink-0 border-gold-400 bg-gold-400 text-ink hover:bg-white"
            >
              Start A Project
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
