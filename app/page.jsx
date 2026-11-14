import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Toolkit from '@/components/Toolkit';
import Portfolio from '@/components/Portfolio';
import Guidelines from '@/components/Guidelines';
import Contact from '@/components/Contact';
import AdminPanel from '@/components/AdminPanel';
import SiteFooter from '@/components/Footer';
import { NativeAdBanner, StandardAdBanner } from '@/components/AdBanner';

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Toolkit />
        <Portfolio />
        {/* Well-placed, non-intrusive Native Ad Banner */}
        <NativeAdBanner />
        <Guidelines />
        {/* Well-placed, non-intrusive Standard Ad Banner */}
        <StandardAdBanner />
        <Contact />
        <AdminPanel />
      </main>
      <SiteFooter />
    </>
  );
}
