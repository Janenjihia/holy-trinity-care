import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '(781) 989-8159', href: 'tel:7819898159' },
  { icon: Mail, label: 'Email', value: 'info@holytrinitycare.com', href: 'mailto:info@holytrinitycare.com' },
  { icon: MapPin, label: 'Address', value: '109 Washington St, Haverhill, MA 01832' },
  { icon: Clock, label: 'Hours', value: 'Mon – Fri: 9AM – 5PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ContactMessage.create(form);
    toast.success('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-6xl text-foreground mb-6"
          >
            Contact Us
          </motion.h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            We're here to help. Reach out with questions about our services, or send us a message and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Info + Map */}
            <div className="lg:col-span-2 space-y-8">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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

              {/* Google Review Button */}
              <a
                href="https://www.google.com/search?client=safari&hs=biR&sca_esv=292821a49894646c&biw=430&bih=729&sxsrf=ANbL-n4zWcPl7pu8USfvlnxUa3m-a5rvzA:1777208437305&kgmid=/g/11z5d9ddhb&q=Holy+Trinity+Care,+LLC&shem=rimspwouoe&shndl=30&source=sh/x/loc/tile/m1/3&kgs=9082ea5a6dd8a416&utm_source=rimspwouoe,sh/x/loc/tile/m1/3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-border text-gray-800 font-body font-semibold text-sm px-5 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm w-full justify-center"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Leave Us a Google Review
              </a>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-64 lg:h-80">
                <MapContainer
                  center={[42.7762, -71.0773]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  <Marker position={[42.7762, -71.0773]}>
                    <Popup>
                      Holy Trinity Care<br />109 Washington St, Haverhill, MA
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl border border-border p-8 lg:p-12">
                <h2 className="font-display text-2xl text-foreground mb-2">Send Us a Message</h2>
                <p className="font-body text-sm text-muted-foreground mb-8">Fill out the form and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-body text-sm">Full Name *</Label>
                      <Input id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-body text-sm">Email *</Label>
                      <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="font-body text-sm">Phone</Label>
                      <Input id="phone" name="phone" value={form.phone} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="font-body text-sm">Subject</Label>
                      <Input id="subject" name="subject" value={form.subject} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-body text-sm">Message *</Label>
                    <Textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="mt-1.5" />
                  </div>
                  <Button type="submit" disabled={sending} className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[52px]">
                    {sending ? 'Sending...' : <>Send Message <Send className="ml-2 w-4 h-4" /></>}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}