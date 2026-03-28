import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, PackageCheck, Printer, FileText } from 'lucide-react';

const PACKING_LIST = [
  { id: 'SUB-001', name: 'Alex M.', tier: 'Comics + Stationery', genres: ['Sci-Fi', 'Superhero'], items: '3 Comics, 1 Pen, 1 Notebook' },
  { id: 'SUB-002', name: 'Jordan T.', tier: 'Comics Only', genres: ['Manga', 'Fantasy'], items: '4 Comics' },
  { id: 'SUB-003', name: 'Taylor R.', tier: 'Stationery', genres: ['Indie'], items: '1 Pen, 2 Inks, 1 Paper Pad' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
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

export const Admin = () => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="container" style={{ padding: isMobile ? '32px 16px' : '60px 24px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? '32px' : '48px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <motion.h2 variants={itemVariants} style={{ fontSize: isMobile ? '2rem' : '3rem', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Curation <span className="text-gradient">Dashboard</span>
          </motion.h2>
          <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '1rem' : '1.2rem' }}>
            Manage and generate the upcoming month's subscription boxes.
          </motion.p>
        </div>
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: isMobile ? '12px' : '24px', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
          <div className="card" style={{ padding: isMobile ? '16px' : '24px', minWidth: isMobile ? '0' : '180px', flex: isMobile ? '1 1 calc(50% - 6px)' : 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Users size={16} /> Active Subs
            </div>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              1,204
            </div>
          </div>
          <div className="card" style={{ padding: isMobile ? '16px' : '24px', minWidth: isMobile ? '0' : '180px', flex: isMobile ? '1 1 calc(50% - 6px)' : 'none', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <PackageCheck size={16} /> Boxes to Pack
            </div>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', color: 'var(--accent-secondary)', letterSpacing: '-0.03em' }}>
              842
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: isMobile ? '20px 16px' : '32px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText className="text-gradient-cyan" size={isMobile ? 20 : 24} /> Generate Packing Lists (July 2026)
          </h3>
          <button className="btn btn-primary" style={{ padding: isMobile ? '8px 16px' : '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: isMobile ? '0.85rem' : '1rem' }}>
            <Printer size={16} /> Print All Pending
          </button>
        </div>
        
        {/* Desktop Table */}
        {!isMobile && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '20px 32px', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.95rem' }}>Subscriber</th>
                  <th style={{ padding: '20px 32px', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.95rem' }}>Tier</th>
                  <th style={{ padding: '20px 32px', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.95rem' }}>Preferences</th>
                  <th style={{ padding: '20px 32px', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.95rem' }}>Auto-Curated Items</th>
                  <th style={{ padding: '20px 32px', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.95rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {PACKING_LIST.map((sub, i) => (
                  <motion.tr 
                    key={sub.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    style={{ borderBottom: i !== PACKING_LIST.length - 1 ? '1px solid var(--border-light)' : 'none', transition: 'background 0.2s ease' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '24px 32px' }}>
                      <div style={{ fontWeight: '600', fontSize: '1.05rem', marginBottom: '4px' }}>{sub.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'monospace' }}>{sub.id}</div>
                    </td>
                    <td style={{ padding: '24px 32px', color: 'var(--text-primary)' }}>{sub.tier}</td>
                    <td style={{ padding: '24px 32px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {sub.genres.map((g, idx) => (
                          <span key={g} style={{ 
                            display: 'inline-flex', padding: '4px 10px', borderRadius: '6px', 
                            background: idx % 2 === 0 ? 'rgba(255,82,119,0.1)' : 'rgba(157,78,221,0.1)', 
                            color: idx % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-purple)',
                            fontSize: '0.85rem', fontWeight: '500'
                          }}>
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '24px 32px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{sub.items}</td>
                    <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                       <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Printer size={14} /> Label
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Card View */}
        {isMobile && (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PACKING_LIST.map((sub, i) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                style={{ 
                  padding: '20px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '2px' }}>{sub.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{sub.id}</div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Printer size={12} /> Label
                  </button>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Tier</div>
                  <div style={{ fontSize: '0.95rem' }}>{sub.tier}</div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Genres</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {sub.genres.map((g, idx) => (
                      <span key={g} style={{ 
                        display: 'inline-flex', padding: '3px 8px', borderRadius: '6px', 
                        background: idx % 2 === 0 ? 'rgba(255,82,119,0.1)' : 'rgba(157,78,221,0.1)', 
                        color: idx % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-purple)',
                        fontSize: '0.8rem', fontWeight: '500'
                      }}>
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Items</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.items}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
