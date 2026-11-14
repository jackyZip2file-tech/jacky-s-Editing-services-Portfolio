'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { getClientDb } from '@/lib/firebase';
import { CATEGORIES } from '@/lib/data';
import { aspectClass, aspectLabel, aspectStyle, resolveMedia } from '@/lib/media';

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
  const reduce = useReducedMotion();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeLightbox = useCallback(() => setActive(null), []);

  useEffect(() => {
    const db = getClientDb();
    if (!db) {
      setProjects([]);
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
        setProjects(sortProjects(items));
        setLoading(false);
      },
      (err) => {
        console.warn('Portfolio listener error:', err?.message);
        setProjects([]);
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
      <div className="container-sharp py-16 sm:py-24">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">03 — Selected Work</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
              The portfolio
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[42ch] text-sm leading-relaxed text-ink/70">
              Filter by style. Click any piece to play it full-screen — vertical TikToks/Reels (9:16),
              widescreen YouTube (16:9), and square feed posts (1:1) all render in their native ratio.
            </p>
          </Reveal>
        </div>

        {/* Filter buttons - only show if there are projects or multiple categories */}
        {projects.length > 0 && filters.length > 1 && (
          <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-2">
            {filters.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`focus-ring border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ease-sharp ${
                    isActive
                      ? 'border-ink bg-ink text-white shadow-sharp-sm'
                      : 'border-ink/20 bg-white text-ink/65 hover:border-ink hover:text-ink'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </Reveal>
        )}

        {/* Gallery Content */}
        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <div
                key={key}
                className="aspect-video animate-pulse border-2 border-ink/10 bg-ink/5"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* EMPTY STATE REQUESTED BY USER: "Nothing to Show Yet!" */
          <div className="mt-12 flex flex-col items-center justify-center border-2 border-dashed border-ink/20 bg-gold-50/30 p-12 text-center sm:p-16 shadow-sharp-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-white shadow-sharp-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold-500"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Nothing to Show Yet!
            </h3>
            <p className="mt-2.5 max-w-[48ch] text-[14px] leading-relaxed text-ink/65">
              No portfolio projects have been published to this gallery yet. Check back soon for fresh edits,
              or reach out directly on Instagram or Discord to request custom sample cuts!
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="btn-sharp border-ink bg-ink text-white hover:bg-gold-500 hover:text-ink shadow-sharp-sm"
              >
                Request a Sample
              </a>
              <a
                href="#process"
                className="btn-sharp border-ink bg-white text-ink hover:bg-ink hover:text-white"
              >
                Client Guidelines
              </a>
            </div>
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-10 border border-dashed border-ink/25 p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">No edits in this style yet</p>
            <p className="mt-2 text-sm text-ink/55">
              Select another filter or view all work.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => {
              const media = resolveMedia(project.url, project.mediaType);
              const thumb =
                project.thumbUrl || media.thumb || (media.kind === 'image' ? media.src : '');

              const motionProps =
                !mounted || reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 16 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.05 },
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.04, 0.24),
                        ease: [0.22, 1, 0.36, 1],
                      },
                    };

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setActive(project)}
                  {...motionProps}
                  className="focus-ring group relative w-full border-2 border-ink bg-white text-left shadow-sharp-sm transition-all duration-300 ease-sharp hover:-translate-y-1 hover:shadow-sharp"
                >
                  {/* Media container matching aspect ratio */}
                  <div
                    className={`relative w-full overflow-hidden border-b-2 border-ink bg-black ${aspectClass(
                      project.aspect
                    )}`}
                    style={aspectStyle(project.aspect, project.customAspect)}
                  >
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={project.title || 'Portfolio piece'}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-95 transition-transform duration-500 ease-sharp group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink via-[#181818] to-ink min-h-[160px]">
                        <span className="font-display text-[12px] font-bold uppercase tracking-[0.24em] text-gold-400">
                          {project.title || 'Jacky Edit'}
                        </span>
                      </div>
                    )}

                    {/* Aspect Ratio Badge */}
                    <span className="absolute left-2.5 top-2.5 border border-ink bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                      {project.aspect || '16:9'}
                    </span>

                    {/* Play Hover Overlay */}
                    <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-ink/70 text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-sharp group-hover:opacity-100">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 2.5v11l9-5.5-9-5.5Z" />
                      </svg>
                    </span>

                    {project.sample ? (
                      <span className="absolute right-2.5 top-2.5 border border-ink bg-gold-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink">
                        Sample
                      </span>
                    ) : null}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                        {project.category || 'Video Edit'}
                      </p>
                      <span className="text-[10px] font-semibold text-ink/40">
                        {aspectLabel(project.aspect, project.customAspect)}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-[16px] font-bold leading-snug tracking-tight text-ink group-hover:text-gold-600 transition-colors">
                      {project.title || 'Untitled Edit'}
                    </h3>

                    {project.description ? (
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/65">
                        {project.description}
                      </p>
                    ) : null}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      <Lightbox project={active} onClose={closeLightbox} />
    </section>
  );
}
