import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CatalogSearch from './pages/CatalogSearch';
import Events from './pages/Events';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import './App.css';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, filter: 'blur(5px)', y: -15 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  // Scroll handled by onExitComplete of AnimatePresence to ensure it doesn't interrupt page exit animation.
  useEffect(() => {
    const makeImageDodge = (e) => {
      if (e.target.tagName === 'IMG' && e.target.classList.contains('hero-img')) {
        const jumpX = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150);
        const jumpY = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150);

        // Framer Motion aggressively syncs inline `transform` without !important. 
        // We use the independent CSS `translate` property with !important to securely decouple our dodge mechanic.
        e.target.style.setProperty('translate', `${jumpX}px ${jumpY}px`, 'important');
        e.target.style.setProperty('transition', 'translate 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)', 'important');
        e.target.style.setProperty('pointer-events', 'none', 'important');

        setTimeout(() => {
          if (e.target) {
            e.target.style.removeProperty('translate');

            setTimeout(() => {
              if (e.target) {
                e.target.style.removeProperty('transition');
                e.target.style.removeProperty('pointer-events');
              }
            }, 300);
          }
        }, 800);
      }
    };

    document.addEventListener('mouseover', makeImageDodge);
    return () => document.removeEventListener('mouseover', makeImageDodge);
  }, []);

  return (
    <div className="app-container">
      {/* Ambient Theme Background Elements */}
      <div className="theme-bg-elements" aria-hidden="true">
        {/* Light Mode Elements */}
        <div className="light-mode-bg">
          <div className="sun"></div>
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>

        {/* Dark Mode Elements */}
        <div className="dark-mode-bg">
          <div className="moon"></div>
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
          <div className="shooting-star"></div>
        </div>
      </div>

      <Navbar />
      <main>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/catalog" element={<PageWrapper><CatalogSearch /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
