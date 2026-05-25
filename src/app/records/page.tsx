'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { FileText, Upload, Plus, Search, File, MoreVertical, Download, Trash2 } from 'lucide-react';

const mockRecords = [
  { id: '1', name: 'Blood Test Report - May 2024', type: 'report', date: 'May 12, 2024', size: '1.2 MB' },
  { id: '2', name: 'Prescription - Rheumatologist', type: 'prescription', date: 'April 28, 2024', size: '450 KB' },
  { id: '3', name: 'Initial Consultation Notes', type: 'notes', date: 'April 15, 2024', size: '2.1 MB' },
];

export default function RecordsPage() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Health Records</h2>
          <p className="text-gray-500 mt-1">Centralized storage for your prescriptions, reports, and notes.</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
          <Plus size={20} className="mr-2" /> Upload Record
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search records by name..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <FilterBadge label="All" active />
          <FilterBadge label="Reports" />
          <FilterBadge label="Prescriptions" />
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Record Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mr-3">
                      <FileText size={18} />
                    </div>
                    <span className="font-semibold text-gray-900">{record.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    record.type === 'report' ? 'bg-blue-50 text-blue-600' :
                    record.type === 'prescription' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{record.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{record.size}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <button className="hover:text-indigo-600 transition-colors"><Download size={18} /></button>
                    <button className="hover:text-rose-600 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State / Upload Trigger Area */}
        <div className="p-12 border-t border-gray-100 bg-gray-50/30 text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 mb-4">
            <Upload size={24} />
          </div>
          <h4 className="text-lg font-bold text-gray-900">Drag and drop health files</h4>
          <p className="text-gray-500 text-sm mt-1 mb-6">Support for PDF, JPG, PNG up to 10MB</p>
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
            Browse Files
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function FilterBadge({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}>
      {label}
    </button>
  );
}
