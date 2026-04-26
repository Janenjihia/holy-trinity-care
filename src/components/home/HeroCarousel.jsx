import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/__generating__/img_c08e3818f1ab.png',
    headline: 'A Place to Heal, A Promise to Care',
    subtitle: 'Compassionate behavioral health and home care services for your complete wellness journey.',
  },
  {
    image: '/__generating__/img_aebab82dffa5.png',
    headline: 'Comprehensive Behavioral Health Services',
    subtitle: 'Supporting mental wellness for individuals and families. Encouraging lasting change.',
  },
  {
    image: '/__generating__/img_962aa94d900e.png',
    headline: 'Your Recovery Begins Here',
    subtitle: 'Evidence-based addiction treatment and recovery support tailored to your unique journey.',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[90vh] min-h-[580px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/55" />
        </motion.div>
      </AnimatePresence>

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl text-white leading-[1.1] mb-5">
              {slides[current].headline}
            </h1>
            <p className="text-white/80 text-base lg:text-lg font-body leading-relaxed mb-8 max-w-xl mx-auto">
              {slides[current].subtitle}
            </p>
            <Link to="/request-services">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-10 min-h-[52px] text-base shadow-lg">
                Request Service Today
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex gap-3 mt-10 absolute bottom-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Left / Right Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/35 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/35 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </section>
  );
}