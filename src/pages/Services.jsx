import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, HeartHandshake } from 'lucide-react';
import CTASection from '../components/home/CTASection';

const categories = [
  {
    id: 'behavioral',
    icon: Brain,
    title: 'Behavioral Health',
    description: 'Comprehensive outpatient and in-home behavioral health services for individuals and families of all ages.',
    items: [
      { name: 'Outpatient Services', desc: 'Structured therapy and counseling in a supportive outpatient setting.' },
      { name: 'In-Home Therapy', desc: 'Licensed therapists providing care in the comfort of your home.' },
      { name: 'Family Support', desc: 'Strengthening family dynamics through guided therapeutic interventions.' },
      { name: 'Child & Adolescent Services', desc: 'Specialized programs designed for younger individuals and their unique needs.' },
    ],
    path: '/services/behavioral-health',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/d1a125056_generated_543f7911.png',
  },
  {
    id: 'addiction',
    icon: HeartHandshake,
    title: 'Addiction & Substance Program',
    description: 'Evidence-based addiction treatment and recovery support for sustainable wellness.',
    items: [
      { name: 'Medication-Assisted Treatment', desc: 'FDA-approved medications combined with counseling for effective recovery.' },
      { name: 'Counseling Services', desc: 'Individual and group counseling to address root causes of addiction.' },
      { name: 'Recovery Support', desc: 'Ongoing peer support and resources for long-term sobriety.' },
      { name: 'Evidence-Based Care', desc: 'Proven therapeutic approaches tailored to your recovery journey.' },
    ],
    path: '/services/addiction-substance',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/586dceb3c_generated_bed2d4eb.png',
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-6xl text-foreground mb-6"
          >
            Our Services
          </motion.h1>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Two specialized pathways of care, each designed with evidence-based practices and compassionate professionals dedicated to your wellness.
          </p>
        </div>
      </section>

      {/* Dual Path */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link to={cat.path} className="group block">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <cat.icon className="w-5 h-5 text-accent-foreground" />
                          </div>
                          <h2 className="font-display text-2xl text-white">{cat.title}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="font-body text-muted-foreground text-sm mb-6 readable-width">{cat.description}</p>
                      {/* Pillar divider */}
                      <div className="border-l-2 border-accent/20 pl-6 space-y-4 mb-8">
                        {cat.items.map(item => (
                          <div key={item.name}>
                            <p className="font-body font-semibold text-sm text-foreground">{item.name}</p>
                            <p className="font-body text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm group-hover:gap-3 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}