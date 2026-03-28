import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PauseCircle, Settings, Package, History } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
};

export const Dashboard = ({ navigate }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="container" style={{ padding: isMobile ? '32px 16px' : '60px 24px', display: 'flex', gap: isMobile ? '32px' : '48px', flexWrap: 'wrap' }}
    >
      <div style={{ flex: '1', minWidth: isMobile ? '100%' : '300px' }}>
        <motion.h2 variants={itemVariants} style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: isMobile ? '24px' : '40px', letterSpacing: '-0.02em' }}>
          Welcome back, <span className="text-gradient">Reader.</span>
        </motion.h2>
        
        {/* Active Subscription context */}
        <motion.div variants={itemVariants} className="card" style={{ 
          marginBottom: isMobile ? '24px' : '40px', 
          borderLeft: '4px solid var(--accent-primary)',
          background: 'linear-gradient(135deg, rgba(255,82,119,0.05) 0%, rgba(15,15,20,0.8) 100%)',
          boxShadow: 'var(--shadow-glow)',
          padding: isMobile ? '20px' : '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)', boxShadow: '0 0 10px var(--accent-secondary)' }}></span>
                Active Subscription
              </div>
              <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '12px', letterSpacing: '-0.01em' }}>The Dual Experience</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.95rem' : '1.1rem' }}>Delivering exclusive Comics & Premium Stationery on the 15th.</p>
            </div>
            <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', letterSpacing: '-0.03em' }}>$45.00<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: '500' }}>/mo</span></div>
              <motion.div whileHover={{ scale: 1.05 }} style={{ marginTop: '16px', cursor: 'pointer', color: 'var(--accent-secondary)', fontWeight: '500' }}>
                Manage Plan
              </motion.div>
            </div>
          </div>

          {/* Add to Next Box Highlight */}
          <div style={{ 
            marginTop: '32px', padding: isMobile ? '16px' : '24px', 
            background: 'var(--bg-base)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
          }}>
            <div>
              <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <Package size={20} className="text-gradient-cyan" /> "Add to Next Box" unlocked
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>You have <strong style={{ color: '#fff' }}>2 items</strong> queued for July. Free shipping applied.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('shop')}>Browse Shop</button>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="card" style={{ textAlign: 'center', padding: isMobile ? '28px 20px' : '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '50%', color: 'var(--text-primary)' }}>
              <PauseCircle size={32} strokeWidth={1.5} />
            </div>
            <h4 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Skip a Month</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', flex: 1 }}>Away next month? Pause your delivery with one click.</p>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Skip August</button>
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="card" style={{ textAlign: 'center', padding: isMobile ? '28px 20px' : '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '50%', color: 'var(--text-primary)' }}>
              <Settings size={32} strokeWidth={1.5} />
            </div>
            <h4 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Update Preferences</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', flex: 1 }}>Change your genres and reading habits anytime.</p>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => navigate('quiz')}>Retake Quiz</button>
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} style={{ width: isMobile ? '100%' : '380px', flexShrink: 0, maxWidth: '100%' }}>
        {/* Past Boxes sidebar */}
        <div className="card" style={{ height: isMobile ? 'auto' : '100%', position: isMobile ? 'relative' : 'sticky', top: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <History size={24} className="text-gradient" />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>History</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { month: 'June 2026', theme: 'Neon Nights', status: 'Delivered' },
              { month: 'May 2026', theme: 'Fantasy Realms', status: 'Delivered' },
              { month: 'April 2026', theme: 'Urban Legends', status: 'Delivered' },
            ].map((box, i, arr) => (
              <motion.div 
                key={box.month} 
                whileHover={{ x: 5, background: 'rgba(255,255,255,0.03)' }}
                style={{ 
                  display: 'flex', gap: '20px', alignItems: 'center',
                  borderBottom: i !== arr.length - 1 ? '1px solid var(--border-light)' : 'none', 
                  padding: '20px 16px', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease', cursor: 'pointer'
                }}
              >
                <div style={{ 
                  width: '64px', height: '64px', flexShrink: 0,
                  background: 'var(--bg-base)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)'
                }}>
                  <Package size={28} strokeWidth={1} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{box.theme}</h4>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '6px' }}>{box.month}</div>
                  <div style={{ 
                    display: 'inline-block', background: 'rgba(0,229,255,0.1)', color: 'var(--accent-secondary)', 
                    padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' 
                  }}>
                    {box.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};
