import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import your images
import dianiImage from './images/diani.jpg';
import tokyoImage from './images/tokyo.jpg';
import monacoImage from './images/monaco.jpg';
import dubaiImage from './images/dubai.jpg';
import londonImage from './images/london.jpg';
import nyImage from './images/new-york.jpg';
import parisImage from './images/paris.jpg';
import berlinImage from './images/berlin.jpg';

const sections = [
  { 
    id: 'Diani,KENYA', 
    title: 'Diani', 
    theme: 'blue',
    image: dianiImage,
    filter: 'rgba(32, 178, 170, 0.4)',
    accentColor: '#20b2aa'
  },
  { 
    id: 'Tokyo,JAPAN', 
    title: 'Tokyo', 
    theme: 'pink',
    image: tokyoImage,
    filter: 'rgba(231, 84, 128, 0.4)',
    accentColor: '#e75480'
  },
  { 
    id: 'Monaco,', 
    title: 'Monaco', 
    theme: 'red',
    image: monacoImage,
    filter: 'rgba(231, 76, 60, 0.4)',
    accentColor: '#e74c3c'
  },
  { 
    id: 'Dubai,UNITED ARAB EMIRATES', 
    title: 'Dubai', 
    theme: 'gold',
    image: dubaiImage,
    filter: 'rgba(255, 215, 0, 0.4)',
    accentColor: '#ffd700'
  },
  { 
    id: 'London,UNITED KINGDOM', 
    title: 'London', 
    theme: 'brown',
    image: londonImage,
    filter: 'rgba(139, 92, 42, 0.4)',
    accentColor: '#8b5c2a'
  },
  { 
    id: 'New York,USA', 
    title: 'New York', 
    theme: 'indigo',
    image: nyImage,
    filter: 'rgba(75, 0, 130, 0.4)',
    accentColor: '#4b0082'
  },
  { 
    id: 'Paris,FRANCE', 
    title: 'Paris', 
    theme: 'purple',
    image: parisImage,
    filter: 'rgba(142, 68, 173, 0.4)',
    accentColor: '#8e44ad'
  },
  { 
    id: 'Berlin,GERMANY', 
    title: 'Berlin', 
    theme: 'teal',
    image: berlinImage,
    filter: 'rgba(32, 207, 207, 0.4)',
    accentColor: '#20cfcf'
  },
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!hovered) {
      timeoutRef.current = setTimeout(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % sections.length);
      }, 5000);
    }

    return () => {
      resetTimeout();
    };
  }, [currentSlide, hovered]);

  const handleVisitNow = (section) => {
    navigate(`/visit/${section.title.toLowerCase().replace(/\s+/g, '')}`);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
    resetTimeout();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sections.length);
    resetTimeout();
  };

  // Unified transition settings
  const transitionConfig = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    duration: 0.5
  };

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 1000 : -1000,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      x: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      opacity: 0,
      x: direction < 0 ? 1000 : -1000,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      {/* Background Images with Synchronized Transition */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transitionConfig}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev();
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${sections[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        >
          {/* Color Filter with Matching Animation */}
          <motion.div
            key={`filter-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionConfig}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: sections[currentSlide].filter,
              zIndex: 1
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Main Content */}
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={transitionConfig}
          style={{
            textAlign: 'center',
            padding: '40px',
            margin: '0 auto',
            maxWidth: '600px',
            position: 'relative',
            zIndex: 2,
            
            
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.h2
            key={`title-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              color: '#fff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              textShadow: `0 0 20px ${sections[currentSlide].filter}`,
            }}
          >
            {sections[currentSlide].title}
          </motion.h2>
          
          <motion.button
            onClick={() => handleVisitNow(sections[currentSlide])}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: sections[currentSlide].accentColor,
              color: '#000'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 40px',
              borderRadius: '0',
              border: `2px solid ${sections[currentSlide].accentColor}`,
              background: 'transparent',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Explore
          </motion.button>
        </motion.div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {sections.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
                resetTimeout();
              }}
              whileHover={{ scale: 1.2 }}
              style={{
                width: i === currentSlide ? '24px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: i === currentSlide ? sections[currentSlide].accentColor : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>
      
    </div>
  );
};

export default LandingPage;