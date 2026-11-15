import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PackageSearch, 
  HelpCircle, 
  ChevronDown, 
  Database, 
  Lock, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does CampusFind verify student identity?',
    a: 'Students authenticate using their university email or registered account via Supabase Auth. Row Level Security policies ensure students can only edit and manage items they created.'
  },
  {
    q: 'What should I do when I discover a valuable item (laptop, phone, wallet)?',
    a: 'Post a clear photo and note the location on CampusFind. If it contains IDs or bank cards, you are encouraged to drop it off at Campus Security Dispatch (Room 102) and specify in your post that it has been safely safeguarded there.'
  },
  {
    q: 'How do I prove an item belongs to me when claiming it?',
    a: 'Be prepared to provide verification: unlock device passcodes, describe unique contents of bags, identify keychain details, or show matching student identification numbers.'
  },
  {
    q: 'Is my personal contact information visible to anyone on the web?',
    a: 'Only the contact instructions you explicitly choose to provide (like your student email or campus phone) are shown. Your password and internal user credentials are encrypted by Supabase and never exposed.'
  },
  {
    q: 'What happens when an item is successfully returned?',
    a: 'Simply click "Mark as Resolved" on your dashboard or item card. The post is marked with a green resolved badge and moved to completed cases, preventing redundant messages.'
  }
];

export default function About({ setCurrentPage }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple-light shadow-glow-purple">
          <PackageSearch className="w-4 h-4" />
          <span>About CampusFind</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Empowering Campus Integrity & Safe Reunions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CampusFind is a dedicated, real-time portal architected to eliminate lost belonging anxiety across university campuses.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-white">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every semester, thousands of student belongings—textbooks, graphing calculators, keys, and laptops—go missing in lecture halls and libraries. Traditional bulletin boards and scattered social media threads lead to missed connections.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            CampusFind bridges this gap with a centralized, searchable platform with instant location filters, high-resolution photo uploads, and verified student accounts.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Real-time PostgreSQL database powered by Supabase</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Strict Row Level Security (RLS) policies for user data</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Cloud image storage with public delivery CDN</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-tr from-navy-950 via-navy-900 to-indigo-950/60 border border-navy-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Campus Safety & Return Protocol
          </h3>
          <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-md bg-brand-purple/20 text-brand-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
              <span><strong>Public Locations Only:</strong> Never arrange item exchanges in isolated parking garages or private dorm rooms. Use the Campus Security Office or Central Library helpdesk.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-md bg-brand-purple/20 text-brand-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
              <span><strong>Ownership Verification:</strong> Ask claimants to provide specific serial numbers, wallpaper descriptions, or identification before handing over electronics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-md bg-brand-purple/20 text-brand-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
              <span><strong>Mark as Resolved:</strong> As soon as an item is returned, toggle the post status to resolved to celebrate and clear active listings.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white text-center">
          Modern Architecture & Tech Stack
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass-panel border border-navy-800 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center font-bold text-sm">
              ⚛️
            </div>
            <h4 className="text-xs font-bold text-white">React 18 + Vite</h4>
            <p className="text-[11px] text-slate-400">Blazing fast responsive frontend SPA</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-navy-800 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center font-bold text-sm">
              🎨
            </div>
            <h4 className="text-xs font-bold text-white">Tailwind CSS</h4>
            <p className="text-[11px] text-slate-400">Navy blue, white & purple glassmorphism</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-navy-800 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
            <h4 className="text-xs font-bold text-white">Supabase Auth</h4>
            <p className="text-[11px] text-slate-400">Secure student identity & sessions</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-navy-800 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-bold text-sm">
              🐘
            </div>
            <h4 className="text-xs font-bold text-white">PostgreSQL + Storage</h4>
            <p className="text-[11px] text-slate-400">Row Level Security & item photo bucket</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-400">Quick answers to common questions about CampusFind</p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl glass-panel border border-navy-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-brand-purple-light transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    openFaq === i ? 'rotate-180 text-brand-purple-light' : ''
                  }`}
                />
              </button>

              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-navy-800/60 pt-3 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-purple-dark/80 via-navy-900 to-indigo-900/80 border border-brand-purple/30 text-center space-y-4 shadow-glow-purple">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Ready to help your campus community?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Start by browsing reported items or log a missing belonging in under 60 seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentPage('add')}
            className="px-6 py-3 rounded-2xl bg-white text-navy-950 hover:bg-slate-100 font-bold text-xs shadow-lg transition-transform active:scale-95"
          >
            Post an Item Now
          </button>
          <button
            onClick={() => setCurrentPage('lost')}
            className="px-6 py-3 rounded-2xl bg-navy-950/80 hover:bg-navy-950 text-white border border-white/20 font-bold text-xs transition-colors"
          >
            Browse Lost Directory
          </button>
        </div>
      </div>
    </div>
  );
}
