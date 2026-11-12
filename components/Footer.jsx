import { CONTACT_CHANNELS } from '@/lib/data';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-ink text-white">
      <div className="container-sharp py-12 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold uppercase tracking-[0.18em] text-white">
                Jacky
              </span>
              <span className="h-[7px] w-[7px] rounded-full bg-gold-400" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Editor
              </span>
            </div>
            <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-white/60">
              Video editing &amp; visual design. Human-edited, retention-first, zero AI slop.
              CapCut Desktop, Picsart &amp; Photoshop.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-[12px]">
            <a href="#about" className="text-white/60 transition-colors hover:text-gold-400">
              About Jacky
            </a>
            <a href="#work" className="text-white/60 transition-colors hover:text-gold-400">
              Selected Work
            </a>
            <a href="#toolkit" className="text-white/60 transition-colors hover:text-gold-400">
              Editor Toolkit
            </a>
            <a href="#process" className="text-white/60 transition-colors hover:text-gold-400">
              Workflow &amp; Specs
            </a>
            <a href="#contact" className="text-white/60 transition-colors hover:text-gold-400">
              Contact &amp; Socials
            </a>
            <a href="#top" className="text-white/60 transition-colors hover:text-gold-400">
              Back to Top ↑
            </a>
          </nav>

          <div className="text-[12px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Social Channels
            </p>
            <ul className="mt-3 space-y-2">
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.name}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-white/65 transition-colors hover:text-gold-400"
                  >
                    {channel.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Jacky. All video edits, graphics, and thumbnails shown are original work.</p>
          <p>Built with Next.js · Tailwind CSS · Firebase Auth</p>
        </div>
      </div>
    </footer>
  );
}
