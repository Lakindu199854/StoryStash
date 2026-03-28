import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, PenTool, Sparkles, Rocket, Flame, Zap, 
  Search, Book, Palette, Edit3, Package, Check
} from 'lucide-react';

const QUIZ_STEPS = [
  {
    id: 1,
    title: 'What fuels your passion?',
    subtitle: 'Select your primary interest to help us curate your first box.',
    options: [
      { id: 'comics_only', label: 'Graphic Novels & Comics', icon: <BookOpen size={48} strokeWidth={1.5} /> },
      { id: 'stationery_only', label: 'Premium Stationery', icon: <PenTool size={48} strokeWidth={1.5} /> },
      { id: 'both', label: 'The Best of Both Worlds', icon: <Sparkles size={48} strokeWidth={1.5} /> },
    ]
  },
  {
    id: 2,
    title: 'Select your favorite genres',
    subtitle: 'Pick up to 3 genres you love reading or writing about.',
    options: [
      { id: 'scifi', label: 'Sci-Fi', icon: <Rocket size={40} strokeWidth={1.5} /> },
      { id: 'fantasy', label: 'Fantasy', icon: <Flame size={40} strokeWidth={1.5} /> },
      { id: 'superhero', label: 'Superhero', icon: <Zap size={40} strokeWidth={1.5} /> },
      { id: 'mystery', label: 'Mystery/Noir', icon: <Search size={40} strokeWidth={1.5} /> },
      { id: 'manga', label: 'Manga', icon: <Book size={40} strokeWidth={1.5} /> },
      { id: 'indie', label: 'Indie Art', icon: <Palette size={40} strokeWidth={1.5} /> },
    ],
    multiSelect: true
  },
  {
    id: 3,
    title: 'How often do you write/draw?',
    subtitle: 'This helps us size the stationery pack correctly.',
    options: [
      { id: 'daily', label: 'Daily (Heavy User)', icon: <Edit3 size={48} strokeWidth={1.5} /> },
      { id: 'weekly', label: 'Weekly (Casual)', icon: <PenTool size={48} strokeWidth={1.5} /> },
      { id: 'rarely', label: 'Rarely (Collector)', icon: <Package size={48} strokeWidth={1.5} /> }
    ]
  }
];

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

export const Quiz = ({ navigate }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isBuilding, setIsBuilding] = useState(false);
  const isMobile = useIsMobile();

  const currentStep = QUIZ_STEPS[stepIndex];

  const handleSelect = (optionId) => {
    if (currentStep.multiSelect) {
      const currentSelections = answers[currentStep.id] || [];
      if (currentSelections.includes(optionId)) {
        setAnswers({ ...answers, [currentStep.id]: currentSelections.filter(id => id !== optionId) });
      } else {
        if (currentSelections.length < 3) {
          setAnswers({ ...answers, [currentStep.id]: [...currentSelections, optionId] });
        }
      }
    } else {
      setAnswers({ ...answers, [currentStep.id]: optionId });
      setTimeout(handleNext, 400); // Auto-advance for single select
    }
  };

  const handleNext = () => {
    if (stepIndex < QUIZ_STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      navigate('plans');
    }, 3000);
  };

  if (isBuilding) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="container" style={{ padding: isMobile ? '80px 16px' : '120px 24px', textAlign: 'center', maxWidth: '600px' }}
      >
        <motion.div 
          animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ width: '80px', height: '80px', margin: '0 auto 40px', position: 'relative' }}
        >
          <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(255,255,255,0.1)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: 'var(--accent-primary)', borderRadius: '50%' }} />
          <Sparkles className="text-gradient" size={32} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', stroke: 'var(--accent-primary)' }} />
        </motion.div>
        
        <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '16px' }}>Curating Your Box<span className="text-gradient">...</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '1rem' : '1.2rem' }}>We are matching your preferences with our premium collection of stories and stationery.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="container" style={{ padding: isMobile ? '24px 16px' : '40px 24px', maxWidth: '800px' }}
    >
      {/* Progress Bar */}
      <div style={{ marginBottom: isMobile ? '36px' : '60px', display: 'flex', gap: '8px' }}>
        {QUIZ_STEPS.map((step, idx) => (
          <div key={step.id} style={{ 
            height: '4px', flex: 1, borderRadius: '4px',
            background: idx <= stepIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
            transition: 'background 0.5s ease',
            boxShadow: idx <= stepIndex ? '0 0 10px rgba(255,82,119,0.5)' : 'none'
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={stepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '48px' }}>
            <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.5rem', marginBottom: '12px', letterSpacing: '-0.02em' }}>{currentStep.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.95rem' : '1.15rem' }}>{currentStep.subtitle}</p>
          </div>

          <motion.div 
            variants={containerVariants} initial="hidden" animate="show"
            className="product-grid" style={{ gridTemplateColumns: currentStep.multiSelect ? `repeat(auto-fill, minmax(${isMobile ? '140px' : '200px'}, 1fr))` : '1fr' }}
          >
            {currentStep.options.map((option) => {
              const isSelected = currentStep.multiSelect 
                ? (answers[currentStep.id] || []).includes(option.id)
                : answers[currentStep.id] === option.id;

              return (
                <motion.div 
                  variants={itemVariants}
                  whileHover={isMobile ? {} : { scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  key={option.id}
                  className="card"
                  onClick={() => handleSelect(option.id)}
                  style={{
                    cursor: 'pointer',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
                    background: isSelected ? 'rgba(255,82,119,0.05)' : 'var(--bg-surface)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '12px' : '20px', padding: isMobile ? '24px 16px' : '36px',
                    boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-subtle)',
                    position: 'relative'
                  }}
                >
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', top: 12, right: 12, color: 'var(--accent-primary)' }}>
                      <Check size={18} />
                    </motion.div>
                  )}
                  <div style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'color 0.3s' }}>
                    {option.icon}
                  </div>
                  <div style={{ fontSize: isMobile ? '0.95rem' : '1.15rem', fontWeight: '500', textAlign: 'center' }}>{option.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: isMobile ? '32px' : '60px' }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
          style={{ opacity: stepIndex === 0 ? 0 : 1, pointerEvents: stepIndex === 0 ? 'none' : 'auto' }}
        >
          Back
        </button>
        {currentStep.multiSelect && (
          <button className="btn btn-primary" onClick={handleNext}>
            {stepIndex === QUIZ_STEPS.length - 1 ? 'See Your Box' : 'Next Step'}
          </button>
        )}
      </div>
    </motion.div>
  );
};
