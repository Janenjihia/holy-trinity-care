import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl lg:text-5xl text-primary-foreground mb-6">
            Schedule Your Appointment Today
          </h2>
          <p className="font-body text-primary-foreground/70 max-w-xl mx-auto mb-10">
            Take the first step toward healing. Our team is ready to support you and your family on the path to wellness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-appointment">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[52px] text-base">
                <Calendar className="mr-2 w-4 h-4" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:7819898159">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body rounded-full px-8 min-h-[52px] text-base">
                <Phone className="mr-2 w-4 h-4" />
                Call (781) 989-8159
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}