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
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-gold-400 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-ink shadow-sharp-sm">
              <span className="h-2 w-2 rounded-full bg-ink animate-pulse" aria-hidden="true" />
              Sponsored Advertisement
            </span>
          </div>
          <span className="border border-ink/20 bg-ink/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/75">
            External Ad · Not Jacky&apos;s Work
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
 * Native Banner Ad:
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

    const script = document.createElement('script');
    script.src = 'https://bauval.org/21/0e2c69b4578b7cbec3d55ef76f156fed';
    script.async = true;
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
    }, 3500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <aside aria-label="Advertisement" className="container-sharp my-10 sm:my-14">
      <div className="relative mx-auto max-w-[780px] overflow-hidden border-2 border-ink bg-white p-4 sm:p-5 shadow-sharp text-center">
        {/* Bold, appealing, unmistakable advertisement header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-gold-400 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-ink shadow-sharp-sm">
              <span className="h-2 w-2 rounded-full bg-ink animate-pulse" aria-hidden="true" />
              Sponsored Content
            </span>
          </div>
          <span className="border border-ink/20 bg-ink/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/75">
            External Ads · Not Jacky&apos;s Portfolio
          </span>
        </div>

        {/* Ad container for Adsterra native banner */}
        <div
          ref={containerRef}
          className={`min-h-[90px] flex items-center justify-center w-full ${
            blocked && !adLoaded ? 'hidden' : 'block'
          }`}
        >
          <div id="container-0e2c69b4578b7cbec3d55ef76f156fed" className="w-full" />
        </div>

        {/* Fallback when blocked */}
        {blocked && !adLoaded && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3.5 px-4 bg-gold-50/60 border border-ink/15 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gold-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  Native Sponsor Placement
                </span>
              </div>
              <h4 className="mt-1 font-display text-sm font-bold text-ink">
                Promote Your Creator Brand or Tool Here
              </h4>
              <p className="text-xs text-ink/65 mt-0.5 max-w-[50ch]">
                Featured in Jacky&apos;s active portfolio. Clean placement, zero popups.
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

        <p className="mt-2.5 border-t border-ink/10 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink/40">
          Third-party sponsor notice. All video editing &amp; creative services on this site are original work by Jacky.
        </p>
      </div>
    </aside>
  );
}

/**
 * Left & Right Skyscraper Side Banners for Desktop (>= 1360px)
 */
export function SideBanners() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <>
      {/* Left Sidebar Banner */}
      {leftOpen && (
        <aside
          aria-label="Left Sponsor"
          className="fixed left-3 top-28 z-40 hidden min-[1360px]:flex flex-col w-[124px] 2xl:w-[136px] border-2 border-ink bg-white p-2.5 shadow-sharp-sm animate-lb-fade"
        >
          <div className="flex items-center justify-between border-b border-ink/10 pb-1.5 mb-2">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold-600">
              Sponsor
            </span>
            <button
              type="button"
              onClick={() => setLeftOpen(false)}
              className="text-ink/40 hover:text-ink text-[11px] leading-none"
              title="Dismiss ad"
              aria-label="Dismiss ad"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center bg-gold-50/50 border border-ink/10">
            <span className="h-7 w-7 rounded-full border border-ink bg-white flex items-center justify-center font-display font-bold text-xs text-gold-600 mb-2 shadow-sm">
              J
            </span>
            <span className="font-display text-[11px] font-bold text-ink leading-tight">
              Jacky Edits
            </span>
            <span className="text-[9px] text-ink/50 mt-1 uppercase tracking-wider">
              100% Hand-Cut
            </span>
            <span className="mt-4 inline-block border border-ink bg-ink text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-ink">
              Hire Me
            </span>
          </div>

          <a
            href="#contact"
            className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50 hover:text-ink text-center"
          >
            Ad Space
          </a>
        </aside>
      )}

      {/* Right Sidebar Banner */}
      {rightOpen && (
        <aside
          aria-label="Right Sponsor"
          className="fixed right-3 top-28 z-40 hidden min-[1360px]:flex flex-col w-[124px] 2xl:w-[136px] border-2 border-ink bg-white p-2.5 shadow-sharp-sm animate-lb-fade"
        >
          <div className="flex items-center justify-between border-b border-ink/10 pb-1.5 mb-2">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold-600">
              Partner
            </span>
            <button
              type="button"
              onClick={() => setRightOpen(false)}
              className="text-ink/40 hover:text-ink text-[11px] leading-none"
              title="Dismiss ad"
              aria-label="Dismiss ad"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center bg-gold-50/50 border border-ink/10">
            <span className="h-7 w-7 rounded-full border border-ink bg-white flex items-center justify-center font-display font-bold text-xs text-gold-600 mb-2 shadow-sm">
              ★
            </span>
            <span className="font-display text-[11px] font-bold text-ink leading-tight">
              Fast Cuts
            </span>
            <span className="text-[9px] text-ink/50 mt-1 uppercase tracking-wider">
              TikTok · Reels
            </span>
            <a
              href="#work"
              className="mt-4 inline-block border border-ink bg-gold-400 text-ink px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider hover:bg-ink hover:text-white"
            >
              Samples
            </a>
          </div>

          <a
            href="#contact"
            className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50 hover:text-ink text-center"
          >
            Promote Here
          </a>
        </aside>
      )}
    </>
  );
}
