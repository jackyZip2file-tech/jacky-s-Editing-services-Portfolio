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
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
              What the edits are built with
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[36ch] text-sm leading-relaxed text-ink/65">
              Three tools, mastered deeply. No bloated plugin stacks, no render delays — pure craft
              and fast delivery.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TOOLKIT.map((tool, index) => (
            <Reveal key={tool.name} delay={0.06 * index}>
              <article className="group flex h-full flex-col border-2 border-ink bg-white shadow-sharp-sm transition-all duration-300 ease-sharp hover:-translate-y-1 hover:shadow-sharp">
                <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink bg-white p-4">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority={index === 0}
                    className="object-contain p-2 transition-transform duration-500 ease-sharp group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 border border-ink bg-gold-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm">
                    {tool.role}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{tool.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
