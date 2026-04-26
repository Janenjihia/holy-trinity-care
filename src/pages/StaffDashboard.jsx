import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, FileText, MessageSquare, Users, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  new: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_review: 'bg-blue-100 text-blue-800 border-blue-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function StaffDashboard() {
  const { data: appointments = [], refetch: refetchAppts } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => base44.entities.Appointment.list('-created_date', 50),
  });

  const { data: requests = [], refetch: refetchReqs } = useQuery({
    queryKey: ['service-requests'],
    queryFn: () => base44.entities.ServiceRequest.list('-created_date', 50),
  });

  const { data: messages = [], refetch: refetchMsgs } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: () => base44.entities.ContactMessage.list('-created_date', 50),
  });

  const updateApptStatus = async (id, status) => {
    await base44.entities.Appointment.update(id, { status });
    refetchAppts();
    toast.success(`Appointment marked as ${status}`);
  };

  const updateReqStatus = async (id, status) => {
    await base44.entities.ServiceRequest.update(id, { status });
    refetchReqs();
    toast.success(`Request marked as ${status}`);
  };

  const markRead = async (id) => {
    await base44.entities.ContactMessage.update(id, { read: true });
    refetchMsgs();
  };

  const stats = [
    { icon: Calendar, label: 'Appointments', value: appointments.length, color: 'text-blue-600' },
    { icon: FileText, label: 'Service Requests', value: requests.length, color: 'text-emerald-600' },
    { icon: MessageSquare, label: 'Messages', value: messages.filter(m => !m.read).length, color: 'text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="border-b border-primary-foreground/10 px-6 lg:px-12 py-4">
        <div className="max-w-[120rem] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-display text-sm">H</span>
            </div>
            <span className="font-display text-lg text-primary-foreground">Staff Dashboard</span>
          </div>
          <Button variant="ghost" onClick={() => base44.auth.logout('/')} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 font-body text-sm min-h-[48px]">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-primary-foreground/5 rounded-xl p-6 border border-primary-foreground/10">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="font-body text-sm text-primary-foreground/60">{s.label}</span>
              </div>
              <p className="font-display text-3xl text-primary-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="bg-primary-foreground/5 border border-primary-foreground/10 mb-6">
            <TabsTrigger value="appointments" className="font-body data-[state=active]:bg-accent data-[state=active]:text-accent-foreground min-h-[48px]">Appointments</TabsTrigger>
            <TabsTrigger value="requests" className="font-body data-[state=active]:bg-accent data-[state=active]:text-accent-foreground min-h-[48px]">Requests</TabsTrigger>
            <TabsTrigger value="messages" className="font-body data-[state=active]:bg-accent data-[state=active]:text-accent-foreground min-h-[48px]">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="space-y-3">
              {appointments.length === 0 && <p className="text-primary-foreground/50 font-body text-sm py-8 text-center">No appointments yet.</p>}
              {appointments.map(appt => (
                <div key={appt.id} className="bg-primary-foreground/5 rounded-xl p-5 border border-primary-foreground/10 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-body font-semibold text-primary-foreground">{appt.full_name}</p>
                    <p className="font-body text-xs text-primary-foreground/50">{appt.email} · {appt.phone}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground/70 font-body text-xs">
                        <Calendar className="w-3 h-3 mr-1" /> {appt.date && format(new Date(appt.date + 'T12:00:00'), 'MMM d, yyyy')} at {appt.time_slot}
                      </Badge>
                      <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground/70 font-body text-xs">
                        {appt.service_type?.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                  <Select value={appt.status || 'pending'} onValueChange={(v) => updateApptStatus(appt.id, v)}>
                    <SelectTrigger className="w-36 min-h-[48px] bg-transparent border-primary-foreground/20 text-primary-foreground font-body text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-3">
              {requests.length === 0 && <p className="text-primary-foreground/50 font-body text-sm py-8 text-center">No service requests yet.</p>}
              {requests.map(req => (
                <div key={req.id} className="bg-primary-foreground/5 rounded-xl p-5 border border-primary-foreground/10 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-body font-semibold text-primary-foreground">{req.full_name}</p>
                    <p className="font-body text-xs text-primary-foreground/50">{req.email} · {req.phone}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground/70 font-body text-xs">
                        {req.service_type?.replace(/_/g, ' ')}
                      </Badge>
                      {req.specific_services?.map(s => (
                        <Badge key={s} variant="outline" className="border-accent/30 text-accent font-body text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <Select value={req.status || 'new'} onValueChange={(v) => updateReqStatus(req.id, v)}>
                    <SelectTrigger className="w-36 min-h-[48px] bg-transparent border-primary-foreground/20 text-primary-foreground font-body text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_review">In Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-3">
              {messages.length === 0 && <p className="text-primary-foreground/50 font-body text-sm py-8 text-center">No messages yet.</p>}
              {messages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => !msg.read && markRead(msg.id)}
                  className={`bg-primary-foreground/5 rounded-xl p-5 border transition-colors cursor-pointer ${
                    msg.read ? 'border-primary-foreground/10' : 'border-accent/30 bg-accent/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-body font-semibold text-primary-foreground">{msg.name}</p>
                      <p className="font-body text-xs text-primary-foreground/50">{msg.email} {msg.phone && `· ${msg.phone}`}</p>
                    </div>
                    {!msg.read && <Badge className="bg-accent text-accent-foreground font-body text-xs">New</Badge>}
                  </div>
                  {msg.subject && <p className="font-body text-sm text-primary-foreground/80 font-semibold mb-1">{msg.subject}</p>}
                  <p className="font-body text-sm text-primary-foreground/60">{msg.message}</p>
                  <p className="font-body text-xs text-primary-foreground/30 mt-2">{msg.created_date && format(new Date(msg.created_date), 'MMM d, yyyy h:mm a')}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}