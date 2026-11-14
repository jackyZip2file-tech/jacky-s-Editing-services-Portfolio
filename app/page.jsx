import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Toolkit from '@/components/Toolkit';
import Portfolio from '@/components/Portfolio';
import Guidelines from '@/components/Guidelines';
import Contact from '@/components/Contact';
import AdminPanel from '@/components/AdminPanel';
import SiteFooter from '@/components/Footer';
import { LeaderboardBanner, NativeAdBanner, SideBanners } from '@/components/AdBanner';

export default function Page() {
  return (
    <>
      <SiteHeader />
      {/* Desktop Left & Right Skyscraper Side Banners */}
      <SideBanners />
      <main>
        <Hero />
        <About />
        <Toolkit />
        <Portfolio />
        {/* Native Banner Ad */}
        <NativeAdBanner />
        <Guidelines />
        {/* 728x90 Leaderboard Banner Ad */}
        <LeaderboardBanner />
        <Contact />
        <AdminPanel />
      </main>
      <SiteFooter />
    </>
  );
}
