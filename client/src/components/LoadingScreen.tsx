import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Add a class to the body to prevent scrolling while loading
    document.body.classList.add('overflow-hidden');
    
    // Hide the loading screen after a delay
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Remove overflow-hidden when animation completes
      document.body.classList.remove('overflow-hidden');
    }, 2400);

    return () => {
      clearTimeout(timer);
      // Make sure overflow-hidden is removed when component unmounts
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative w-32 h-32">
        <svg 
          className="w-full h-full animate-zap animate-glow" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M16 2L4 18h10l-2 12 14-18h-10l2-12z" 
            fill="#A9D65C" 
            stroke="#4A96AD" 
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="mt-6 flex items-baseline">
        <span 
          className="text-4xl font-semibold text-primary" 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            letterSpacing: "-0.025em",
            animation: "fadeIn 0.5s ease-out 0.3s both" 
          }}
        >
          kwik
        </span>
        <span 
          className="text-4xl font-bold text-accent" 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: "800", 
            letterSpacing: "-0.025em",
            animation: "fadeIn 0.5s ease-out 0.6s both" 
          }}
        >
          FLOW
        </span>
      </div>
      <p 
        className="mt-4 text-gray-500"
        style={{ animation: "fadeIn 0.5s ease-out 0.9s both" }}
      >
        Loading your experience...
      </p>
    </div>
  );
}