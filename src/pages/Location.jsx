import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
import CTASection from '../components/home/CTASection';

const info = [
  { icon: MapPin, label: 'Address', value: '109 Washington St, Haverhill, MA 01832' },
  { icon: Phone, label: 'Phone', value: '(781) 989-8159', href: 'tel:7819898159' },
  { icon: Mail, label: 'Email', value: 'info@holytrinitycare.com', href: 'mailto:info@holytrinitycare.com' },
  { icon: Clock, label: 'Office Hours', value: 'Monday – Friday: 9:00 AM – 5:00 PM' },
];

export default function Location() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Find Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-6xl text-foreground mb-6"
          >
            Our Location
          </motion.h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            We are conveniently located in Haverhill, Massachusetts. Come visit us or reach out by phone or email.
          </p>
        </div>
      </section>

      {/* Map + Info */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-2xl text-foreground mb-8">Get in Touch</h2>
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
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

              {/* Directions */}
              <div className="pt-4">
                <h3 className="font-display text-lg text-foreground mb-4">Getting Here</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p className="font-body text-sm text-muted-foreground">Free parking is available in the lot adjacent to our building on Washington Street.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bus className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p className="font-body text-sm text-muted-foreground">We are accessible via MVRTA bus routes. The nearest stop is on Merrimack Street.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[500px]">
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
                      <strong>Holy Trinity Care</strong><br />
                      109 Washington St<br />
                      Haverhill, MA 01832<br />
                      (781) 989-8159
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <a
                href="https://www.google.com/maps/search/109+Washington+St,+Haverhill,+MA+01832"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-body text-accent hover:underline"
              >
                <MapPin className="w-4 h-4" /> Get Directions on Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}