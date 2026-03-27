import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const computedCursor = window.getComputedStyle(target).cursor;
      
      if (
        computedCursor === 'pointer' || 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') || target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          width: '32px', height: '32px', borderRadius: '50%',
          border: '2px solid var(--accent-primary)',
          backgroundColor: isHovering ? 'rgba(255,82,119,0.2)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px var(--accent-primary)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: 'spring', stiffness: 500, damping: 28, mass: 0.5
        }}
      >
        <motion.div 
          style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent-secondary)', borderRadius: '50%' }}
          animate={{ scale: isHovering ? 0 : 1 }}
        />
      </motion.div>

      <AnimatePresence>
        {clicks.map((click) => (
          <ClickBurst key={click.id} x={click.x} y={click.y} />
        ))}
      </AnimatePresence>
    </>
  );
};

const ClickBurst = ({ x, y }) => {
  const particles = Array.from({ length: 8 });
  
  return (
    <div style={{ position: 'fixed', top: y, left: x, zIndex: 9998, pointerEvents: 'none' }}>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const color = i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ 
              x: Math.cos(angle) * distance, 
              y: Math.sin(angle) * distance,
              scale: 0, opacity: 0, rotate: Math.random() * 360
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: '8px', height: '8px',
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              boxShadow: `0 0 10px ${color}`
            }}
          />
        );
      })}
      
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: 'absolute', top: '-20px', left: '-20px',
          width: '40px', height: '40px',
          border: '2px solid var(--accent-gold)',
          borderRadius: '50%'
        }}
      />
    </div>
  );
};
