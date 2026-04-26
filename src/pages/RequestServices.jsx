import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntakeTermsGate from '../components/intake/IntakeTermsGate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { CheckCircle, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const REASONS = [
  'Addiction & Substance Use',
  'Drug & Alcohol Education',
  'Support & Stabilization Services (S&S)',
  'In Home Therapy (IHT)',
  'Structured Outpatient Addiction Program (SOAP)',
  'Medication Management',
  'Medication-Assisted Treatment (MAT)',
  'Outpatient Service',
  'Mental or Substance Eval (MSE)',
  'Therapeutic Mentor (TM)',
  'Residential Recovery Home',
];

const LANGUAGES = ['English', 'Spanish', 'Portuguese', 'French', 'Haitian Creole', 'Other'];
const INSURANCE = [
  'Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna', 'Humana',
  'Medicaid', 'Medicare', 'Tufts Health Plan', 'Harvard Pilgrim', 'Self-Pay', 'Other',
];
const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const initialForm = {
  is_patient: true,
  reasons_for_visit: [],
  first_name: '', last_name: '', date_of_birth: '', birth_sex: '',
  street_address: '', apt: '', zip_code: '', city: '', state: '',
  phone: '', email: '', preferred_language: 'English',
  referring_provider: '', primary_care_physician: '',
  insurance_provider: '', member_id: '', additional_insurance: '',
  how_did_you_hear: '', additional_details: '',
  thoughts_of_suicide: 'No', thoughts_of_harming_others: 'No',
  terms_accepted: true,
};

