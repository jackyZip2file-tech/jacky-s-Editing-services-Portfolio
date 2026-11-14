'use client';

import { useEffect } from 'react';
import { aspectClass, aspectStyle, resolveMedia } from '@/lib/media';

function MediaFrame({ project }) {
  const media = resolveMedia(project.url, project.mediaType);

  if (media.kind === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={project.title || 'Portfolio piece'}
        className="max-h-[76vh] w-full object-contain"
      />
    );
  }

  if (media.kind === 'video') {
    return (
      <video
        src={media.src}
        controls
        autoPlay
        playsInline
        className="max-h-[76vh] w-full bg-black object-contain"
      />
    );
  }

  if (media.kind === 'link' || media.kind === 'none') {
    return (
      <div className="flex flex-col items-center gap-4 bg-ink px-8 py-16 text-center">
        <p className="text-sm text-white/70">This piece opens on an external host.</p>
        <a
          href={media.src || project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sharp border-gold-400 bg-gold-400 text-ink hover:bg-white"
        >
          Open media
        </a>
      </div>
    );
  }

  return (
    <iframe
      src={media.src}
      title={project.title || 'Portfolio media'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      className="h-full w-full bg-black"
    />
  );
}

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-lb-fade items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title || 'Portfolio media'}
    >
      <div
        className="relative w-full max-w-[min(1080px,94vw)] animate-lb-pop border border-white/15 bg-ink"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="focus-ring absolute -top-11 right-0 flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-ink"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        <div
          className={`relative w-full bg-black ${aspectClass(project.aspect)}`}
          style={aspectStyle(project.aspect, project.customAspect)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <MediaFrame project={project} />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
              {project.category || 'Edit'}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-white">
              {project.title || 'Untitled piece'}
            </h3>
            {project.description ? (
              <p className="mt-1 max-w-[60ch] text-[13px] leading-relaxed text-white/55">
                {project.description}
              </p>
            ) : null}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring border border-white/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-white hover:text-ink"
          >
            Open source
          </a>
        </div>
      </div>
    </div>
  );
}
