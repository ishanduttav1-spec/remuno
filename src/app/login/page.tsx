'use client';

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">Remuno</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          {mode === 'login' ? 'Welcome Back' : 'Join Remuno'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {mode === 'login' 
            ? "Your journey to continuous autoimmune care continues here." 
            : "Start building your longitudinal disease intelligence today."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-10 shadow-xl shadow-indigo-100/50 rounded-3xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-100 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                {!loading && <ArrowRight size={18} className="ml-2" />}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="font-bold text-indigo-600 hover:text-indigo-500"
              >
                {mode === 'login' ? 'Sign up now' : 'Log in instead'}
              </button>
            </p>
          </div>
        </div>

        {/* Core Value Props for Signup */}
        {mode === 'signup' && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center text-xs font-medium text-gray-500">
              <CheckCircle2 size={14} className="mr-2 text-emerald-500" /> Secure Encryption
            </div>
            <div className="flex items-center text-xs font-medium text-gray-500">
              <CheckCircle2 size={14} className="mr-2 text-emerald-500" /> Longitudinal Insights
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
