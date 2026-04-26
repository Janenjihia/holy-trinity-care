import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'Behavioral Health',
    description: 'Our Behavioral Health program provides compassionate, personalized care for individuals and families facing mental health challenges. We combine clinical expertise with a holistic approach to support lasting wellness and emotional well-being.',
    items: ['Outpatient Services', 'In-Home Therapy', 'Family Support', 'Child & Adolescent Services'],
    path: '/services/behavioral-health',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/d1a125056_generated_543f7911.png',
    imageLeft: true,
  },
  {
    title: 'Addiction & Substance Program',
    description: 'Our Addiction & Substance Program offers evidence-based treatment and compassionate recovery support. We help individuals break free from addiction and rebuild their lives with dignity, hope, and long-term tools for success.',
    items: ['Medication-Assisted Treatment', 'Counseling Services', 'Recovery Support', 'Evidence-Based Care'],
    path: '/services/addiction-substance',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/586dceb3c_generated_bed2d4eb.png',
    imageLeft: false,
  },
];

export default function ServiceOverview() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl lg:text-5xl text-foreground"
          >
            Comprehensive Care Programs
          </motion.h2>
        </div>

        {/* Services - alternating split layout */}
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!service.imageLeft ? 'lg:[direction:rtl]' : ''}`}
            >
              {/* Image */}
              <div className="lg:[direction:ltr] relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:[direction:ltr]">
                <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-6 text-sm lg:text-base">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.items.map(item => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to={service.path}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold rounded-md px-7 min-h-[48px] gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}