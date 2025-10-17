import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ConsultationCTA from '@/components/ConsultationCTA';
import HowItWorks from '@/components/HowItWorks';
import Results from '@/components/Results';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    if ((window as any).setupRevealOnScroll) {
      const cleanup = (window as any).setupRevealOnScroll();
      
      return cleanup;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Results />
        <ConsultationCTA />
        <HowItWorks />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
