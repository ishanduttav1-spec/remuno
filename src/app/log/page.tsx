'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { AlertCircle, CheckCircle2, Moon, Zap, Activity, Brain, Utensils, Clock } from 'lucide-react';

export default function LogEntryPage() {
  const [activeTab, setActiveTab] = useState<'symptoms' | 'lifestyle'>('symptoms');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [symptoms, setSymptoms] = useState({
    fatigue: 5,
    pain: 3,
    mood: 7,
    flare: false,
    notes: ''
  });

  const [lifestyle, setLifestyle] = useState({
    sleep: 7,
    stress: 4,
    diet: 8,
    activity: 30,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Daily Intelligence Log</h2>
        <p className="text-gray-500 mt-1">Capture your symptoms and lifestyle patterns to build your care history.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('symptoms')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'symptoms' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Symptom Tracking
          </button>
          <button 
            onClick={() => setActiveTab('lifestyle')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'lifestyle' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Exposome (Lifestyle)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {activeTab === 'symptoms' ? (
            <div className="space-y-8">
              <RangeSlider 
                label="Fatigue Level" 
                icon={<Zap size={18} />} 
                value={symptoms.fatigue} 
                onChange={(v) => setSymptoms({...symptoms, fatigue: v})} 
                minLabel="Energetic" 
                maxLabel="Exhausted"
              />
              <RangeSlider 
                label="Pain Level" 
                icon={<Activity size={18} />} 
                value={symptoms.pain} 
                onChange={(v) => setSymptoms({...symptoms, pain: v})} 
                minLabel="None" 
                maxLabel="Severe"
              />
              <RangeSlider 
                label="Mood Score" 
                icon={<Brain size={18} />} 
                value={symptoms.mood} 
                onChange={(v) => setSymptoms({...symptoms, mood: v})} 
                minLabel="Very Low" 
                maxLabel="Excellent"
              />
              
              <div className="flex items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900 flex items-center">
                    <AlertCircle className="mr-2" size={18} />
                    Flare Event?
                  </h4>
                  <p className="text-sm text-orange-700">Check this if you experienced a significant flare today.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={symptoms.flare}
                  onChange={(e) => setSymptoms({...symptoms, flare: e.target.checked})}
                  className="w-6 h-6 rounded text-orange-600 focus:ring-orange-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Observation Notes</label>
                <textarea 
                  value={symptoms.notes}
                  onChange={(e) => setSymptoms({...symptoms, notes: e.target.value})}
                  className="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  placeholder="Any specific symptoms or context..."
                  rows={3}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Moon className="mr-2 text-indigo-500" size={18} /> Sleep Duration
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={lifestyle.sleep}
                      onChange={(e) => setLifestyle({...lifestyle, sleep: Number(e.target.value)})}
                      className="w-full rounded-xl border-gray-200 py-3 pl-4 pr-12 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Hours"
                    />
                    <span className="absolute right-4 top-3 text-gray-400">hrs</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Clock className="mr-2 text-indigo-500" size={18} /> Physical Activity
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={lifestyle.activity}
                      onChange={(e) => setLifestyle({...lifestyle, activity: Number(e.target.value)})}
                      className="w-full rounded-xl border-gray-200 py-3 pl-4 pr-12 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Minutes"
                    />
                    <span className="absolute right-4 top-3 text-gray-400">min</span>
                  </div>
                </div>
              </div>

              <RangeSlider 
                label="Stress Exposure" 
                icon={<Brain size={18} />} 
                value={lifestyle.stress} 
                onChange={(v) => setLifestyle({...lifestyle, stress: v})} 
                minLabel="Relaxed" 
                maxLabel="Overwhelmed"
              />
              
              <RangeSlider 
                label="Diet Quality" 
                icon={<Utensils size={18} />} 
                value={lifestyle.diet} 
                onChange={(v) => setLifestyle({...lifestyle, diet: v})} 
                minLabel="Poor" 
                maxLabel="Optimal"
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lifestyle Notes</label>
                <textarea 
                  value={lifestyle.notes}
                  onChange={(e) => setLifestyle({...lifestyle, notes: e.target.value})}
                  className="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  placeholder="Environmental triggers, specific meals, etc."
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between">
            <div className={`transition-opacity duration-300 ${success ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center text-green-600 font-medium">
                <CheckCircle2 className="mr-2" size={20} /> Data saved successfully!
              </div>
            </div>
            <button 
              type="submit"
              disabled={submitting}
              className={`px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Processing...' : 'Save Intelligence Log'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

function RangeSlider({ label, icon, value, onChange, minLabel, maxLabel }: { 
  label: string, 
  icon: React.ReactNode, 
  value: number, 
  onChange: (v: number) => void,
  minLabel: string,
  maxLabel: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <span className="mr-2 text-indigo-500">{icon}</span> {label}
        </label>
        <span className="text-lg font-bold text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full">{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="10" 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-400 font-medium">{minLabel}</span>
        <span className="text-xs text-gray-400 font-medium">{maxLabel}</span>
      </div>
    </div>
  );
}
