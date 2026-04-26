import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { 
    label: 'Services', path: '/services',
    children: [
      { label: 'Behavioral Health', path: '/services/behavioral-health' },
      { label: 'Addiction & Substance Program', path: '/services/addiction-substance' },
    ]
  },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="https://media.base44.com/images/public/69ed9e88109de49093b449ea/f031319c4_Screenshot2026-04-25at25418PM.png"
              alt="Holy Trinity Care Logo"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl text-primary leading-tight">Holy Trinity Care</span>
              <span className="text-xs text-muted-foreground font-body hidden sm:block">Behavioral Health Clinic</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors min-h-[48px] ${
                      location.pathname.startsWith('/services') ? 'text-accent' : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[240px]"
                      >
                        {link.children.map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-3 text-sm font-body hover:bg-muted transition-colors min-h-[48px] flex items-center"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors min-h-[48px] flex items-center ${
                    location.pathname === link.path ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/request-services">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-6 min-h-[48px]">
                Request Service
              </Button>
            </Link>
            <Link
              to="/staff-login"
              className="text-sm font-body font-medium text-foreground hover:text-accent transition-colors min-h-[48px] flex items-center px-2"
            >
              Staff Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-card border-t border-border"
            >
              <div className="py-4 space-y-1">
                {navLinks.map(link => (
                  <React.Fragment key={link.label}>
                    <Link
                      to={link.path}
                      className="block px-4 py-3 text-base font-body font-medium hover:bg-muted rounded-lg transition-colors min-h-[48px]"
                    >
                      {link.label}
                    </Link>
                    {link.children?.map(child => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-8 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors min-h-[48px]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
                <div className="px-4 pt-4 space-y-3">
                  <Link to="/request-services" className="block">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full min-h-[48px]">
                      Request Service
                    </Button>
                  </Link>
                  <Link to="/staff-login" className="block px-2 py-3 text-sm font-body font-medium text-foreground hover:text-accent min-h-[48px] flex items-center">
                    Staff Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}