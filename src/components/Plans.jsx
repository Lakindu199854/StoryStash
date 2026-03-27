import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { TiltCard } from './TiltCard';
const PLANS = [
  {
    id: 'comics',
    name: 'Graphic Narratives',
    price: '$24.99',
    period: '/mo',
    features: ['2-3 curated graphic novels', 'Exclusive variant covers', 'Digital access library'],
    popular: false
  },
  {
    id: 'both',
    name: 'The Dual Experience',
    price: '$45.00',
    period: '/mo',
    features: ['2 curated graphic novels', '3 premium stationery items', 'Themed monthly curation', 'Free shipping'],
    popular: true
  },
  {
    id: 'stationery',
    name: 'Ink & Paper',
    price: '$29.99',
    period: '/mo',
    features: ['4-5 premium stationery items', 'Exclusive brand collaborations', 'Writing guides'],
    popular: false
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const Plans = ({ navigate }) => {
  return (
    <motion.div 
      initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}
      variants={container}
      className="container" style={{ padding: '60px 24px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <motion.h2 variants={item} style={{ fontSize: '3.5rem', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Choose your <span className="text-gradient">journey</span>
        </motion.h2>
        <motion.p variants={item} style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
          We've tailored these options perfectly based on your creative persona.
        </motion.p>
      </div>

      <div className="plans-row" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {PLANS.map((plan) => (
          <TiltCard 
            key={plan.id}
            variants={item}
            whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
            className="card plan-card" 
            style={{ 
              flex: '1', minWidth: '320px', maxWidth: '380px',
              border: plan.popular ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
              boxShadow: plan.popular ? 'var(--shadow-glow)' : 'var(--shadow-subtle)',
              background: plan.popular ? 'linear-gradient(180deg, rgba(255,82,119,0.05) 0%, rgba(15,15,20,0.8) 100%)' : 'var(--bg-surface)',
              position: 'relative',
              display: 'flex', flexDirection: 'column',
              padding: '40px 32px',
              transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
              zIndex: plan.popular ? 2 : 1
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
                padding: '6px 20px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(255,82,119,0.3)', color: '#fff'
              }}>
                <Star size={14} fill="#fff" />
                MOST POPULAR
              </div>
            )}
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>{plan.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: 1 }}>{plan.price}</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>{plan.period}</span>
            </div>
            
            <ul style={{ listStyle: 'none', marginBottom: '40px', flex: '1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem' }}>
                  <div style={{ background: 'rgba(0,229,255,0.1)', padding: '4px', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span style={{ paddingTop: '1px' }}>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%', padding: '16px' }}
              onClick={() => navigate('dashboard')}
            >
              Subscribe Now
            </button>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  );
};
