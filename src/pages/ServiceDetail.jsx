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
    subtitle: 'Outpatient Counseling for Children & Families',
    description: 'For young people who are struggling with a variety of mental or behavioral health issues, Holy Trinity Care offers a variety of counseling for children and their families. Our Outpatient Centers offer comprehensive mental health services in comfortable and professional settings. When more intensive services are needed, we also have a team that can provide therapy for children and families in the child\'s home.',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/d1a125056_generated_543f7911.png',
    services: [
      {
        name: 'Outpatient Counseling',
        description: 'Our clinicians offer individual, group, and family therapy in professional outpatient settings. We also offer virtual appointments by video or phone — secure, easy-to-use, and proven to be comparable to in-person therapy. We are accepting new clients.',
        features: ['Individual Therapy', 'Group Therapy', 'Family Therapy', 'Virtual / Telehealth'],
      },
      {
        name: 'In-Home Therapy',
        description: 'When more intensive services are needed, our team provides therapy for children and families in the child\'s home. Family participation is encouraged to broaden understanding and support healing of the entire family unit.',
        features: ['Licensed Therapists', 'Flexible Scheduling', 'Personalized Care Plans', 'Family Involvement'],
      },
      {
        name: 'Child & Adolescent Services',
        description: 'Whether it\'s a young person struggling with depression, a teenager experiencing suicidal thoughts, or a family having difficulty with a child\'s social interactions — our caring clinicians understand that when your child hurts, so does the entire family.',
        features: ['Suicidal Thoughts / Self-Harm', 'ADHD & Behavioral Issues', 'Anxiety & Depression', 'School Refusal & Trauma'],
      },
      {
        name: 'Psychiatry & Medication Management',
        description: 'When appropriate and combined with counseling, medication can be an integral part of the therapeutic process. Our prescribers help families navigate this with a unified, integrated treatment plan.',
        features: ['Psychiatric Evaluations', 'Medication Consultation', 'Integrated Treatment Plans', 'Grief & Abuse Support'],
      },
    ],
  },
  'addiction-substance': {
    icon: HeartHandshake,
    title: 'Addiction & Substance Program',
    subtitle: 'Comprehensive Dual Diagnosis & Recovery Treatment',
    description: 'Holy Trinity Care provides exceptional dual diagnosis treatment, addressing both substance use and mental health disorders simultaneously. We combine Medication-Assisted Treatment (MAT) with individual, couple, and family therapy to help individuals overcome addiction and build a sustainable path to wellness.',
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/586dceb3c_generated_bed2d4eb.png',
    services: [
      {
        name: 'Medication-Assisted Treatment (MAT)',
        description: 'We offer onsite MAT services, combining FDA-approved medication with counseling for a comprehensive treatment approach that addresses physical dependence alongside psychological factors.',
        features: ['FDA-Approved Medications', 'Onsite MAT Services', 'Individualized Dosing', 'Integrated Counseling'],
      },
      {
        name: 'Individual, Couple & Family Therapy',
        description: 'We offer comprehensive therapeutic services that involve not only the individual but also their support system, recognizing that healing often extends beyond the patient to relationships and family dynamics.',
        features: ['Individual Counseling', 'Couples Therapy', 'Family Sessions', 'Trauma-Informed Care'],
      },
      {
        name: 'Integrated Treatment Approach',
        description: 'Our unified treatment team addresses both substance use and mental health disorders simultaneously, eliminating the fragmented care often experienced elsewhere. CBT, DBT, and other evidence-based modalities are used throughout.',
        features: ['Dual Diagnosis Treatment', 'CBT & DBT', 'Unified Care Team', 'Relapse Prevention'],
      },
      {
        name: 'Evidence-Based Care',
        description: 'All our treatment modalities are grounded in research-proven approaches, ensuring you receive the most effective care available. We accept most insurance, Medicaid, Medicare, and Managed Care coverage.',
        features: ['Research-Backed Methods', 'Outcome Tracking', 'Insurance & Medicaid Accepted', 'Compassionate Support'],
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