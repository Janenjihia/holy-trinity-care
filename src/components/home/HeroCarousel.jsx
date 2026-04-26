import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const slides = [
  {
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/23ec4e627_generated_aa127f95.png',
    headline: 'Compassionate Care,\nLasting Change',
    subtitle: 'Supporting mental wellness for individuals and families through evidence-based behavioral health services.',
  },
  {
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/714630235_generated_b55a6775.png',
    headline: 'A Place to Heal,\nA Promise to Care',
    subtitle: 'Comprehensive behavioral health and addiction services tailored to your unique journey toward recovery.',
  },
  {
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/a8d86f9f6_generated_f9d9d2dd.png',
    headline: 'Your Recovery\nBegins Here',
    subtitle: 'From outpatient therapy to medication-assisted treatment, we walk beside you every step of the way.',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Peripheral Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[120rem] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6 whitespace-pre-line">
              {slides[current].headline}
            </h1>
            <p className="text-white/80 text-base lg:text-lg font-body leading-relaxed mb-8 readable-width">
              {slides[current].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-appointment">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[52px] text-base">
                  Schedule Appointment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-body rounded-full px-8 min-h-[52px] text-base">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 min-w-[48px] min-h-[12px] flex items-center ${
                i === current ? 'bg-accent w-12' : 'bg-white/30 w-6 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={`block h-1 rounded-full w-full ${i === current ? 'bg-accent' : 'bg-white/30'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  );
}