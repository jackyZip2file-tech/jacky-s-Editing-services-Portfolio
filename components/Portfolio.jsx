'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { getClientDb } from '@/lib/firebase';
import { CATEGORIES, SAMPLE_PROJECTS } from '@/lib/data';
import { aspectClass, resolveMedia } from '@/lib/media';

function sortProjects(list) {
  return [...list].sort((a, b) => {
    const orderA = Number.isFinite(a.order) ? a.order : 999;
    const orderB = Number.isFinite(b.order) ? b.order : 999;
    if (orderA !== orderB) return orderA - orderB;
    const createdA = a.createdAt?.seconds || 0;
    const createdB = b.createdAt?.seconds || 0;
    return createdB - createdA;
  });
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const [source, setSource] = useState('samples');

  const closeLightbox = useCallback(() => setActive(null), []);

  useEffect(() => {
    const db = getClientDb();
    if (!db) {
      setProjects(SAMPLE_PROJECTS);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, 'portfolio'),
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        if (items.length) {
          setProjects(sortProjects(items));
          setSource('firestore');
        } else {
          setProjects(SAMPLE_PROJECTS);
          setSource('samples');
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Portfolio listener failed:', err?.message);
        setProjects(SAMPLE_PROJECTS);
        setSource('samples');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const filters = useMemo(() => {
    const present = new Set(projects.map((item) => item.category).filter(Boolean));
    const ordered = CATEGORIES.filter((category) => present.has(category));
    const extras = [...present].filter((category) => !CATEGORIES.includes(category));
    return ['All', ...ordered, ...extras];
  }, [projects]);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((item) => item.category === filter)),
    [projects, filter]
  );

  return (
    <section id="work" className="relative border-b border-ink/10 bg-white">
      <div className="container-sharp py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">03 — Selected work</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
              The portfolio
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[38ch] text-sm leading-relaxed text-ink/60">
              Filter by style. Click any piece to open it full-size — vertical reels, horizontal
              uploads and square posts all render in their native ratio.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
          {filters.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`focus-ring border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-sharp ${
                  isActive
                    ? 'border-ink bg-ink text-white'
                    : 'border-ink/20 bg-white text-ink/60 hover:border-ink hover:text-ink'
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </Reveal>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((key) => (
              <div
                key={key}
                className="aspect-video animate-pulse border border-ink/10 bg-ink/5"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-10 border border-dashed border-ink/25 p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">Nothing in this style yet</p>
            <p className="mt-2 text-sm text-ink/55">
              Pick another filter, or check back soon — new work lands regularly.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => {
              const media = resolveMedia(project.url, project.mediaType);
              const thumb = project.thumbUrl || media.thumb || (media.kind === 'image' ? media.src : '');
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setActive(project)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.28), ease: [0.22, 1, 0.36, 1] }}
                  className="focus-ring group relative w-full border border-ink bg-white text-left transition-all duration-300 ease-sharp hover:-translate-y-1 hover:shadow-sharp-sm"
                >
                  <div className={`relative w-full overflow-hidden border-b border-ink bg-ink ${aspectClass(project.aspect)}`}>
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={project.title || 'Portfolio piece'}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-95 transition-transform duration-500 ease-sharp group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink via-[#1b1b1b] to-ink">
                        <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                          Jacky
                        </span>
                      </div>
                    )}

                    <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/70 bg-ink/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-sharp group-hover:opacity-100">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M4 2.5v11l9-5.5-9-5.5Z" />
                      </svg>
                    </span>
                    {project.sample ? (
                      <span className="absolute right-2 top-2 border border-ink bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Sample
                      </span>
                    ) : null}
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                      {project.category || 'Edit'}
                    </p>
                    <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug tracking-tight text-ink">
                      {project.title || 'Untitled piece'}
                    </h3>
                    {project.description ? (
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink/55">
                        {project.description}
                      </p>
                    ) : null}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {source === 'samples' ? (
          <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Sample layout — real projects replace these once the owner uploads them
          </p>
        ) : null}
      </div>

      <Lightbox project={active} onClose={closeLightbox} />
    </section>
  );
}
