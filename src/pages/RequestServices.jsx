import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IntakeTermsGate from '../components/intake/IntakeTermsGate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Send, FileText, CheckCircle } from 'lucide-react';

const bhServices = ['Outpatient Services', 'In-Home Therapy', 'Family Support', 'Child & Adolescent Services'];
const addictionServices = ['Medication-Assisted Treatment', 'Counseling Services', 'Recovery Support', 'Evidence-Based Care'];

export default function RequestServices() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', address: '',
    service_type: '', specific_services: [],
    preferred_schedule: '', insurance_provider: '', additional_info: '', terms_accepted: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const toggleService = (service) => {
    setForm(prev => ({
      ...prev,
      specific_services: prev.specific_services.includes(service)
        ? prev.specific_services.filter(s => s !== service)
        : [...prev.specific_services, service],
    }));
  };

  const availableServices = form.service_type === 'behavioral_health' ? bhServices
    : form.service_type === 'addiction_substance' ? addictionServices : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms_accepted) {
      toast.error('Please accept the terms and conditions.');
      return;
    }
    setSending(true);
    await base44.entities.ServiceRequest.create(form);
    toast.success('Service request submitted successfully!');
    setSubmitted(true);
    setSending(false);
  };

  if (submitted) {
    return (
      <section className="py-32 text-center">
        <div className="max-w-lg mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-4">Request Submitted</h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you for your request. Our team will review it and get back to you within 1-2 business days.
          </p>
          <Button onClick={() => { setSubmitted(false); setForm({ full_name: '', email: '', phone: '', address: '', service_type: '', specific_services: [], preferred_schedule: '', insurance_provider: '', additional_info: '', terms_accepted: false }); }}
            variant="outline" className="rounded-full px-8 min-h-[48px] font-body">
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4">Get Started</p>
          <h1 className="font-display text-4xl lg:text-5xl text-foreground mb-4">Request Services</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Tell us about your needs and we'll match you with the right care program.
          </p>
        </motion.div>

        {!termsAccepted && (
          <IntakeTermsGate onAccept={() => setTermsAccepted(true)} />
        )}

        {termsAccepted && (

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-sm">Full Name *</Label>
                <Input name="full_name" value={form.full_name} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
              </div>
              <div>
                <Label className="font-body text-sm">Email *</Label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-sm">Phone *</Label>
                <Input name="phone" value={form.phone} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
              </div>
              <div>
                <Label className="font-body text-sm">Address</Label>
                <Input name="address" value={form.address} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
              </div>
            </div>

            <div>
              <Label className="font-body text-sm">Service Type *</Label>
              <Select value={form.service_type} onValueChange={(v) => setForm(prev => ({ ...prev, service_type: v, specific_services: [] }))}>
                <SelectTrigger className="mt-1.5 min-h-[48px]">
                  <SelectValue placeholder="Select a service category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="behavioral_health">Behavioral Health</SelectItem>
                  <SelectItem value="addiction_substance">Addiction & Substance Program</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {availableServices.length > 0 && (
              <div>
                <Label className="font-body text-sm mb-3 block">Specific Services</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {availableServices.map(service => (
                    <label key={service} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors min-h-[48px]">
                      <Checkbox
                        checked={form.specific_services.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <span className="font-body text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-sm">Preferred Schedule</Label>
                <Input name="preferred_schedule" value={form.preferred_schedule} onChange={handleChange} placeholder="e.g. Mornings, Weekdays" className="mt-1.5 min-h-[48px]" />
              </div>
              <div>
                <Label className="font-body text-sm">Insurance Provider</Label>
                <Input name="insurance_provider" value={form.insurance_provider} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
              </div>
            </div>

            <div>
              <Label className="font-body text-sm">Additional Information</Label>
              <Textarea name="additional_info" value={form.additional_info} onChange={handleChange} rows={4} className="mt-1.5" />
            </div>

            <Button type="submit" disabled={sending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full min-h-[52px] text-base">
              {sending ? 'Submitting...' : <>Submit Request <Send className="ml-2 w-4 h-4" /></>}
            </Button>
          </form>
        </motion.div>
        )}
      </div>
    </section>
  );
}