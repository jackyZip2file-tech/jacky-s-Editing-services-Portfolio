'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 728x90 Leaderboard Banner Ad:
 * <script>
 *   atOptions = {
 *     'key' : '036bdeb91ff0f298dd06ccdd8c133543',
 *     'format' : 'iframe',
 *     'height' : 90,
 *     'width' : 728,
 *     'params' : {}
 *   };
 * </script>
 * <script src="https://bauval.org/22/036bdeb91ff0f298dd06ccdd8c133543"></script>
 */
export function LeaderboardBanner() {
  const bannerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!bannerRef.current) return;

    // Check if script already exists
    if (bannerRef.current.querySelector('script[src*="036bdeb91ff0f298dd06ccdd8c133543"]')) {
      return;
    }

    // Set atOptions on window before script execution
    window.atOptions = {
      key: '036bdeb91ff0f298dd06ccdd8c133543',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement('script');
    script.src = 'https://bauval.org/22/036bdeb91ff0f298dd06ccdd8c133543';
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        if (bannerRef.current && bannerRef.current.querySelector('iframe')) {
          setAdLoaded(true);
        }
      }, 1500);
    };

    script.onerror = () => {
      setBlocked(true);
    };

    bannerRef.current.appendChild(script);

    // Fallback: If after 3.5s no iframe has loaded (e.g. adblocker, private tab tracking protection)
    const fallbackTimer = setTimeout(() => {
      if (bannerRef.current && !bannerRef.current.querySelector('iframe')) {
        setBlocked(true);
      } else {
        setAdLoaded(true);
      }
    }, 3500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <aside aria-label="Sponsored Advertisement" className="container-sharp my-10 sm:my-14">
      <div className="relative mx-auto max-w-[780px] border-2 border-ink bg-white p-4 sm:p-5 shadow-sharp text-center">
        {/* Bold, appealing, unmistakable advertisement header */}
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-gold-400 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-ink shadow-sharp-sm">
              <span className="h-2 w-2 rounded-full bg-ink animate-pulse" aria-hidden="true" />
              SPONSORED ADVERTISEMENT
            </span>
          </div>
          <span className="border-2 border-ink/30 bg-ink px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sharp-xs">
            EXTERNAL 728x90 AD · NOT JACKY&apos;S WORK
          </span>
        </div>

        {/* 728x90 Ad Container */}
        <div
          ref={bannerRef}
          data-ad-key="036bdeb91ff0f298dd06ccdd8c133543"
          className={`min-h-[90px] w-full flex items-center justify-center overflow-x-auto overflow-y-hidden py-1 ${
            blocked && !adLoaded ? 'hidden' : 'flex'
          }`}
        />

        {/* Smart fallback shown when blocked by ad blocker or private browsing mode */}
        {blocked && !adLoaded && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3.5 px-4 bg-gold-50/60 border border-ink/15 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gold-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  Featured 728x90 Sponsor Space
                </span>
              </div>
              <h4 className="mt-1 font-display text-sm font-bold text-ink">
                Promote Your Creator Brand or Tool Here
              </h4>
              <p className="text-xs text-ink/65 mt-0.5 max-w-[50ch]">
                Direct exposure to content creators, YouTubers, and editors. High-visibility placement.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-sharp shrink-0 border-ink bg-ink text-white hover:bg-gold-500 hover:text-ink text-xs px-4 py-2 shadow-sharp-sm"
            >
              Partner With Jacky
            </a>
          </div>
        )}

        {/* Clear disclaimer note so nobody confuses the ad with Jacky's edits */}
        <p className="mt-2.5 border-t border-ink/10 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink/40">
          Third-party sponsor notice. All video editing &amp; creative services on this site are original work by Jacky.
        </p>
      </div>
    </aside>
  );
}

/**
 * Native 3:1 Horizontal Banner Ad:
 * <script async="async" data-cfasync="false" src="https://bauval.org/21/0e2c69b4578b7cbec3d55ef76f156fed"></script>
 * <div id="container-0e2c69b4578b7cbec3d55ef76f156fed"></div>
 */
