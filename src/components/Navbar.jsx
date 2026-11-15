import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { 
  Search, 
  PlusCircle, 
  LayoutDashboard, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  HelpCircle,
  PackageSearch,
  CheckCircle2,
  Database
} from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, onOpenSetupModal }) {
  const { user, signOut, isConfigured } = useAuth();
  const { items } = useItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lostCount = items.filter(i => i.item_type === 'lost' && i.status === 'active').length;
  const foundCount = items.filter(i => i.item_type === 'found' && i.status === 'active').length;

  const handleNav = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentPage('home');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-navy-950/80 border-b border-navy-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-purple-dark via-brand-purple to-indigo-500 p-0.5 shadow-lg shadow-brand-purple/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <PackageSearch className="w-6 h-6 text-brand-purple-light group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Campus<span className="text-brand-purple-light">Find</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple-light border border-brand-purple/30">
                  Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Smart Lost & Found Hub</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-navy-800 text-white shadow-sm border border-navy-700/80'
                  : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('lost')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
                currentPage === 'lost'
                  ? 'bg-navy-800 text-rose-300 shadow-sm border border-rose-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              Lost Items
              <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                {lostCount}
              </span>
            </button>

            <button
              onClick={() => handleNav('found')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
                currentPage === 'found'
                  ? 'bg-navy-800 text-emerald-300 shadow-sm border border-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              Found Items
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                {foundCount}
              </span>
            </button>

            <button
              onClick={() => handleNav('add')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm ${
                currentPage === 'add'
                  ? 'bg-brand-purple text-white shadow-glow-purple'
                  : 'bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-brand-purple-dark hover:to-indigo-700 text-white shadow-brand-purple/20 hover:scale-[1.02]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Report Item
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentPage === 'about'
                  ? 'bg-navy-800 text-white shadow-sm border border-navy-700/80'
                  : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              About
            </button>
          </nav>

          {/* Desktop Right Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Supabase status badge */}
            <button
              onClick={onOpenSetupModal}
              title={isConfigured ? 'Connected to live Supabase Backend' : 'Click to configure Supabase credentials'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors glass-panel-subtle hover:border-brand-purple/40"
            >
              <Database className={`w-3.5 h-3.5 ${isConfigured ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="hidden xl:inline text-slate-300">
                {isConfigured ? 'Supabase Live' : 'Backend Setup'}
              </span>
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            {user ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-navy-800">
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                    currentPage === 'dashboard'
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200'
                      : 'border-navy-700/80 bg-navy-900/70 text-slate-200 hover:bg-navy-800'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-brand-purple flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {(user.user_metadata?.full_name || user.email || 'S').charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate font-medium text-xs">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-navy-800">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-navy-800 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-navy-950 hover:bg-slate-100 transition-all shadow-md shadow-white/10 flex items-center gap-1.5 font-bold"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSetupModal}
              className="p-2 rounded-xl text-slate-400 border border-navy-800"
              title="Database Status"
            >
              <Database className={`w-4 h-4 ${isConfigured ? 'text-emerald-400' : 'text-amber-400'}`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800 border border-navy-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-navy-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => handleNav('home')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                currentPage === 'home' ? 'bg-navy-800 text-white' : 'text-slate-300 hover:bg-navy-900'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('lost')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                currentPage === 'lost' ? 'bg-navy-800 text-rose-300' : 'text-slate-300 hover:bg-navy-900'
              }`}
            >
              <span>Lost Items</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500/20 text-rose-400 font-bold">
                {lostCount}
              </span>
            </button>

            <button
              onClick={() => handleNav('found')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                currentPage === 'found' ? 'bg-navy-800 text-emerald-300' : 'text-slate-300 hover:bg-navy-900'
              }`}
            >
              <span>Found Items</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                {foundCount}
              </span>
            </button>

            <button
              onClick={() => handleNav('add')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-brand-purple to-indigo-600 text-white shadow-glow-purple"
            >
              <PlusCircle className="w-4 h-4" />
              Report Lost or Found Item
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                currentPage === 'about' ? 'bg-navy-800 text-white' : 'text-slate-300 hover:bg-navy-900'
              }`}
            >
              About CampusFind
            </button>

            {user ? (
              <>
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border ${
                    currentPage === 'dashboard'
                      ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300'
                      : 'border-navy-700/60 text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard ({user.user_metadata?.full_name || user.email?.split('@')[0]})
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-800">
                <button
                  onClick={() => handleNav('login')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-navy-900 border border-navy-800"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-white text-navy-950"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
