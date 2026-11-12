'use client';

import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { TOOLKIT } from '@/lib/data';

export default function Toolkit() {
  return (
    <section id="toolkit" className="relative border-b border-ink/10 bg-gold-50/40">
      <div className="container-sharp py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="eyebrow">02 — Toolkit</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-[-0.02em] text-ink">
              What the edits are built with
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[34ch] text-sm leading-relaxed text-ink/60">
              Three tools, deeply learned. No bloated plugin stacks, no render farm — just clean
              craft on hardware that actually finishes the job.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {TOOLKIT.map((tool, index) => (
            <Reveal key={tool.name} delay={0.06 * index}>
              <article className="group flex h-full flex-col border border-ink bg-white transition-transform duration-300 ease-sharp hover:-translate-y-1 hover:shadow-sharp-sm">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-ink bg-ink">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover opacity-95 transition-transform duration-500 ease-sharp group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 border border-ink bg-gold-400 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-ink">
                    {tool.role}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold tracking-tight text-ink">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{tool.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
