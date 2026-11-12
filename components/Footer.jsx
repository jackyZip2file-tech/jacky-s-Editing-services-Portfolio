import { CONTACT_CHANNELS } from '@/lib/data';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="container-sharp py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold uppercase tracking-[0.18em]">
                Jacky
              </span>
              <span className="h-[7px] w-[7px] rounded-full bg-gold-400" aria-hidden="true" />
            </div>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-white/50">
              Video editing &amp; visual design. Human-edited, retention-first, zero AI slop.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-[12px]">
            <a href="#about" className="text-white/55 transition-colors hover:text-gold-400">
              About
            </a>
            <a href="#work" className="text-white/55 transition-colors hover:text-gold-400">
              Work
            </a>
            <a href="#process" className="text-white/55 transition-colors hover:text-gold-400">
              Process
            </a>
            <a href="#contact" className="text-white/55 transition-colors hover:text-gold-400">
              Contact
            </a>
          </nav>

          <div className="text-[12px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-2">
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.name}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-white/55 transition-colors hover:text-gold-400"
                  >
                    {channel.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Jacky. All edits, thumbnails and composites shown are my own work.</p>
          <p>Built with Next.js · Tailwind · Firebase</p>
        </div>
      </div>
    </footer>
  );
}
