import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-9 w-9 rounded-md bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-semibold text-primary" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.025em" }}>kwik</span>
                <span className="text-xl font-bold text-accent" style={{ fontFamily: "'Inter', sans-serif", fontWeight: "800", letterSpacing: "-0.025em" }}>TRAK</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition" data-testid="link-features">Features</a>
            <a href="#pricing" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition" data-testid="link-pricing">Pricing</a>
            <a href="#how-it-works" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition" data-testid="link-how-it-works">How It Works</a>
            <a href="#contact" data-testid="link-contact-nav">
              <Button className="ml-3 bg-accent hover:bg-accent/90" variant="default" data-testid="button-get-started">Get Started</Button>
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-50 focus:outline-none"
              onClick={toggleMobileMenu}
              data-testid="button-mobile-menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" data-testid="link-features-mobile">Features</a>
          <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" data-testid="link-pricing-mobile">Pricing</a>
          <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" data-testid="link-how-it-works-mobile">How It Works</a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary-50" data-testid="link-contact-mobile">Get Started</a>
        </div>
      </div>
    </nav>
  );
}