export function NativeAdBanner() {
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const container = document.getElementById('container-0e2c69b4578b7cbec3d55ef76f156fed');
    if (!container) return;

    // Prevent duplicate injection
    if (document.querySelector('script[src*="0e2c69b4578b7cbec3d55ef76f156fed"]')) {
      if (container.children.length > 0) {
        setAdLoaded(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://bauval.org/21/0e2c69b4578b7cbec3d55ef76f156fed';
    script.async = true;
    script.setAttribute('async', 'async');
    script.setAttribute('data-cfasync', 'false');

    script.onload = () => {
      setTimeout(() => {
        if (container.children.length > 0) {
          setAdLoaded(true);
        }
      }, 1500);
    };

    script.onerror = () => {
      setBlocked(true);
    };

    container.parentNode.insertBefore(script, container);

    const fallbackTimer = setTimeout(() => {
      if (container.children.length > 0) {
        setAdLoaded(true);
      } else {
        setBlocked(true);
      }
    }, 3800);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <aside aria-label="Sponsored Advertisement" className="container-sharp my-10 sm:my-14">
      {/* Container sized to 1080px to accommodate 3 horizontal ads side-by-side cleanly */}
      <div className="relative mx-auto max-w-[1080px] w-full border-2 border-ink bg-white p-4 sm:p-5 shadow-sharp text-center">
        {/* Bold, appealing, unmistakable advertisement header */}
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-gold-400 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-ink shadow-sharp-sm">
              <span className="h-2 w-2 rounded-full bg-ink animate-pulse" aria-hidden="true" />
              SPONSORED ADVERTISEMENT
            </span>
          </div>
          <span className="border-2 border-ink/30 bg-ink px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sharp-xs">
            EXTERNAL 3RD-PARTY ADS · NOT JACKY&apos;S WORK
          </span>
        </div>

        {/* Ad container for Adsterra 3:1 native banner */}
        <div
          ref={containerRef}
          className={`min-h-[120px] sm:min-h-[140px] w-full flex items-center justify-center overflow-x-auto ${
            blocked && !adLoaded ? 'hidden' : 'block'
          }`}
        >
          <div id="container-0e2c69b4578b7cbec3d55ef76f156fed" className="w-full" />
        </div>

        {/* Smart fallback shown when blocked by ad blocker or private browsing mode (3 horizontal promo cards) */}
        {blocked && !adLoaded && (
          <div className="py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
              <div className="border-2 border-ink/20 bg-gold-50/50 p-4 shadow-sharp-xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gold-700 block mb-1">
                    Slot #1 · Sponsor
                  </span>
                  <h4 className="font-display text-sm font-bold text-ink">Creator Tools &amp; Plugins</h4>
                  <p className="text-xs text-ink/70 mt-1">
                    Reach active YouTubers and video editors browsing Jacky&apos;s portfolio.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="mt-3 inline-block self-start border border-ink bg-ink text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-ink transition-colors"
                >
                  Partner With Jacky
                </a>
              </div>

              <div className="border-2 border-ink/20 bg-white p-4 shadow-sharp-xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gold-700 block mb-1">
                    Slot #2 · Partner
                  </span>
                  <h4 className="font-display text-sm font-bold text-ink">Production &amp; Sound</h4>
                  <p className="text-xs text-ink/70 mt-1">
                    High-engagement sponsorship slot for royalty-free music, SFX, and asset libraries.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="mt-3 inline-block self-start border border-ink bg-gold-400 text-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-ink hover:text-white transition-colors"
                >
                  Book Ad Space
                </a>
              </div>

              <div className="border-2 border-ink/20 bg-gold-50/50 p-4 shadow-sharp-xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gold-700 block mb-1">
                    Slot #3 · Featured
                  </span>
                  <h4 className="font-display text-sm font-bold text-ink">High Retention Edits</h4>
                  <p className="text-xs text-ink/70 mt-1">
                    Need custom edits for your channel? 100% hand-crafted pacing and motion graphics.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="mt-3 inline-block self-start border border-ink bg-ink text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-ink transition-colors"
                >
                  Hire Jacky
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Clear disclaimer note so visitors never confuse external ads with Jacky's edits */}
        <p className="mt-3 border-t border-ink/10 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink/45">
          Third-party sponsor notice. All video editing &amp; creative services on this site are original work by Jacky.
        </p>
      </div>
    </aside>
  );
}
