import React, { useState } from 'react';
import { Database, Copy, Check, ExternalLink, X, ChevronRight, ShieldCheck, Key, FileCode } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function SetupNotice({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const sampleEnv = `VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key`;

  const copyEnv = () => {
    navigator.clipboard.writeText(sampleEnv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-navy-900 border border-brand-purple/40 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-navy-800 bg-navy-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-indigo-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Database className="w-5 h-5 text-brand-purple-light" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Supabase Backend Setup
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isSupabaseConfigured 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {isSupabaseConfigured ? 'Connected' : 'Credentials Needed'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Complete setup in 3 easy steps or test with demo data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-slate-300">
          {isSupabaseConfigured ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <ShieldCheck className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">Live Supabase Backend Connected!</p>
                <p className="text-xs text-emerald-200">All authentication, real-time items database queries, and storage are active.</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-navy-950/80 border border-brand-purple/20 space-y-2">
              <p className="text-xs font-semibold text-brand-purple-light uppercase tracking-wider">
                Current Mode: Demo & Offline Preview
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                CampusFind is running in interactive preview mode with seeded realistic campus items. You can search, filter, report items, test authentication, and manage posts right now.
              </p>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              To connect your live Supabase project:
            </h4>

            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-navy-950/60 border border-navy-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <span className="w-5 h-5 rounded-full bg-brand-purple/30 text-brand-purple-light flex items-center justify-center text-[10px]">1</span>
                <span>Get Supabase API Keys</span>
              </div>
              <p className="text-xs text-slate-400 pl-7">
                Log into <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-indigo-400 underline hover:text-indigo-300 inline-flex items-center gap-1">supabase.com <ExternalLink className="w-3 h-3" /></a>, create a project, and go to <strong>Project Settings → API</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-navy-950/60 border border-navy-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <span className="w-5 h-5 rounded-full bg-brand-purple/30 text-brand-purple-light flex items-center justify-center text-[10px]">2</span>
                <span>Configure .env file</span>
              </div>
              <p className="text-xs text-slate-400 pl-7">
                Paste your project URL and publishable anon key in <code className="text-brand-purple-light bg-navy-900 px-1 py-0.5 rounded">.env</code>:
              </p>
              <div className="ml-7 p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>VITE_SUPABASE_URL=...<br />VITE_SUPABASE_PUBLISHABLE_KEY=...</span>
                <button
                  onClick={copyEnv}
                  className="px-2.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs text-white flex items-center gap-1 border border-navy-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-navy-950/60 border border-navy-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <span className="w-5 h-5 rounded-full bg-brand-purple/30 text-brand-purple-light flex items-center justify-center text-[10px]">3</span>
                <span>Run SQL Script in Supabase</span>
              </div>
              <p className="text-xs text-slate-400 pl-7">
                Open <strong>SQL Editor</strong> in your Supabase dashboard and run the ready script from <code className="text-brand-purple-light bg-navy-900 px-1 py-0.5 rounded">supabase/schema.sql</code>. It creates the <code className="text-white">items</code> table, sets up Row Level Security (RLS), and creates the <code className="text-white">item-images</code> public storage bucket.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-navy-950 hover:bg-slate-100 transition-colors shadow-md"
            >
              Close & Explore Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
