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
              <img
                src="https://media.base44.com/images/public/69ed9e88109de49093b449ea/f031319c4_Screenshot2026-04-25at25418PM.png"
                alt="Holy Trinity Care Logo"
                className="w-10 h-10 object-contain shrink-0 brightness-0 invert"
              />
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

        {/* Google Review CTA */}
        <div className="border-t border-primary-foreground/10 mt-16 pt-10 flex flex-col items-center gap-4 mb-6">
          <p className="text-sm font-body text-primary-foreground/70">Satisfied with our care? Share your experience!</p>
          <a
            href="https://www.google.com/search?client=safari&hs=biR&sca_esv=292821a49894646c&biw=430&bih=729&sxsrf=ANbL-n4zWcPl7pu8USfvlnxUa3m-a5rvzA:1777208437305&kgmid=/g/11z5d9ddhb&q=Holy+Trinity+Care,+LLC&shem=rimspwouoe&shndl=30&source=sh/x/loc/tile/m1/3&kgs=9082ea5a6dd8a416&utm_source=rimspwouoe,sh/x/loc/tile/m1/3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-800 font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Leave Us a Google Review
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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