'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from 'recharts';
import { TrendingUp, AlertTriangle, Moon, Zap, Target } from 'lucide-react';

const mockTrendData = [
  { date: 'May 19', pain: 2, fatigue: 4, sleep: 7.5, stress: 3 },
  { date: 'May 20', pain: 3, fatigue: 5, sleep: 6.0, stress: 6 },
  { date: 'May 21', pain: 7, fatigue: 8, sleep: 5.5, stress: 8 },
  { date: 'May 22', pain: 5, fatigue: 6, sleep: 7.0, stress: 5 },
  { date: 'May 23', pain: 4, fatigue: 4, sleep: 8.0, stress: 2 },
  { date: 'May 24', pain: 3, fatigue: 5, sleep: 7.5, stress: 3 },
  { date: 'May 25', pain: 2, fatigue: 3, sleep: 8.5, stress: 2 },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Health Intelligence Overview</h2>
          <p className="text-gray-500 mt-1">Correlation between your lifestyle patterns and symptom behavior.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-white p-1 rounded-xl border border-gray-200 flex">
          <button className="px-4 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg">Last 7 Days</button>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">30 Days</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Avg. Fatigue" value="4.2" trend="-12%" trendType="good" icon={<Zap size={20} className="text-amber-500" />} />
        <StatCard title="Sleep Quality" value="7.2h" trend="+15%" trendType="good" icon={<Moon size={20} className="text-indigo-500" />} />
        <StatCard title="Pain Index" value="3.1" trend="+5%" trendType="bad" icon={<TrendingUp size={20} className="text-rose-500" />} />
        <StatCard title="Active Days" value="5/7" trend="Stable" trendType="neutral" icon={<Target size={20} className="text-emerald-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Symptom Trends */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Symptom Intensity</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Longitudinal</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="pain" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="fatigue" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation: Stress vs Pain */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Lifestyle vs. Pain</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Pattern Recognition</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <Tooltip />
                <Area type="monotone" dataKey="stress" stroke="#6366f1" fillOpacity={1} fill="url(#colorStress)" strokeWidth={2} />
                <Area type="monotone" dataKey="pain" stroke="#f43f5e" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 rounded-xl flex items-start">
            <AlertTriangle className="text-indigo-600 mr-3 mt-0.5" size={20} />
            <p className="text-sm text-indigo-900 leading-relaxed">
              <strong>Insight:</strong> High stress on May 21 correlates with a pain spike. Consider recovery protocols.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, trend, trendType, icon }: { 
  title: string, value: string, trend: string, trendType: 'good' | 'bad' | 'neutral', icon: React.ReactNode 
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${
          trendType === 'good' ? 'bg-emerald-50 text-emerald-600' : 
          trendType === 'bad' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {trend}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
