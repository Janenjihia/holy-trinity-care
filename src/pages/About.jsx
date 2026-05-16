import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Eye, Shield, Users, Sparkles } from 'lucide-react';
import CTASection from '../components/home/CTASection';

const values = [
  { icon: Heart, title: 'Compassion', description: 'We treat every individual with dignity, empathy, and genuine care.' },
  { icon: Shield, title: 'Integrity', description: 'Transparency and honesty guide every interaction and decision we make.' },
  { icon: Users, title: 'Community', description: 'We believe healing thrives within supportive, connected communities.' },
  { icon: Sparkles, title: 'Excellence', description: 'We pursue the highest standards in evidence-based care and clinical practice.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4">About Us</p>
              <h1 className="font-display text-4xl lg:text-6xl text-foreground mb-6 leading-[1.1]">
                A Place to Heal,<br />A Promise to Care
              </h1>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 readable-width">
                Holy Trinity Care provides comprehensive behavioral health services for individuals and families in the Haverhill, Massachusetts area. Founded on the principles of compassion and clinical excellence, we are dedicated to supporting mental wellness and encouraging lasting change.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed readable-width">
                Our team of licensed professionals brings together expertise in behavioral health, addiction recovery, family therapy, and child and adolescent services. We believe that every person deserves access to high-quality, culturally sensitive care in an environment that feels safe and nurturing.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://media.base44.com/images/public/69ed9e88109de49093b449ea/59f9dabda_generated_8a2175a4.png"
                alt="A compassionate caregiver looking thoughtfully out a window"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-xl p-6 shadow-lg hidden lg:block">
                <p className="font-display text-3xl">10+</p>
                <p className="font-body text-sm">Years of Service</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 bg-muted/50">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8 lg:p-12 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-4">Our Mission</h2>
              <p className="font-body text-muted-foreground leading-relaxed readable-width">
                To provide compassionate, evidence-based behavioral health and addiction recovery services that empower individuals and families to achieve lasting wellness. We are committed to delivering culturally sensitive care that honors the dignity of every person we serve.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8 lg:p-12 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-4">Our Vision</h2>
              <p className="font-body text-muted-foreground leading-relaxed readable-width">
                To be the leading community-centered behavioral health provider, recognized for transforming lives through innovative, holistic, and accessible care. We envision a world where mental health support is available to all who need it, free from stigma and barriers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4">Our Foundation</p>
            <h2 className="font-display text-3xl lg:text-5xl text-foreground">Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}