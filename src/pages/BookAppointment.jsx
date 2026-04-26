import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay, getDay } from 'date-fns';

const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', date: '', time_slot: '',
    service_type: '', specific_service: '', insurance_provider: '', notes: '',
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const selectDate = (date) => {
    setForm(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
  };

  const isWeekend = (date) => getDay(date) === 0 || getDay(date) === 6;
  const isPast = (date) => isBefore(date, startOfDay(new Date()));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.Appointment.create(form);
    toast.success('Appointment booked successfully!');
    setSubmitted(true);
    setSending(false);
  };

  const canProceedStep1 = form.date && form.time_slot;
  const canProceedStep2 = form.service_type;
  const canSubmit = form.full_name && form.email && form.phone;

  if (submitted) {
    return (
      <section className="py-32 text-center">
        <div className="max-w-lg mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-4">Appointment Booked</h1>
          <p className="font-body text-muted-foreground mb-2">
            Your appointment has been scheduled for:
          </p>
          <p className="font-display text-xl text-foreground mb-1">
            {form.date && format(new Date(form.date + 'T12:00:00'), 'EEEE, MMMM d, yyyy')}
          </p>
          <p className="font-body text-accent font-semibold mb-8">{form.time_slot}</p>
          <p className="font-body text-sm text-muted-foreground mb-8">
            We will send a confirmation to {form.email}. Please arrive 15 minutes before your appointment.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); setForm({ full_name: '', email: '', phone: '', date: '', time_slot: '', service_type: '', specific_service: '', insurance_provider: '', notes: '' }); }}
            variant="outline" className="rounded-full px-8 min-h-[48px] font-body">
            Book Another Appointment
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent font-body font-semibold text-sm tracking-widest uppercase mb-4">Book Now</p>
          <h1 className="font-display text-4xl lg:text-5xl text-foreground mb-4">Schedule Your Appointment</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Select your preferred date, time, and service to get started.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-semibold transition-colors ${
                s <= step ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-accent' : 'bg-border'}`} />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-card rounded-2xl border border-border p-8 lg:p-12"
            >
              <h2 className="font-display text-2xl text-foreground mb-2">Select Date & Time</h2>
              <p className="font-body text-sm text-muted-foreground mb-8">Choose a date and time that works for you.</p>

              {/* Calendar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-muted rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center" aria-label="Previous month">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-display text-lg text-foreground">{format(currentMonth, 'MMMM yyyy')}</h3>
                  <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-muted rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center" aria-label="Next month">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="font-body text-xs text-muted-foreground py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
                  {days.map(day => {
                    const disabled = isPast(day) || isWeekend(day);
                    const selected = form.date === format(day, 'yyyy-MM-dd');
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => !disabled && selectDate(day)}
                        disabled={disabled}
                        className={`min-h-[48px] min-w-[48px] rounded-xl font-body text-sm transition-all flex items-center justify-center ${
                          selected ? 'bg-accent text-accent-foreground font-semibold shadow-md' :
                          disabled ? 'text-muted-foreground/30 cursor-not-allowed' :
                          isToday(day) ? 'bg-accent/10 text-accent font-semibold hover:bg-accent/20' :
                          'hover:bg-muted text-foreground'
                        }`}
                        aria-label={`Select ${format(day, 'MMMM d, yyyy')}`}
                      >
                        {format(day, 'd')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {form.date && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="font-display text-lg text-foreground mb-4">Available Times</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setForm(prev => ({ ...prev, time_slot: slot }))}
                        className={`min-h-[48px] rounded-xl font-body text-sm transition-all border ${
                          form.time_slot === slot ? 'bg-accent text-accent-foreground border-accent font-semibold' :
                          'border-border hover:border-accent/50 hover:bg-muted'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end mt-8">
                <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[48px]">
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Service */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-card rounded-2xl border border-border p-8 lg:p-12"
            >
              <h2 className="font-display text-2xl text-foreground mb-2">Select Your Service</h2>
              <p className="font-body text-sm text-muted-foreground mb-8">Choose the type of care you're looking for.</p>

              <div className="space-y-6">
                <div>
                  <Label className="font-body text-sm">Service Category *</Label>
                  <Select value={form.service_type} onValueChange={(v) => setForm(prev => ({ ...prev, service_type: v, specific_service: '' }))}>
                    <SelectTrigger className="mt-1.5 min-h-[48px]"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="behavioral_health">Behavioral Health</SelectItem>
                      <SelectItem value="addiction_substance">Addiction & Substance Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.service_type && (
                  <div>
                    <Label className="font-body text-sm">Specific Service</Label>
                    <Select value={form.specific_service} onValueChange={(v) => setForm(prev => ({ ...prev, specific_service: v }))}>
                      <SelectTrigger className="mt-1.5 min-h-[48px]"><SelectValue placeholder="Select service (optional)" /></SelectTrigger>
                      <SelectContent>
                        {form.service_type === 'behavioral_health' ? (
                          <>
                            <SelectItem value="Outpatient Services">Outpatient Services</SelectItem>
                            <SelectItem value="In-Home Therapy">In-Home Therapy</SelectItem>
                            <SelectItem value="Family Support">Family Support</SelectItem>
                            <SelectItem value="Child & Adolescent Services">Child & Adolescent Services</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="Medication-Assisted Treatment">Medication-Assisted Treatment</SelectItem>
                            <SelectItem value="Counseling Services">Counseling Services</SelectItem>
                            <SelectItem value="Recovery Support">Recovery Support</SelectItem>
                            <SelectItem value="Evidence-Based Care">Evidence-Based Care</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="font-body text-sm">Insurance Provider</Label>
                  <Input name="insurance_provider" value={form.insurance_provider} onChange={handleChange} placeholder="e.g. Blue Cross Blue Shield" className="mt-1.5 min-h-[48px]" />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={() => setStep(1)} variant="outline" className="rounded-full px-8 min-h-[48px] font-body">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canProceedStep2} className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[48px]">
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-card rounded-2xl border border-border p-8 lg:p-12"
            >
              <h2 className="font-display text-2xl text-foreground mb-2">Your Information</h2>
              <p className="font-body text-sm text-muted-foreground mb-8">Tell us a bit about yourself so we can prepare for your visit.</p>

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
                <div>
                  <Label className="font-body text-sm">Phone *</Label>
                  <Input name="phone" value={form.phone} onChange={handleChange} required className="mt-1.5 min-h-[48px]" />
                </div>
                <div>
                  <Label className="font-body text-sm">Additional Notes</Label>
                  <Textarea name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="Any specific concerns or information we should know..." className="mt-1.5" />
                </div>

                {/* Summary */}
                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <h3 className="font-display text-lg text-foreground mb-3">Appointment Summary</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm font-body">
                    <div><span className="text-muted-foreground">Date:</span> <span className="font-semibold">{form.date && format(new Date(form.date + 'T12:00:00'), 'MMM d, yyyy')}</span></div>
                    <div><span className="text-muted-foreground">Time:</span> <span className="font-semibold">{form.time_slot}</span></div>
                    <div><span className="text-muted-foreground">Service:</span> <span className="font-semibold">{form.service_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></div>
                    {form.specific_service && <div><span className="text-muted-foreground">Type:</span> <span className="font-semibold">{form.specific_service}</span></div>}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setStep(2)} variant="outline" className="rounded-full px-8 min-h-[48px] font-body">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button type="submit" disabled={!canSubmit || sending} className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[52px]">
                    {sending ? 'Booking...' : <>Confirm Appointment <Calendar className="ml-2 w-4 h-4" /></>}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}