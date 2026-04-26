import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';

export default function IntakeTermsGate({ onAccept }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Emergency Banner */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-xl px-6 py-4 mb-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
        <p className="font-body text-sm font-semibold text-destructive">
          If this is an emergency, please call 911.
        </p>
      </div>

      {/* Welcome Notice */}
      <div className="bg-muted border border-border rounded-xl px-6 py-4 mb-8 text-center">
        <p className="font-body text-sm text-foreground">
          Welcome to Online Patient Intake! Please agree to our Terms and Conditions before continuing.
        </p>
      </div>

      {/* Terms Box */}
      <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 mb-6">
        <h2 className="font-display text-xl text-foreground mb-4">Term and Condition of Use</h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          If you think you may have an emergency situation call 9-1-1. Do not use this Patient Portal for emergencies.
          By continuing, you acknowledge that this intake form is for non-emergency healthcare service requests only.
          All personal and health information submitted through this form will be kept strictly confidential in
          accordance with HIPAA regulations. Submission of this form does not guarantee immediate service placement.
          Our team will review your request and contact you to discuss availability and next steps.
        </p>

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(!!checked)}
            className="mt-0.5"
          />
          <span className="font-body text-sm font-semibold text-foreground">
            I have read and understood the information above.
          </span>
        </label>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onAccept}
          disabled={!agreed}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-12 min-h-[52px] text-base"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}