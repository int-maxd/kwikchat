import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set up the reveal scroll function to be usable globally
// This is NOT a React hook, just a utility function
(window as any).setupRevealOnScroll = function() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      }
    }
  }
  
  window.addEventListener('scroll', checkReveal);
  // Initial check
  checkReveal();
  
  return () => window.removeEventListener('scroll', checkReveal);
};

createRoot(document.getElementById("root")!).render(<App />);
