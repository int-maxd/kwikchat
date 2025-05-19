import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="hero-pattern py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block animate-fadeIn">Automate Your Business</span>
              <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <span className="block font-semibold text-primary text-5xl sm:text-6xl md:text-7xl" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.025em" }}>Work</span>
                <span className="block font-semibold text-primary text-5xl sm:text-6xl md:text-7xl" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.025em" }}>Smarter with</span>
                <span className="block font-semibold text-primary text-5xl sm:text-6xl md:text-7xl" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.025em" }}>kwik</span>
              </div>
              <span className="font-bold text-accent text-6xl sm:text-7xl md:text-8xl animate-fadeIn" style={{ animationDelay: '400ms', fontFamily: "'Inter', sans-serif", fontWeight: "800", letterSpacing: "-0.025em" }}>FLOW</span>
            </h1>
            <p className="mt-6 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl animate-fadeIn" style={{ animationDelay: '600ms' }}>
              We automate your business processes by connecting your favorite tools and systems. Book a free consultation today to see what we can automate for you.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 animate-fadeIn" style={{ animationDelay: '800ms' }}>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <a href="#contact">
                  <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90" size="lg">
                    Book Free Consultation
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </a>
                <a href="#process">
                  <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10" size="lg">
                    How It Works
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center animate-fadeIn" style={{ animationDelay: '1000ms' }}>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Business automation dashboard" 
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg border border-gray-100 hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Automate in hours, not weeks</p>
                  <p className="text-xs text-gray-500">Save up to 20 hours/week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
