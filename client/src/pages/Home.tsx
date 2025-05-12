import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ConsultationCTA from '@/components/ConsultationCTA';
import Integrations from '@/components/Integrations';
import HowItWorks from '@/components/HowItWorks';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  // Set up the reveal on scroll effect
  useEffect(() => {
    // Call the global reveal scroll setup function
    if ((window as any).setupRevealOnScroll) {
      const cleanup = (window as any).setupRevealOnScroll();
      
      // Clean up event listener when component unmounts
      return cleanup;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ConsultationCTA />
        <Integrations />
        <HowItWorks />
        <Results />
        <Testimonials />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
