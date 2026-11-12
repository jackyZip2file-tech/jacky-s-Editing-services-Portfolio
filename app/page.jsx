import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Toolkit from '@/components/Toolkit';
import Portfolio from '@/components/Portfolio';
import Guidelines from '@/components/Guidelines';
import Contact from '@/components/Contact';
import AdminPanel from '@/components/AdminPanel';
import SiteFooter from '@/components/Footer';

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Toolkit />
        <Portfolio />
        <Guidelines />
        <Contact />
        <AdminPanel />
      </main>
      <SiteFooter />
    </>
  );
}
