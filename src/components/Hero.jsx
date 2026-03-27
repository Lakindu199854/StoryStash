import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target } from 'lucide-react';

export const Hero = ({ navigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '120px 0' }}
    >
      <div className="container hero-layout" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '80px', position: 'relative', zIndex: 10 }}>
        
        {/* Left Side: Typography */}
        <div style={{ flex: '1 1 500px', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring', delay: 0.1 }}>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              style={{ 
                display: 'inline-block', cursor: 'default',
                background: 'var(--accent-primary)', padding: '8px 20px', borderRadius: '4px',
                boxShadow: '4px 4px 0px rgba(0,240,255,1)', marginBottom: '32px', fontSize: '0.95rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', border: '2px solid #fff'
              }}
            >
              The New Art of Expression
            </motion.div>

            <h1 style={{ fontSize: 'clamp(4.5rem, 10vw, 7.5rem)', fontWeight: 800, lineHeight: 0.9, marginBottom: '24px', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
              Story<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '3px var(--accent-primary)' }}>Stash</span>
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '500px', marginBottom: '40px', lineHeight: 1.6 }}>
              Where graphic narratives meet premium stationery. Every month, a new hand-picked adventure drops at your door.
            </p>
            
            <div className="hero-buttons" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('quiz')} style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '8px', border: '2px solid transparent' }}>
                Build Your Box <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('shop')} style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '8px', border: '2px solid var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
                Explore Shop
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Comic Panel Collage */}
        <div className="hero-panels" style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 220px)', gap: '20px', position: 'relative' }}>
          
          {/* Panel 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -8 }} animate={{ opacity: 1, y: 0, rotate: -4 }} transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            style={{ 
              background: 'var(--bg-surface-elevated)', border: '3px solid var(--accent-secondary)', borderRadius: '12px', 
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              boxShadow: '8px 8px 0px rgba(0,240,255,0.3)', position: 'relative', overflow: 'hidden'
            }}
          >
            <Zap size={48} className="text-gradient-cyan" style={{ filter: 'drop-shadow(0 0 10px var(--accent-secondary))' }} />
            <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.05, fontSize: '10rem', fontWeight: 900 }}>!</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>Exclusive <br/><span style={{ color: 'var(--accent-secondary)' }}>Variants</span></h3>
          </motion.div>

          {/* Panel 2 (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 3 }} transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="hero-panel-tall"
            style={{ 
              gridRow: 'span 2', background: 'linear-gradient(160deg, rgba(20,20,25,0.9) 0%, rgba(255,46,99,0.3) 100%)', 
              border: '3px solid var(--accent-primary)', borderRadius: '12px', padding: '24px',
              display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
              boxShadow: '10px 10px 0px rgba(255,46,99,0.3)'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3, background: 'url(/images/comic_bg.png)', backgroundSize: '200px', mixBlendMode: 'overlay' }} />
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'transparent', WebkitTextStroke: '2px var(--accent-primary)', opacity: 0.9, letterSpacing: '4px' }}>
              Artifacts
            </h3>
            <div style={{ marginTop: 'auto', alignSelf: 'flex-end', zIndex: 2 }}>
              <img src="/images/neon_pink_pen.png" alt="Pen" style={{ height: '220px', objectFit: 'contain', filter: 'drop-shadow(-10px 10px 15px rgba(0,0,0,0.8))', transform: 'rotate(-25deg) scale(1.2)' }} />
            </div>
          </motion.div>

          {/* Panel 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            style={{ 
              background: 'rgba(179,56,255,0.1)', border: '3px solid var(--accent-purple)', borderRadius: '12px', padding: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px',
              boxShadow: '6px 6px 0px rgba(179,56,255,0.3)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Target size={48} color="var(--accent-purple)" style={{ marginBottom: '16px', filter: 'drop-shadow(0 0 10px var(--accent-purple))' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>Perfect <br/>Curation</div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Infinite Kinetic Marquee Strip */}
      <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '120%', transform: 'rotate(-3deg)', background: 'var(--accent-gold)', padding: '16px 0', zIndex: 0, overflow: 'hidden', borderTop: '4px solid #000', borderBottom: '4px solid #000', boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)' }}>
        <motion.div 
          animate={{ x: [0, -1030] }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap', color: '#000', fontWeight: 900, fontSize: '1.6rem', textTransform: 'uppercase', letterSpacing: '6px' }}
        >
          {Array(10).fill("STORY STASH ✦ PREMIUM COMICS ✦ CURATED STATIONERY ✦ EXCLUSIVE EDITIONS ✦ ").map((text, i) => (
            <span key={i} style={{ marginRight: '20px' }}>{text}</span>
          ))}
        </motion.div>
      </div>

    </motion.div>
  );
};
