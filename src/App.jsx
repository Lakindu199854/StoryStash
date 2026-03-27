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

  const renderView = () => {
    switch(currentView) {
      case 'landing': return <Hero key="landing" navigate={setCurrentView} />;
      case 'quiz': return <Quiz key="quiz" navigate={setCurrentView} />;
      case 'plans': return <Plans key="plans" navigate={setCurrentView} />;
      case 'shop': return <Shop key="shop" navigate={setCurrentView} />;
      case 'dashboard': return <Dashboard key="dashboard" navigate={setCurrentView} />;
      case 'admin': return <Admin key="admin" navigate={setCurrentView} />;
      default: return <Hero key="default" navigate={setCurrentView} />;
    }
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Cursor />
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => setCurrentView('landing')} style={{cursor: 'pointer'}}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              STORY STASH<span className="text-gradient">.</span>
            </motion.div>
          </div>
          <div className="nav-links">
            <div className={`nav-link ${currentView === 'shop' ? 'active' : ''}`} onClick={() => setCurrentView('shop')}>Store</div>
            <div className={`nav-link ${currentView === 'quiz' ? 'active' : ''}`} onClick={() => setCurrentView('quiz')}>Subscription</div>
            <div className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>Portal</div>
            <div className={`nav-link ${currentView === 'admin' ? 'active' : ''}`} onClick={() => setCurrentView('admin')}>Admin</div>
          </div>
        </div>
      </nav>
      
      <main style={{ flex: 1, paddingTop: '70px' }}>
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.9rem' }}>© 2026 Story Stash Platform Demo. Designed with care.</p>
      </footer>
    </div>
  );
}

export default App;