function FieldRow({ label, required, children }) {
  return (
    <div className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 items-start py-3 border-b border-border last:border-0">
      <Label className="font-body text-sm text-foreground pt-2.5 text-right hidden sm:block">
        {label}{required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Label className="font-body text-sm text-foreground sm:hidden">
        {label}{required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div>{children}</div>
    </div>
  );
}

export default function RequestServices() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleReason = (reason) => {
    setForm(prev => {
      const reasons = prev.reasons_for_visit.includes(reason)
        ? prev.reasons_for_visit.filter(r => r !== reason)
        : [...prev.reasons_for_visit, reason];
      return { ...prev, reasons_for_visit: reasons };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ServiceRequest.create(form);
    toast.success('Your request has been submitted successfully!');
    setSubmitted(true);
    setSending(false);
  };

  const canProceedStep1 = form.reasons_for_visit.length > 0 && form.first_name && form.last_name;
  const canSubmit = form.first_name && form.last_name && form.email && form.phone;

  if (submitted) {
    return (
      <section className="py-32 text-center">
        <div className="max-w-lg mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-4">Request Submitted</h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you. Our team will review your request and contact you within 24 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); }}
            variant="outline" className="rounded-full px-8 min-h-[48px] font-body">
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        <h1 className="font-display text-3xl text-center text-primary mb-8">Secure Intake Form</h1>

        {!termsAccepted ? (
          <IntakeTermsGate onAccept={() => setTermsAccepted(true)} />
        ) : (
          <>
            {/* Step Header Bar */}
            <div className="rounded-lg overflow-hidden mb-1">
              <div className="bg-primary flex items-center px-6 py-3 gap-8">
                <div className={`flex items-center gap-2 text-sm font-body font-semibold ${step === 1 ? 'text-primary-foreground' : 'text-primary-foreground/60'}`}>
                  <span className="w-6 h-6 rounded-full border-2 border-primary-foreground/60 flex items-center justify-center text-xs font-bold">1</span>
                  <User className="w-4 h-4" /> Patient Details
                </div>
                <div className={`flex items-center gap-2 text-sm font-body font-semibold ${step === 2 ? 'text-primary-foreground' : 'text-primary-foreground/60'}`}>
                  <span className="w-6 h-6 rounded-full border-2 border-primary-foreground/60 flex items-center justify-center">
                    {step === 2 ? <Check className="w-3 h-3" /> : '✓'}
                  </span>
                  Complete
                </div>
              </div>
              <div className="bg-muted/80 text-center py-2 text-sm font-body text-muted-foreground border border-border border-t-0">
                If this is an emergency, please call 911.
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1 */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border rounded-b-xl p-6 lg:p-10">

                  {/* Patient Toggle */}
                  <div className="flex gap-3 mb-8">
                    <button
                      onClick={() => set('is_patient', true)}
                      className={`px-5 py-2.5 rounded-md text-sm font-body font-semibold border transition-all ${form.is_patient ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:border-primary/50'}`}
                    >
                      I am the Patient
                    </button>
                    <button
                      onClick={() => set('is_patient', false)}
                      className={`px-5 py-2.5 rounded-md text-sm font-body font-semibold border transition-all ${!form.is_patient ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:border-primary/50'}`}
                    >
                      I am NOT the Patient
                    </button>
                  </div>

                  {/* Reason for Visit */}
                  <FieldRow label="Reason for Visit" required>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2.5">
                      {REASONS.map(reason => (
                        <label key={reason} className="flex items-start gap-2 cursor-pointer group">
                          <Checkbox
                            checked={form.reasons_for_visit.includes(reason)}
                            onCheckedChange={() => toggleReason(reason)}
                            className="mt-0.5 shrink-0"
                          />
                          <span className="font-body text-sm text-foreground group-hover:text-accent transition-colors">{reason}</span>
                        </label>
                      ))}
                    </div>
                    <p className="font-body text-xs text-muted-foreground italic mt-3">Reasons for Visit may change based on the provider selected.</p>
                  </FieldRow>

                  {/* Patient Name */}
                  <FieldRow label="Patient Name" required>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="First" value={form.first_name} onChange={e => set('first_name', e.target.value)} required className="min-h-[44px]" />
                      <Input placeholder="Last" value={form.last_name} onChange={e => set('last_name', e.target.value)} required className="min-h-[44px]" />
                    </div>
                  </FieldRow>

                  {/* Birthday */}
                  <FieldRow label="Birthday" required>
                    <Input type="date" value={form.date_of_birth} onChange={e => set('date_of_birth', e.target.value)} className="min-h-[44px] max-w-xs" />
                  </FieldRow>

                  {/* Birth Sex */}
                  <FieldRow label="Birth Sex" required>
                    <Select value={form.birth_sex} onValueChange={v => set('birth_sex', v)}>
                      <SelectTrigger className="min-h-[44px] max-w-xs"><SelectValue placeholder="Birth Sex" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRow>

                  {/* Address */}
                  <FieldRow label="Address" required>
                    <div className="space-y-2">
                      <Input placeholder="123 Main St." value={form.street_address} onChange={e => set('street_address', e.target.value)} className="min-h-[44px]" />
                      <Input placeholder="Apt #" value={form.apt} onChange={e => set('apt', e.target.value)} className="min-h-[44px]" />
                      <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="ZIP" value={form.zip_code} onChange={e => set('zip_code', e.target.value)} className="min-h-[44px]" />
                        <Input placeholder="CITY" value={form.city} onChange={e => set('city', e.target.value)} className="min-h-[44px]" />
                        <Select value={form.state} onValueChange={v => set('state', v)}>
                          <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="St" /></SelectTrigger>
                          <SelectContent>
                            {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FieldRow>

                  {/* Phone */}
                  <FieldRow label="Phone" required>
                    <Input placeholder="000-000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} required className="min-h-[44px] max-w-xs" />
                  </FieldRow>

                  {/* Email */}
                  <FieldRow label="Email" required>
                    <Input type="email" placeholder="test@gmail.com" value={form.email} onChange={e => set('email', e.target.value)} required className="min-h-[44px] max-w-sm" />
                  </FieldRow>

                  {/* Preferred Language */}
                  <FieldRow label="Preferred Language">
                    <Select value={form.preferred_language} onValueChange={v => set('preferred_language', v)}>
                      <SelectTrigger className="min-h-[44px] max-w-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldRow>

                  {/* Referring Provider */}
                  <FieldRow label="Referring Provider/Entity">
                    <Input value={form.referring_provider} onChange={e => set('referring_provider', e.target.value)} className="min-h-[44px]" />
                  </FieldRow>

                  {/* Primary Care Provider */}
                  <FieldRow label="Primary Care Provider Name">
                    <Input value={form.primary_care_physician} onChange={e => set('primary_care_physician', e.target.value)} className="min-h-[44px]" />
                  </FieldRow>

                  {/* Primary Insurance */}
                  <FieldRow label="Primary Insurance" required>
                    <Select value={form.insurance_provider} onValueChange={v => set('insurance_provider', v)}>
                      <SelectTrigger className="min-h-[44px] max-w-sm"><SelectValue placeholder="Primary Insurance" /></SelectTrigger>
                      <SelectContent>
                        {INSURANCE.map(ins => <SelectItem key={ins} value={ins}>{ins}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldRow>

                  {/* Insurance ID */}
                  <FieldRow label="Insurance ID">
                    <Input placeholder="Insurance ID" value={form.member_id} onChange={e => set('member_id', e.target.value)} className="min-h-[44px]" />
                  </FieldRow>

                  {/* Additional Insurance */}
                  <FieldRow label="Additional Insurance (Secondary)">
                    <Input value={form.additional_insurance} onChange={e => set('additional_insurance', e.target.value)} className="min-h-[44px]" />
                  </FieldRow>

                  {/* How did you hear */}
                  <FieldRow label="How did you hear about us?">
                    <Input value={form.how_did_you_hear} onChange={e => set('how_did_you_hear', e.target.value)} className="min-h-[44px]" />
                  </FieldRow>

                  {/* Additional Details */}
                  <FieldRow label="Additional Details About Reason for Visit">
                    <Textarea placeholder="Type your comments here" value={form.additional_details} onChange={e => set('additional_details', e.target.value)} rows={5} />
                  </FieldRow>

                  {/* Buttons */}
                  <div className="flex justify-between mt-8 pt-4">
                    <div />
                    <Button onClick={() => setStep(2)} disabled={!canProceedStep1}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold rounded-full px-8 min-h-[48px]">
                      Next <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 - Review & Submit */}
              {step === 2 && (
                <motion.form key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-b-xl p-6 lg:p-10">

                  <h2 className="font-display text-xl text-foreground mb-6">Review & Confirm</h2>

                  {/* Safety Questions */}
                  <FieldRow label="Thoughts of suicide?" required>
                    <Select value={form.thoughts_of_suicide} onValueChange={v => set('thoughts_of_suicide', v)}>
                      <SelectTrigger className="min-h-[44px] max-w-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRow>

                  <FieldRow label="Thoughts of harming others?" required>
                    <Select value={form.thoughts_of_harming_others} onValueChange={v => set('thoughts_of_harming_others', v)}>
                      <SelectTrigger className="min-h-[44px] max-w-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRow>

                  {/* Summary */}
                  <div className="bg-muted/50 rounded-xl p-5 border border-border mt-4 mb-6 space-y-2">
                    <h3 className="font-display text-base text-foreground mb-3">Summary</h3>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm font-body">
                      <div><span className="text-muted-foreground">Name: </span><span className="font-semibold">{form.first_name} {form.last_name}</span></div>
                      <div><span className="text-muted-foreground">Phone: </span><span className="font-semibold">{form.phone}</span></div>
                      <div><span className="text-muted-foreground">Email: </span><span className="font-semibold">{form.email}</span></div>
                      <div><span className="text-muted-foreground">Insurance: </span><span className="font-semibold">{form.insurance_provider || '—'}</span></div>
                      {form.reasons_for_visit.length > 0 && (
                        <div className="sm:col-span-2"><span className="text-muted-foreground">Reasons: </span><span className="font-semibold">{form.reasons_for_visit.join(', ')}</span></div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" onClick={() => setStep(1)} variant="outline" className="rounded-full px-8 min-h-[48px] font-body">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button type="submit" disabled={!canSubmit || sending}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold rounded-full px-8 min-h-[48px]">
                      {sending ? 'Submitting...' : 'Submit Form'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}