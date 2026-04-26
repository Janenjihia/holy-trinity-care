import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Brain, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTASection from '../components/home/CTASection';

const servicesData = {
  'behavioral-health': {
    icon: Brain,
    title: 'Behavioral Health',
    subtitle: 'Comprehensive outpatient and in-home behavioral health services',
    description: 'Our behavioral health program offers a full spectrum of outpatient and in-home services designed to support individuals and families through life\'s most challenging moments. Our licensed clinicians use evidence-based approaches to help you achieve emotional balance, strengthen relationships, and build resilience.',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/d1a125056_generated_543f7911.png',
    services: [
      {
        name: 'Outpatient Services',
        description: 'Our outpatient program provides structured therapy sessions including individual counseling, group therapy, and psychiatric evaluations. We work with you to develop a personalized treatment plan that addresses your specific needs.',
        features: ['Individual Therapy', 'Group Therapy', 'Psychiatric Evaluations', 'Treatment Planning'],
      },
      {
        name: 'In-Home Therapy',
        description: 'Our licensed therapists come to you, providing high-quality behavioral health care in the comfort and safety of your own home. This service is ideal for individuals who may have difficulty accessing traditional outpatient settings.',
        features: ['Licensed Therapists', 'Flexible Scheduling', 'Personalized Care Plans', 'Family Involvement'],
      },
      {
        name: 'Family Support',
        description: 'We help families navigate conflict, improve communication, and build stronger bonds. Our family therapy services address the dynamics that affect each member\'s mental health and well-being.',
        features: ['Family Therapy Sessions', 'Communication Skills', 'Conflict Resolution', 'Parenting Support'],
      },
      {
        name: 'Child & Adolescent Services',
        description: 'Specialized programs designed for children and adolescents, addressing behavioral, emotional, and developmental challenges with age-appropriate, engaging therapeutic approaches.',
        features: ['Play Therapy', 'Behavioral Interventions', 'School Coordination', 'Developmental Support'],
      },
    ],
  },
  'addiction-substance': {
    icon: HeartHandshake,
    title: 'Addiction & Substance Program',
    subtitle: 'Evidence-based addiction treatment and recovery support',
    description: 'Our addiction and substance program provides a comprehensive, compassionate approach to recovery. We combine medication-assisted treatment with counseling and community support to help individuals overcome addiction and build a sustainable path to wellness.',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/586dceb3c_generated_bed2d4eb.png',
    services: [
      {
        name: 'Medication-Assisted Treatment',
        description: 'Our MAT program uses FDA-approved medications in combination with counseling and behavioral therapies to treat substance use disorders. This whole-patient approach addresses the biological, psychological, and social aspects of addiction.',
        features: ['FDA-Approved Medications', 'Individualized Dosing', 'Regular Monitoring', 'Integrated Counseling'],
      },
      {
        name: 'Counseling Services',
        description: 'Individual and group counseling sessions designed to address the root causes of addiction, develop coping strategies, and build a strong foundation for long-term recovery.',
        features: ['Individual Counseling', 'Group Sessions', 'CBT & DBT', 'Trauma-Informed Care'],
      },
      {
        name: 'Recovery Support',
        description: 'Ongoing peer support, mentorship, and community resources to help you maintain sobriety and thrive in your daily life. We believe recovery is a lifelong journey and we are here for every step.',
        features: ['Peer Support Groups', 'Recovery Mentorship', 'Community Resources', 'Relapse Prevention'],
      },
      {
        name: 'Evidence-Based Care',
        description: 'All our treatment approaches are grounded in the latest clinical research. We continuously update our methods to ensure you receive the most effective care available.',
        features: ['Research-Backed Methods', 'Outcome Tracking', 'Continuous Improvement', 'Best Practice Standards'],
      },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = servicesData[slug];

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-display text-3xl text-foreground mb-4">Service Not Found</h1>
        <Link to="/services" className="text-accent font-body">Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative">
          <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 min-h-[48px]">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <data.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-accent font-body font-semibold text-sm tracking-widest uppercase">
                  {data.title}
                </p>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl text-foreground mb-6 leading-[1.1]">{data.subtitle}</h1>
              <p className="font-body text-muted-foreground leading-relaxed readable-width mb-8">{data.description}</p>
              <Link to="/request-services">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[52px]">
                  Request This Service <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={data.image}
                alt={data.title}
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-24 lg:py-32 bg-muted/50">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">What We Offer</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {data.services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <h3 className="font-display text-xl text-foreground mb-3">{service.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 readable-width">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}