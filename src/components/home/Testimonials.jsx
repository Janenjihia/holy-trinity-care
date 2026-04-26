import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Holy Trinity Care has been a blessing for our family. The compassion and professionalism of their team helped my mother find hope again during her most difficult days.",
    name: "Margaret H.",
    relation: "Family Member",
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/839fa5d43_generated_2a9a496b.png',
  },
  {
    quote: "The counseling and recovery support changed my life. I finally feel like I have the tools and the community to stay on the path of wellness. I am forever grateful.",
    name: "Robert T.",
    relation: "Client",
    image: 'https://media.base44.com/images/public/69ed9e88109de49093b449ea/a173a20e8_generated_9023989a.png',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Halos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl lg:text-5xl text-foreground"
          >
            Voices of Hope
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 lg:p-10 border border-border shadow-sm relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
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
  );
}