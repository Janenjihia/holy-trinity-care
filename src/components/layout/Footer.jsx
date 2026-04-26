import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

const serviceLinks = [
  { label: 'Behavioral Health', path: '/services/behavioral-health' },
  { label: 'Addiction & Substance Program', path: '/services/addiction-substance' },
  { label: 'Outpatient Services', path: '/services/behavioral-health' },
  { label: 'In-Home Therapy', path: '/services/behavioral-health' },
  { label: 'Counseling Services', path: '/services/addiction-substance' },
  { label: 'Recovery Support', path: '/services/addiction-substance' },
];

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Services', path: '/services' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Request Service', path: '/request-services' },
  { label: 'Book Appointment', path: '/book-appointment' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Our Location', path: '/location' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display text-lg">H</span>
              </div>
              <span className="font-display text-xl">Holy Trinity Care</span>
            </div>
            <p className="text-primary-foreground/70 text-sm font-body leading-relaxed mb-6 readable-width">
              Compassionate care for individuals and families. Supporting mental wellness. Encouraging lasting change.
            </p>
            <p className="text-primary-foreground/50 text-xs italic font-display">
              A Place to Heal, A Promise to Care
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-body text-primary-foreground/70 hover:text-accent transition-colors min-h-[48px] inline-flex items-center">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-body text-primary-foreground/70 hover:text-accent transition-colors min-h-[48px] inline-flex items-center">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-1 shrink-0" />
                <a href="tel:7819898159" className="text-sm font-body text-primary-foreground/70 hover:text-accent transition-colors">
                  (781) 989-8159
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-1 shrink-0" />
                <a href="mailto:info@holytrinitycare.com" className="text-sm font-body text-primary-foreground/70 hover:text-accent transition-colors">
                  info@holytrinitycare.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-1 shrink-0" />
                <span className="text-sm font-body text-primary-foreground/70">
                  109 Washington St<br />Haverhill, MA 01832
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-1 shrink-0" />
                <span className="text-sm font-body text-primary-foreground/70">
                  Mon – Fri: 9AM – 5PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-primary-foreground/50">
            © {new Date().getFullYear()} Holy Trinity Care. All rights reserved.
          </p>
          <p className="text-xs font-body text-primary-foreground/50 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent" /> for our community
          </p>
        </div>
      </div>
    </footer>
  );
}