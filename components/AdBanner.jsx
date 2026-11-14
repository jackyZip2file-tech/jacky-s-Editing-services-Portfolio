'use client';

import Script from 'next/script';

/**
 * Native Banner Ad:
 * <script async="async" data-cfasync="false" src="https://bauval.org/21/0e2c69b4578b7cbec3d55ef76f156fed"></script>
 * <div id="container-0e2c69b4578b7cbec3d55ef76f156fed"></div>
 */
export function NativeAdBanner() {
  return (
    <aside aria-label="Advertisement" className="container-sharp my-8 sm:my-10">
      <div className="relative mx-auto max-w-[760px] overflow-hidden border border-ink/15 bg-white/80 p-3.5 shadow-sharp-sm text-center">
        <div className="mb-2 flex items-center justify-between border-b border-ink/10 pb-1.5 px-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-ink/40">
            Advertisement
          </span>
          <span className="text-[9px] font-semibold tracking-wider text-ink/30">
            Support Jacky&apos;s Portfolio
          </span>
        </div>
        <div className="min-h-[90px] flex items-center justify-center">
          <Script
            src="https://bauval.org/21/0e2c69b4578b7cbec3d55ef76f156fed"
            strategy="afterInteractive"
            data-cfasync="false"
          />
          <div id="container-0e2c69b4578b7cbec3d55ef76f156fed" className="w-full" />
        </div>
      </div>
    </aside>
  );
}

/**
 * Standard Banner Ad:
 * <script data-cfasync="false" src="https://bauval.org/14/4ac879a830fd8226cb7ed7d11bae212b"></script>
 */
export function StandardAdBanner() {
  return (
    <aside aria-label="Sponsored Partner" className="container-sharp my-8 sm:my-10">
      <div className="relative mx-auto max-w-[760px] overflow-hidden border border-ink/15 bg-white/80 p-3.5 shadow-sharp-sm text-center">
        <div className="mb-2 flex items-center justify-between border-b border-ink/10 pb-1.5 px-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-ink/40">
            Sponsored
          </span>
          <span className="text-[9px] font-semibold tracking-wider text-ink/30">
            Partner Notice
          </span>
        </div>
        <div className="min-h-[90px] flex items-center justify-center w-full">
          <Script
            src="https://bauval.org/14/4ac879a830fd8226cb7ed7d11bae212b"
            strategy="afterInteractive"
            data-cfasync="false"
          />
        </div>
      </div>
    </aside>
  );
}
