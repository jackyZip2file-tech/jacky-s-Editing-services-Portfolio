'use client';

import Reveal from '@/components/Reveal';
import { FILE_HOSTS } from '@/lib/data';

const CARDS = [
  {
    number: '01',
    title: 'Send your footage',
    body: 'Upload raws to a fast transfer host and drop me the link. No zip-of-zips, no 40-message file dumps.',
    items: FILE_HOSTS,
    footnote: 'Prefer one link per project. Keep the link live until delivery.',
  },
  {
    number: '02',
    title: 'Format & size limits',
    body: 'I edit on CapCut Desktop. It does not handle native HDR or heavy-bitrate ProRes, so massive raw camera files need one conversion step first.',
    items: [
      'No native 4K 60fps HDR',
      'No ProRes .mov (19–20 GB range)',
      'Converted to 1080p / 30fps first',
      'Resulting file ≈ 1 GB',
    ],
    footnote:
      'Send it anyway if you want — I convert and compress it to 1080p/30fps standard bitrate before touching the timeline. You keep the full edit, just not the raw codec.',
  },
  {
    number: '03',
    title: 'Pricing & payment',
    body: 'Pricing is negotiable and depends on scope: length, footage volume, effect work, revisions. Pitch a budget and we agree on a fair rate before I start.',
    items: ['You pitch a number', 'We agree in writing', 'Payments via PayPal', 'Work starts after agreement'],
    footnote: 'No surprise invoices. Scope changes get re-quoted before they happen.',
  },
];

export default function Guidelines() {
  return (
    <section id="process" className="relative border-b border-ink/10 bg-white">
      <div className="container-sharp py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">04 — Client guidelines</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
              How to work with me
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[40ch] text-sm leading-relaxed text-ink/60">
              Three rules cover 90% of the friction. Read them once and the project runs smooth
              from brief to delivery.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card, index) => (
            <Reveal key={card.number} delay={0.06 * index}>
              <article className="flex h-full flex-col border border-ink bg-white">
                <div className="flex items-center justify-between border-b border-ink bg-gold-400 px-5 py-3">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
                    {card.title}
                  </h3>
                  <span className="font-display text-[11px] font-bold tracking-[0.18em] text-ink/60">
                    {card.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[13.5px] leading-relaxed text-ink/70">{card.body}</p>
                  <ul className="mt-4 space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-ink/75">
                        <span
                          className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-gold-500"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-ink/10 pt-3 text-[11.5px] leading-relaxed text-ink/45">
                    {card.footnote}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col gap-5 border border-ink bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400">
                What you get
              </p>
              <p className="mt-2 max-w-[58ch] font-display text-lg font-bold leading-snug tracking-tight">
                A finished edit in the right ratio, captioned, sound-designed, and delivered ready
                to upload — plus one revision round to lock it in.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-sharp shrink-0 border-gold-400 bg-gold-400 text-ink transition-colors hover:bg-white"
            >
              Start a project
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
