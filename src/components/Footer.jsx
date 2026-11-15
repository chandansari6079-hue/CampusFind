import React from 'react';
import { PackageSearch, ShieldCheck, Heart, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-navy-950 border-t border-navy-800/80 text-slate-400 mt-24">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-indigo-500 flex items-center justify-center p-0.5 shadow-lg shadow-brand-purple/20">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <PackageSearch className="w-5 h-5 text-brand-purple-light" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Campus<span className="text-brand-purple-light">Find</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The smart, trusted digital lost and found portal connecting students, staff, and campus security. Built with Supabase PostgreSQL and Row Level Security for guaranteed safety and privacy.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Campus Verified & Secure Student Authentication</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-brand-purple-light transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('lost')} className="hover:text-rose-400 transition-colors">
                  Lost Items Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('found')} className="hover:text-emerald-400 transition-colors">
                  Found Items Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('add')} className="hover:text-brand-purple-light transition-colors">
                  Report Missing Belonging
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-brand-purple-light transition-colors">
                  About & Safety Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Zones */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Campus Hotspots</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-purple-light" />
                <span>Central Library (Levels 1-4)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-purple-light" />
                <span>Student Center & Dining</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-purple-light" />
                <span>Engineering & CS Labs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-purple-light" />
                <span>Sports Complex & Courts</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-purple-light" />
                <span>Science Quad Lecture Halls</span>
              </li>
            </ul>
          </div>

          {/* Campus Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Campus Helpdesk</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Security Dispatch: Ext. 4400</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>lostfound@campus.edu</span>
              </li>
              <li className="text-xs text-slate-400 pt-2 leading-relaxed">
                Physical drop-off available at Student Union Room 102 (Mon-Fri 8am-8pm).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-900 bg-navy-950/90 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CampusFind Portal. Designed for Campus Community.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Powered by <span className="font-semibold text-slate-300">Supabase</span> + <span className="font-semibold text-slate-300">React</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400">Row Level Security Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
