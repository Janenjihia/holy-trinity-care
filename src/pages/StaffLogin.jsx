import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, LogIn } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function StaffLogin() {
  const handleLogin = () => {
    base44.auth.redirectToLogin('/staff-dashboard');
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24 relative overflow-hidden">
      {/* Dark mode bg for staff portal */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-md w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl lg:text-4xl text-primary-foreground mb-4">Staff Portal</h1>
          <p className="font-body text-primary-foreground/60 mb-10 text-sm">
            Secure access for Holy Trinity Care staff members. Log in to manage appointments, service requests, and client communications.
          </p>
          <Button
            onClick={handleLogin}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-10 min-h-[52px] text-base w-full"
          >
            <LogIn className="mr-2 w-5 h-5" />
            Sign In
          </Button>
          <p className="font-body text-primary-foreground/40 text-xs mt-6">
            Protected by HIPAA-compliant security protocols.
          </p>
        </motion.div>
      </div>
    </section>
  );
}