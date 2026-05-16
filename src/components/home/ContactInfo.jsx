import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const info = [
  { icon: Phone, label: 'Phone', value: '(781) 989-8159', href: 'tel:7819898159' },
  { icon: Mail, label: 'Email', value: 'info@holytrinitycare.com', href: 'mailto:info@holytrinitycare.com' },
  { icon: MapPin, label: 'Address', value: '109 Washington St, Haverhill, MA 01832' },
  { icon: Clock, label: 'Hours', value: 'Mon – Fri: 9AM – 5PM' },
];

export default function ContactInfo() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-foreground mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-body text-sm text-muted-foreground hover:text-accent transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-body text-sm text-muted-foreground">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}