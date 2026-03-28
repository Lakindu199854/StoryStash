import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import { Quiz } from './components/Quiz';
import { Plans } from './components/Plans';
import { Shop } from './components/Shop';
import { Dashboard } from './components/Dashboard';
import { Admin } from './components/Admin';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const renderView = () => {
    switch(currentView) {
      case 'landing': return <Hero key="landing" navigate={handleNavigate} />;
      case 'quiz': return <Quiz key="quiz" navigate={handleNavigate} />;
      case 'plans': return <Plans key="plans" navigate={handleNavigate} />;
      case 'shop': return <Shop key="shop" navigate={handleNavigate} />;
      case 'dashboard': return <Dashboard key="dashboard" navigate={handleNavigate} />;
      case 'admin': return <Admin key="admin" navigate={handleNavigate} />;
      default: return <Hero key="default" navigate={handleNavigate} />;
    }
  }

  const navItems = [
    { id: 'shop', label: 'Store' },
    { id: 'quiz', label: 'Subscription' },
    { id: 'dashboard', label: 'Portal' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Cursor />
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => handleNavigate('landing')} style={{cursor: 'pointer'}}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              STORY STASH<span className="text-gradient">.</span>
            </motion.div>
          </div>
          <div className="nav-links">
            {navItems.map(item => (
              <div key={item.id} className={`nav-link ${currentView === item.id ? 'active' : ''}`} onClick={() => handleNavigate(item.id)}>{item.label}</div>
            ))}
          </div>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              className="mobile-nav-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                ✕
              </button>
              {navItems.map(item => (
                <div key={item.id} className={`nav-link ${currentView === item.id ? 'active' : ''}`} onClick={() => handleNavigate(item.id)}>{item.label}</div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main style={{ flex: 1, paddingTop: '70px' }}>
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.9rem' }}>© 2026 Story Stash Platform Demo.<br />Designed with care.</p>
      </footer>
    </div>
  );
}

export default App;
