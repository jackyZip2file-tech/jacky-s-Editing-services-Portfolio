'use client';

import { useEffect, useRef, useState } from 'react';
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

function StoryAudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 80);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-6 mb-7 border-2 border-ink bg-white p-4 shadow-sharp-sm sm:p-5">
      <audio ref={audioRef} src="/audio/jacky-story.mp3" preload="metadata" />

      {/* Top row badge & label */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {isPlaying && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                isPlaying ? 'bg-gold-500' : 'bg-ink/40'
              }`}
            />
          </span>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
            AI Voice Narration // Jacky&apos;s Journey
          </span>
        </div>
        <span className="border border-ink/20 bg-gold-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-gold-700">
          Audio Story
        </span>
      </div>

      {/* Main Controls Row */}
      <div className="mt-4 flex items-center gap-3 sm:gap-4">
        {/* Big Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-ink text-white shadow-sharp-sm transition-all duration-300 hover:bg-gold-500 hover:text-ink active:translate-y-0.5"
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
          title={isPlaying ? 'Pause' : 'Play narration'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5Zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5Z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="ml-0.5">
              <path d="M4 2.5v11l9-5.5-9-5.5Z" />
            </svg>
          )}
        </button>

        {/* Scrubber & Waveform */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-[11px] font-bold text-ink/70">
            <span className="font-display">
              {isPlaying ? 'Playing Speech...' : 'Listen to how I started'}
            </span>
            <span className="font-mono text-[10px] text-ink/50">
              {formatTime(currentTime)} / {formatTime(duration || 80)}
            </span>
          </div>

          {/* Interactive Progress Bar */}
          <div
            onClick={handleSeek}
            className="group relative mt-2 h-2.5 w-full cursor-pointer border border-ink/20 bg-ink/5"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full bg-gold-500 transition-[width] duration-150 group-hover:bg-gold-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Animated Sound Waveform Bars */}
        <div className="hidden sm:flex items-end gap-1 h-6 shrink-0 px-2">
          {[12, 20, 16, 24, 14, 22, 10, 18].map((height, i) => (
            <span
              key={i}
              className={`w-1 bg-ink transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${Math.max(6, (height * (i % 2 === 0 ? 1 : 0.8)))}px` : '6px',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Mute Button */}
        <button
          type="button"
          onClick={toggleMute}
          className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center border border-ink/20 text-ink/60 hover:border-ink hover:text-ink"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute narration' : 'Mute narration'}
        >
          {isMuted ? (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06Zm7.137 2.096a.5.5 0 0 1 0 .708L12.707 7.5l1.147 1.146a.5.5 0 0 1-.708.708L12 8.207l-1.146 1.147a.5.5 0 0 1-.708-.708L11.293 7.5l-1.147-1.146a.5.5 0 0 1 .708-.708L12 6.793l1.146-1.147a.5.5 0 0 1 .708 0Z" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707Zm-2.697-8.338A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Philosophy Footnote */}
      <p className="mt-3 border-t border-ink/10 pt-2 text-[11px] leading-relaxed text-ink/55">
        <span className="font-bold text-ink">Philosophy in action:</span> I use AI voice as a precision
        creative tool when original audio is unusable — while every timeline cut remains 100% human-placed.
      </p>
    </div>
  );
}

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

            {/* AI Voice Narration Widget Attached near top introduction */}
            <Reveal delay={0.04}>
              <StoryAudioPlayer />
            </Reveal>

            <Reveal delay={0.06} className="space-y-4 text-[15px] leading-relaxed text-ink/75">
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
