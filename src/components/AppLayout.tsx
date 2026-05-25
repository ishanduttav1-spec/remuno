import React from 'react';
import Link from 'next/link';
import { Home, ClipboardList, Calendar, FileText, Settings, User } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Remuno</h1>
          <p className="text-xs text-gray-500 font-medium uppercase mt-1">Care Intelligence</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem href="/dashboard" icon={<Home size={20} />} label="Dashboard" />
          <NavItem href="/log" icon={<ClipboardList size={20} />} label="Log Entry" active />
          <NavItem href="/appointments" icon={<Calendar size={20} />} label="Appointments" />
          <NavItem href="/records" icon={<FileText size={20} />} label="Health Records" />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
          <div className="flex items-center p-3 mt-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold mr-3">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:hidden">
          <h1 className="text-xl font-bold text-indigo-600">Remuno</h1>
          <button className="p-2 text-gray-500">
            <User size={24} />
          </button>
        </header>
        <div className="max-w-5xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className="mr-3 text-gray-400 group-hover:text-gray-500">{icon}</span>
      {label}
    </Link>
  );
}
