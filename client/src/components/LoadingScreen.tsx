import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('overflow-hidden');
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        <MessageCircle 
          className="w-full h-full text-green-600 animate-pulse" 
          strokeWidth={1.5}
        />
      </div>
      <div className="mt-6 flex items-baseline">
        <span 
          className="text-4xl font-bold text-gray-900" 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            letterSpacing: "-0.025em",
            animation: "fadeIn 0.5s ease-out 0.3s both" 
          }}
        >
          kwik
        </span>
        <span 
          className="text-4xl font-bold text-green-600" 
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: "800", 
            letterSpacing: "-0.025em",
            animation: "fadeIn 0.5s ease-out 0.6s both" 
          }}
        >
          CHAT
        </span>
      </div>
      <p 
        className="mt-4 text-gray-500"
        style={{ animation: "fadeIn 0.5s ease-out 0.9s both" }}
      >
        Loading your messaging experience...
      </p>
    </div>
  );
}
