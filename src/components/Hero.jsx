import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target } from 'lucide-react';

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

export const Hero = ({ navigate }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: isMobile ? '100px 0 160px' : '120px 0 140px' }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: isMobile ? '40px' : 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 10 }}>
        
        {/* Left Side: Typography */}
        <div style={{ flex: '1 1 280px', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring', delay: 0.1 }}>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              style={{ 
                display: 'inline-block', cursor: 'default',
                background: 'var(--accent-primary)', padding: '8px 20px', borderRadius: '4px',
                boxShadow: '4px 4px 0px rgba(0,240,255,1)', marginBottom: '32px', fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', border: '2px solid #fff'
              }}
            >
              The New Art of Expression
            </motion.div>

            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', fontWeight: 800, lineHeight: 0.9, marginBottom: '24px', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
              Story<br />
              <span style={{ color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.3vw, 3px) var(--accent-primary)' }}>Stash</span>
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '500px', marginBottom: '40px', lineHeight: 1.6 }}>
              Where graphic narratives meet premium stationery. Every month, a new hand-picked adventure drops at your door.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('quiz')} style={{ padding: '14px 28px', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', borderRadius: '8px', border: '2px solid transparent' }}>
                Build Your Box <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('shop')} style={{ padding: '14px 28px', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', borderRadius: '8px', border: '2px solid var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
                Explore Shop
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Comic Panel Collage */}
        {isMobile ? (
          /* Mobile: Simple stacked layout — no 2-row span */
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            
            {/* Panel 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ 
                background: 'var(--bg-surface-elevated)', border: '3px solid var(--accent-secondary)', borderRadius: '12px', 
                padding: '20px', display: 'flex', alignItems: 'center', gap: '16px',
                boxShadow: '6px 6px 0px rgba(0,240,255,0.3)', overflow: 'hidden'
              }}
            >
              <Zap size={36} className="text-gradient-cyan" style={{ filter: 'drop-shadow(0 0 10px var(--accent-secondary))', flexShrink: 0 }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>Exclusive <span style={{ color: 'var(--accent-secondary)' }}>Variants</span></h3>
            </motion.div>

            {/* Panel 2 (Artifacts — horizontal on mobile) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                background: 'linear-gradient(160deg, rgba(20,20,25,0.9) 0%, rgba(255,46,99,0.3) 100%)', 
                border: '3px solid var(--accent-primary)', borderRadius: '12px', padding: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
                boxShadow: '8px 8px 0px rgba(255,46,99,0.3)', minHeight: '120px'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3, background: 'url(/images/comic_bg.png)', backgroundSize: '200px', mixBlendMode: 'overlay' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '2px var(--accent-primary)', opacity: 0.9, letterSpacing: '4px', zIndex: 2 }}>
                Artifacts
              </h3>
              <img src="/images/neon_pink_pen.png" alt="Pen" style={{ height: '80px', objectFit: 'contain', filter: 'drop-shadow(-5px 5px 10px rgba(0,0,0,0.8))', transform: 'rotate(-25deg)', zIndex: 2 }} />
            </motion.div>

            {/* Panel 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              style={{ 
                background: 'rgba(179,56,255,0.1)', border: '3px solid var(--accent-purple)', borderRadius: '12px', padding: '20px',
                display: 'flex', alignItems: 'center', gap: '16px',
                boxShadow: '6px 6px 0px rgba(179,56,255,0.3)'
              }}
            >
              <Target size={36} color="var(--accent-purple)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-purple))', flexShrink: 0 }} />
              <div style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>Perfect Curation</div>
            </motion.div>

          </div>
        ) : (
          /* Desktop: Original 2-column grid */
          <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, clamp(140px, 20vw, 220px))', gap: 'clamp(12px, 2vw, 20px)', position: 'relative' }}>
            
            {/* Panel 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -8 }} animate={{ opacity: 1, y: 0, rotate: -4 }} transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              style={{ 
                background: 'var(--bg-surface-elevated)', border: '3px solid var(--accent-secondary)', borderRadius: '12px', 
                padding: 'clamp(12px, 3vw, 24px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxShadow: '8px 8px 0px rgba(0,240,255,0.3)', position: 'relative', overflow: 'hidden'
              }}
            >
              <Zap size={48} className="text-gradient-cyan" style={{ filter: 'drop-shadow(0 0 10px var(--accent-secondary))' }} />
              <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.05, fontSize: '10rem', fontWeight: 900 }}>!</div>
              <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>Exclusive <br/><span style={{ color: 'var(--accent-secondary)' }}>Variants</span></h3>
            </motion.div>

            {/* Panel 2 (Tall) */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 3 }} transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              style={{ 
                gridRow: 'span 2', background: 'linear-gradient(160deg, rgba(20,20,25,0.9) 0%, rgba(255,46,99,0.3) 100%)', 
                border: '3px solid var(--accent-primary)', borderRadius: '12px', padding: 'clamp(12px, 3vw, 24px)',
                display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
                boxShadow: '10px 10px 0px rgba(255,46,99,0.3)'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3, background: 'url(/images/comic_bg.png)', backgroundSize: '200px', mixBlendMode: 'overlay' }} />
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'transparent', WebkitTextStroke: '2px var(--accent-primary)', opacity: 0.9, letterSpacing: '4px' }}>
                Artifacts
              </h3>
              <div style={{ marginTop: 'auto', alignSelf: 'flex-end', zIndex: 2 }}>
                <img src="/images/neon_pink_pen.png" alt="Pen" style={{ height: 'clamp(120px, 20vw, 220px)', objectFit: 'contain', filter: 'drop-shadow(-10px 10px 15px rgba(0,0,0,0.8))', transform: 'rotate(-25deg) scale(1.2)' }} />
              </div>
            </motion.div>

            {/* Panel 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              style={{ 
                background: 'rgba(179,56,255,0.1)', border: '3px solid var(--accent-purple)', borderRadius: '12px', padding: 'clamp(12px, 3vw, 24px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px',
                boxShadow: '6px 6px 0px rgba(179,56,255,0.3)'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Target size={48} color="var(--accent-purple)" style={{ marginBottom: '12px', filter: 'drop-shadow(0 0 10px var(--accent-purple))' }} />
                <div style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>Perfect <br/>Curation</div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
      
      {/* Infinite Kinetic Marquee Strip */}
      <div style={{ position: 'absolute', bottom: isMobile ? '3%' : '10%', left: '-10%', width: '120%', transform: 'rotate(-3deg)', background: 'var(--accent-gold)', padding: 'clamp(8px, 2vw, 16px) 0', zIndex: 0, overflow: 'hidden', borderTop: '4px solid #000', borderBottom: '4px solid #000', boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)' }}>
        <motion.div 
          animate={{ x: [0, -1030] }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap', color: '#000', fontWeight: 900, fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', textTransform: 'uppercase', letterSpacing: '6px' }}
        >
          {Array(10).fill("STORY STASH ✦ PREMIUM COMICS ✦ CURATED STATIONERY ✦ EXCLUSIVE EDITIONS ✦ ").map((text, i) => (
            <span key={i} style={{ marginRight: '20px' }}>{text}</span>
          ))}
        </motion.div>
      </div>

    </motion.div>
  );
};
