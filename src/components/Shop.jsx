import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Filter, Plus } from 'lucide-react';
import { TiltCard } from './TiltCard';
const PRODUCTS = [
  { id: 1, name: 'Lamy Safari Fountain Pen - Neon Pink', category: 'Pens', price: 29.50, stock: 15, tag: 'Bestseller', image: '/images/neon_pink_pen.png' },
  { id: 2, name: 'Midori MD Notebook Journal', category: 'Notebooks', price: 18.00, stock: 42, image: '/images/midori_notebook.png' },
  { id: 3, name: 'Kaweco Sport Brass Fountain Pen', category: 'Pens', price: 85.00, stock: 8, tag: 'Premium', image: '/images/brass_pen.png' },
  { id: 4, name: 'Tomoe River Paper Pad A5', category: 'Paper', price: 22.00, stock: 50, image: '/images/midori_notebook.png' },
  { id: 5, name: 'Pilot Iroshizuku Ink - Tsutsuji', category: 'Ink', price: 24.00, stock: 12, image: '/images/ink_bottle.png' },
  { id: 6, name: 'Traveler\'s Company Leather Cover', category: 'Accessories', price: 55.00, stock: 20, image: '/images/leather_cover.png' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const Shop = ({ navigate }) => {
  const [filter, setFilter] = useState('All');
  const [cart, setCart] = useState([]);
  
  const categories = ['All', 'Pens', 'Notebooks', 'Ink', 'Paper', 'Accessories'];
  const filteredProducts = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="container" style={{ padding: '40px 24px', display: 'flex', gap: '48px' }}
    >
      {/* Sidebar Filters */}
      <div style={{ width: '280px', flexShrink: 0 }}>
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', opacity: 0.8 }}>
            <Filter size={18} />
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Categories</h3>
          </div>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setFilter(cat)}
                  style={{ 
                    width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                    background: filter === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: filter === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: filter === cat ? '600' : '400',
                    transition: 'all 0.2s ease',
                    border: '1px solid',
                    borderColor: filter === cat ? 'rgba(255,255,255,0.05)' : 'transparent'
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Cart Context Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card" style={{ marginTop: '48px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} className="text-gradient" />
                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Your Basket</h4>
              </div>
              <div style={{ 
                background: 'rgba(255,82,119,0.2)', color: 'var(--accent-primary)',
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '0.9rem'
              }}>
                {cart.length}
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Subscribers score <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>free shipping</span> when adding items to their monthly box!
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('dashboard')}>
              Proceed to Dashboard
            </button>
          </motion.div>
        </div>
      </div>

      {/* Product Catalog */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '3rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>Curated Goods</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Elevate your craft with our premium selections.</div>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', background: 'var(--bg-surface)', padding: '6px 16px', borderRadius: '99px', border: '1px solid var(--border-light)' }}>
            {filteredProducts.length} items
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={filter} // Re-animate when filter changes
          className="product-grid"
        >
          {filteredProducts.map(product => (
            <TiltCard 
              key={product.id} 
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card" 
              style={{ display: 'flex', flexDirection: 'column', position: 'relative', padding: '24px', gap: '16px' }}
            >
              {product.tag && (
                <div style={{ 
                  position: 'absolute', top: '24px', right: '24px', zIndex: 10,
                  background: 'var(--accent-secondary)', color: '#030305',
                  padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold',
                  display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(0,229,255,0.4)'
                }}>
                  <Star size={12} fill="#030305" />
                  {product.tag}
                </div>
              )}

              <div style={{ 
                height: '240px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', 
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.05)', position: 'relative'
              }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'opacity 0.3s' }} 
                     onMouseOver={e => e.currentTarget.style.opacity = 1} 
                     onMouseOut={e => e.currentTarget.style.opacity = 0.8} />
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {product.category}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', lineHeight: 1.4 }}>{product.name}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary" 
                    style={{ padding: '10px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => addToCart(product)}
                  >
                    <Plus size={16} /> Add
                  </motion.button>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>

    </motion.div>
  );
};
