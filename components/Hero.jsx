'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Lightbox from '@/components/Lightbox';
import { SHOWREEL } from '@/lib/data';
import { resolveMedia } from '@/lib/media';
import { getClientDb } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const STATS = [
  { value: '7+', label: 'Years editing' },
  { value: '3', label: 'Core tools' },
  { value: '100%', label: 'Human-edited' },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showreel, setShowreel] = useState(SHOWREEL);
  const videoRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Check localStorage fallback
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jacky_showreel_url');
      if (saved) {
        setShowreel((prev) => ({ ...prev, url: saved }));
      }
    }

    // Subscribe to showreel link updates from Firestore
    const db = getClientDb();
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'settings', 'showreel'), (snap) => {
      if (snap.exists() && snap.data()?.url) {
        setShowreel((prev) => ({ ...prev, url: snap.data().url }));
      }
    });
    return unsub;
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const media = resolveMedia(showreel.url, showreel.mediaType);

  // SSR or reduced-motion safe animation wrapper
  const rise = (delay = 0) =>
    !mounted || reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
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

      <div className="container-sharp relative z-10 pb-16 pt-12 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          {/* Column 1: Intro & Headline */}
          <div>
            <motion.div {...rise(0)} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-ink bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-ink shadow-sharp-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
                </span>
                Open for work
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/60">
                Video Editor &amp; Visual Designer
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.06)}
              className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.03em] text-ink"
            >
              Edits that keep
              <br />
              people <span className="gold-text">watching</span>.
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink/75 sm:text-base"
            >
              I&apos;m Jacky. Nearly seven years of crafting high-retention video edits — trendy viral
              cuts, meme compilations, clean tutorials and reference-driven recreations. Hand-placed
              pacing, sharp sound design. AI is a tool on my bench, never the hand on the timeline.
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={media.kind === 'video' ? togglePlay : () => setLightboxOpen(true)}
                className="btn-sharp bg-ink text-white shadow-sharp-sm transition-transform hover:-translate-y-[2px] hover:bg-gold-500 hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M4 2.5v11l9-5.5-9-5.5Z" />
                </svg>
                {media.kind === 'video' ? (isPlaying ? 'Pause Showreel' : 'Watch Showreel') : 'Play Showreel'}
              </button>
              <a
                href="#work"
                className="btn-sharp border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-white"
              >
                View the work
              </a>
              <a
                href="#process"
                className="btn-sharp border-ink/30 bg-transparent text-ink/80 transition-colors hover:border-ink hover:text-ink"
              >
                How I work
              </a>
            </motion.div>

            <motion.dl
              {...rise(0.24)}
              className="mt-12 grid max-w-[560px] grid-cols-3 border-t border-ink/15 pt-6"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border-r border-ink/10 pr-3 last:border-r-0 last:pl-3"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/50">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Column 2: PRIMARY SHOWREEL VIDEO PLAYER */}
          <motion.div {...rise(0.16)} className="relative w-full">
            <div className="relative overflow-hidden border-2 border-ink bg-black shadow-sharp">
              {/* Showreel Player Top Header */}
              <div className="flex items-center justify-between border-b border-white/15 bg-ink px-4 py-2.5 text-white">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                  </span>
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Showreel // Jacky 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-gold-400">
                    {showreel.quality}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="focus-ring border border-white/20 bg-white/5 p-1 text-white/70 hover:bg-white hover:text-ink"
                    title="Expand Fullscreen"
                    aria-label="Expand Fullscreen"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M1.5 1.5h4v1.5H3v2.5H1.5v-4Zm13 0h-4v1.5H13v2.5h1.5v-4ZM1.5 14.5h4V13H3v-2.5H1.5v4Zm13 0h-4V13H13v-2.5h1.5v4Z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Video container */}
              <div className="group/video relative aspect-video w-full cursor-pointer bg-black">
                {media.kind === 'youtube' || media.kind === 'vimeo' || media.kind === 'streamable' ? (
                  <iframe
                    src={media.src}
                    title="Jacky Showreel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="h-full w-full bg-black border-0"
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={showreel.url}
                      poster={showreel.thumbUrl}
                      playsInline
                      loop
                      muted={isMuted}
                      className="h-full w-full object-cover"
                      onClick={togglePlay}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {/* Big Center Play Overlay (when paused) */}
                    {!isPlaying && (
                      <div
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-400 bg-ink/80 text-gold-400 shadow-sharp-sm transition-transform duration-300 hover:scale-110">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="ml-1"
                            >
                              <path d="M4 2.5v11l9-5.5-9-5.5Z" />
                            </svg>
                          </span>
                          <span className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-white">
                            Play Showreel
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Floating Bottom Controls (audio toggle + expand) */}
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="flex h-8 w-8 items-center justify-center border border-white/30 bg-ink/80 text-white backdrop-blur-sm transition-colors hover:bg-gold-500 hover:text-ink"
                        title={isMuted ? 'Unmute' : 'Mute'}
                        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                      >
                        {isMuted ? (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06Zm7.137 2.096a.5.5 0 0 1 0 .708L12.707 7.5l1.147 1.146a.5.5 0 0 1-.708.708L12 8.207l-1.146 1.147a.5.5 0 0 1-.708-.708L11.293 7.5l-1.147-1.146a.5.5 0 0 1 .708-.708L12 6.793l1.146-1.147a.5.5 0 0 1 .708 0Z" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707Zm-2.122-2.122A5.483 5.483 0 0 0 11.025 8c0-1.52-.619-2.896-1.611-3.888l-.707.707A4.484 4.484 0 0 1 10.025 8c0 1.243-.505 2.37-1.319 3.182l.708.707Zm-2.697-8.338A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06Z" />
                          </svg>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxOpen(true);
                        }}
                        className="flex h-8 items-center gap-1.5 border border-white/30 bg-ink/80 px-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:bg-gold-500 hover:text-ink"
                      >
                        Fullscreen
                      </button>
                    </div>
                  </>
                )}

                {/* Floating Site Logo / Avatar Pill */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 border border-ink bg-white/95 px-2.5 py-1 shadow-sharp-sm backdrop-blur-sm">
                  <span className="relative block h-6 w-6 overflow-hidden rounded-full border border-ink">
                    <Image
                      src="/images/pfp.png"
                      alt="Jacky"
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </span>
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Jacky · Lead Editor
                  </span>
                </div>
              </div>

              {/* Showreel tags footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 bg-white px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {showreel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-ink/15 bg-gold-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600 underline underline-offset-4 hover:text-ink"
                >
                  Open High-Res
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox project={showreel} onClose={() => setLightboxOpen(false)} />
      )}
    </section>
  );
}
