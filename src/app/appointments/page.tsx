'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Calendar as CalendarIcon, Clock, User, ChevronRight, CheckCircle2, Star, MapPin } from 'lucide-react';

const practitioners = [
  { 
    id: '1', 
    name: 'Dr. Sarah Chen', 
    role: 'Rheumatologist', 
    rating: 4.9, 
    specialty: 'Autoimmune Disorders',
    image: 'SC',
    availability: 'Next available: Tomorrow, 10:00 AM'
  },
  { 
    id: '2', 
    name: 'Michael Ross', 
    role: 'Lifestyle Coach', 
    rating: 4.8, 
    specialty: 'Nutrition & Stress Management',
    image: 'MR',
    availability: 'Next available: Wed, 2:00 PM'
  },
  { 
    id: '3', 
    name: 'Dr. Anita Gupta', 
    role: 'Immunologist', 
    rating: 5.0, 
    specialty: 'Systemic Inflammation',
    image: 'AG',
    availability: 'Next available: Fri, 9:00 AM'
  },
];

export default function AppointmentsPage() {
  const [step, setStep] = useState<'browse' | 'success'>('browse');
  const [selectedPractitioner, setSelectedPractitioner] = useState<string | null>(null);

  const handleBook = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Appointment Requested!</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Your request for a consultation has been sent. You will receive a confirmation once the practitioner approves the slot.
          </p>
          <div className="mt-10 flex space-x-4">
            <button 
              onClick={() => setStep('browse')}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Back to Appointments
            </button>
            <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all">
              Add to Calendar
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Book Care Access</h2>
        <p className="text-gray-500 mt-1">Connect with specialists and coaches who understand your unique journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Practitioner Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <User size={18} className="mr-2 text-indigo-600" /> Available Practitioners
          </h3>
          {practitioners.map((p) => (
            <div 
              key={p.id}
              onClick={() => setSelectedPractitioner(p.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
                selectedPractitioner === p.id 
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {p.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-lg">{p.name}</h4>
                    <div className="flex items-center text-amber-500 text-sm font-bold">
                      <Star size={14} className="mr-1 fill-amber-500" /> {p.rating}
                    </div>
                  </div>
                  <p className="text-indigo-600 font-semibold text-sm">{p.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{p.specialty}</p>
                  <div className="mt-4 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded">
                    <Clock size={12} className="mr-1" /> {p.availability}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-8">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center">
              <CalendarIcon size={18} className="mr-2 text-indigo-600" /> Confirm Booking
            </h3>
            
            {selectedPractitioner ? (
              <>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Service</span>
                    <span className="font-semibold text-gray-900">Initial Consultation</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-gray-900">45 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Mode</span>
                    <span className="font-semibold text-gray-900">Virtual Session</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preferred Slot</p>
                  <div className="flex items-center text-gray-900 font-semibold">
                    <CalendarIcon size={16} className="mr-2 text-indigo-500" />
                    <span>May 28, 2024</span>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold mt-1">
                    <Clock size={16} className="mr-2 text-indigo-500" />
                    <span>10:30 AM - 11:15 AM</span>
                  </div>
                </div>

                <button 
                  onClick={handleBook}
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center group"
                >
                  Book Appointment
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-400 text-sm">Select a practitioner to see available slots and book your session.</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-xs font-bold text-indigo-900/60 uppercase tracking-wider mb-2">Note</p>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Appointments can be rescheduled or cancelled up to 24 hours before the session.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
