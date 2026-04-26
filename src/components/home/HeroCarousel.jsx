import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/d1a125056_generated_543f7911.png',
  },
  {
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/586dceb3c_generated_bed2d4eb.png',
  },
  {
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/59f9dabda_generated_8a2175a4.png',
  },
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Lives Transformed' },
  { value: '98%', label: 'Client Satisfaction' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent(prev => (prev + 1) % slides.length);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: Image Carousel */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[520px] shadow-xl">
            <AnimatePresence mode="sync">
              <motion.img
                key={current}
                src={slides[current].image}
                alt="Holy Trinity Care"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/30 hover:bg-white/60 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/30 hover:bg-white/60 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1.15] mb-5"
            >
              A Place to Heal,<br className="hidden sm:block" /> A Promise to Care
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-body text-muted-foreground leading-relaxed mb-8 text-sm lg:text-base"
            >
              At Holy Trinity Care, we provide a safe, structured, and supportive environment where individuals can begin their healing journey with confidence. Our approach combines clinical expertise with genuine compassion, ensuring that every patient receives personalized, evidence-based care. We are committed not only to helping individuals recover from trauma and life's challenges, but also to walking alongside them every step of the way, offering consistent support, dignity, and hope for lasting well-being.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link to="/request-services">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold rounded-md px-7 min-h-[48px]">
                  Request Services
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 font-body font-semibold rounded-md px-7 min-h-[48px]">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border"
            >
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl lg:text-3xl text-accent mb-1">{stat.value}</p>
                  <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}