import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import CTASection from '../components/home/CTASection';

const testimonials = [
  {
    quote: "Holy Trinity Care has been a blessing for our family. The compassion and professionalism of their team helped my mother find hope again during her most difficult days. I cannot recommend them enough.",
    name: "Margaret H.",
    relation: "Family Member",
    image: '/__generating__/img_bcd133f3aab0.png',
    stars: 5,
  },
  {
    quote: "The counseling and recovery support changed my life. I finally feel like I have the tools and the community to stay on the path of wellness. I am forever grateful for the Holy Trinity Care team.",
    name: "Robert T.",
    relation: "Client",
    image: '/__generating__/img_293f47540098.png',
    stars: 5,
  },
  {
    quote: "From my very first appointment, I felt heard and respected. The in-home therapy program made it possible for me to get the help I needed without leaving the comfort of my home.",
    name: "Sandra M.",
    relation: "Client",
    image: '/__generating__/img_bcd133f3aab0.png',
    stars: 5,
  },
  {
    quote: "The medication-assisted treatment program gave me my life back. The staff are knowledgeable, compassionate, and they truly care about every patient's progress and long-term recovery.",
    name: "James L.",
    relation: "Client",
    image: '/__generating__/img_293f47540098.png',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4"
          >
            What Our Clients Say
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-6xl text-foreground mb-6"
          >
            Voices of Hope
          </motion.h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Real stories from the individuals and families whose lives have been transformed through our compassionate care.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 lg:p-10 border border-border shadow-sm relative"
              >
                <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="font-body text-foreground/90 leading-relaxed mb-8 readable-width italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="font-body text-muted-foreground text-xs">{t.relation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}