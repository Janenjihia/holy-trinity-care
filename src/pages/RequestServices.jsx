import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IntakeTermsGate from '../components/intake/IntakeTermsGate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';

export default function RequestServices() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    first_name: '', last_name: '', date_of_birth: '', email: '', phone: '',
    street_address: '', city: '', state: '', zip_code: '',
    insurance_provider: '', member_id: '', primary_care_physician: '',
    emergency_contact_name: '', emergency_contact_phone: '',
    reason_for_visit: '', current_medications: '', medical_history: '',
    psychiatric_history: '', substance_use_history: '',
    thoughts_of_suicide: '', thoughts_of_harming_others: '',
    additional_notes: '', terms_accepted: true,
  });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSelect = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ServiceRequest.create(form);
    toast.success('Your request has been submitted successfully!');
    setSubmitted(true);
    setSending(false);
  };

  const canSubmit = form.first_name && form.last_name && form.email && form.phone
    && form.reason_for_visit && form.thoughts_of_suicide && form.thoughts_of_harming_others;

  if (submitted) {
    return (
      <section className="py-32 text-center">
        <div className="max-w-lg mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-4">Request Submitted</h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you for your request. Our team will review it and get back to you within 24 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); setForm({ first_name: '', last_name: '', date_of_birth: '', email: '', phone: '', street_address: '', city: '', state: '', zip_code: '', insurance_provider: '', member_id: '', primary_care_physician: '', emergency_contact_name: '', emergency_contact_phone: '', reason_for_visit: '', current_medications: '', medical_history: '', psychiatric_history: '', substance_use_history: '', thoughts_of_suicide: '', thoughts_of_harming_others: '', additional_notes: '', terms_accepted: true }); }}
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
          <h1 className="font-display text-4xl lg:text-5xl text-foreground mb-4">Request Our Services</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Take the first step toward healing. Fill out the comprehensive intake form below and our team will contact you within 24 hours.
          </p>
        </motion.div>

        {!termsAccepted && (
          <IntakeTermsGate onAccept={() => setTermsAccepted(true)} />
        )}

        {termsAccepted && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Personal Information */}
              <div>
                <h2 className="font-display text-xl text-foreground mb-6 pb-2 border-b border-border">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm">First Name *</Label>
                      <Input name="first_name" value={form.first_name} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                    </div>
                    <div>
                      <Label className="font-body text-sm">Last Name *</Label>
                      <Input name="last_name" value={form.last_name} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm">Date of Birth *</Label>
                      <Input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                    </div>
                    <div>
                      <Label className="font-body text-sm">Email *</Label>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                    </div>
                  </div>
                  <div className="sm:w-1/2">
                    <Label className="font-body text-sm">Phone *</Label>
                    <Input name="phone" value={form.phone} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h2 className="font-display text-xl text-foreground mb-6 pb-2 border-b border-border">Address Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="font-body text-sm">Street Address</Label>
                    <Input name="street_address" value={form.street_address} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm">City</Label>
                      <Input name="city" value={form.city} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                    </div>
                    <div>
                      <Label className="font-body text-sm">State</Label>
                      <Input name="state" value={form.state} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                    </div>
                  </div>
                  <div className="sm:w-1/2">
                    <Label className="font-body text-sm">Zip Code</Label>
                    <Input name="zip_code" value={form.zip_code} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div>
                <h2 className="font-display text-xl text-foreground mb-6 pb-2 border-b border-border">Insurance Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm">Insurance Provider</Label>
                      <Input name="insurance_provider" value={form.insurance_provider} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                    </div>
                    <div>
                      <Label className="font-body text-sm">Member ID</Label>
                      <Input name="member_id" value={form.member_id} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-body text-sm">Primary Care Physician</Label>
                    <Input name="primary_care_physician" value={form.primary_care_physician} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h2 className="font-display text-xl text-foreground mb-6 pb-2 border-b border-border">Emergency Contact</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-body text-sm">Contact Name</Label>
                    <Input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Contact Phone</Label>
                    <Input name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={handleChange} className="mt-1.5 min-h-[48px]" />
                  </div>
                </div>
              </div>

              {/* Clinical Information */}
              <div>
                <h2 className="font-display text-xl text-foreground mb-6 pb-2 border-b border-border">Clinical Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="font-body text-sm">Reason for Visit *</Label>
                    <Textarea name="reason_for_visit" value={form.reason_for_visit} onChange={handleChange} required rows={3}
                      placeholder="Please describe the primary reason you are seeking services..." className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Current Medications</Label>
                    <Textarea name="current_medications" value={form.current_medications} onChange={handleChange} rows={3}
                      placeholder="List any current medications and dosages..." className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Medical History</Label>
                    <Textarea name="medical_history" value={form.medical_history} onChange={handleChange} rows={3}
                      placeholder="Any significant medical conditions or surgeries..." className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Psychiatric History</Label>
                    <Textarea name="psychiatric_history" value={form.psychiatric_history} onChange={handleChange} rows={3}
                      placeholder="Previous mental health diagnoses or treatments..." className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Substance Use History</Label>
                    <Textarea name="substance_use_history" value={form.substance_use_history} onChange={handleChange} rows={3}
                      placeholder="Any history of substance use or addiction..." className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Are you currently having thoughts of suicide? *</Label>
                    <Select value={form.thoughts_of_suicide} onValueChange={(v) => handleSelect('thoughts_of_suicide', v)}>
                      <SelectTrigger className="mt-1.5 min-h-[48px]"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-body text-sm">Are you currently having thoughts of harming others? *</Label>
                    <Select value={form.thoughts_of_harming_others} onValueChange={(v) => handleSelect('thoughts_of_harming_others', v)}>
                      <SelectTrigger className="mt-1.5 min-h-[48px]"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-body text-sm">Additional Notes</Label>
                    <Textarea name="additional_notes" value={form.additional_notes} onChange={handleChange} rows={3}
                      placeholder="Any other information you'd like us to know..." className="mt-1.5" />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={!canSubmit || sending}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full min-h-[52px] text-base">
                {sending ? 'Submitting...' : <><Send className="mr-2 w-4 h-4" /> Submit Request</>}
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}