import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, HeartHandshake } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'Behavioral Health',
    description: 'Outpatient services, in-home therapy, family support, and child & adolescent services.',
    items: ['Outpatient Services', 'In-Home Therapy', 'Family Support', 'Child & Adolescent Services'],
    path: '/services/behavioral-health',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/d1a125056_generated_543f7911.png',
  },
  {
    icon: HeartHandshake,
    title: 'Addiction & Substance Program',
    description: 'Medication-assisted treatment, counseling, recovery support, and evidence-based care.',
    items: ['Medication-Assisted Treatment', 'Counseling Services', 'Recovery Support', 'Evidence-Based Care'],
    path: '/services/addiction-substance',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/586dceb3c_generated_bed2d4eb.png',
  },
];

export default function ServiceOverview() {
  return (
    <section className="py-24 lg:py-32 relative">
      {/* Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl lg:text-5xl text-foreground mb-4"
          >
            Comprehensive Care Programs
          </motion.h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Two specialized pathways designed to support your unique journey toward wellness and recovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={service.path} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-display text-2xl text-foreground">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground font-body text-sm mb-6 readable-width">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm font-body text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-accent font-body font-semibold text-sm group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}