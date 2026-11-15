import React, { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Laptop, 
  CreditCard, 
  Key, 
  BookOpen, 
  Briefcase, 
  Shirt, 
  TrendingUp, 
  Users
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';

const CATEGORY_ITEMS = [
  { name: 'Electronics', icon: Laptop, count: 18, color: 'text-blue-400' },
  { name: 'ID & Cards', icon: CreditCard, count: 24, color: 'text-purple-400' },
  { name: 'Keys', icon: Key, count: 12, color: 'text-amber-400' },
  { name: 'Books & Stationery', icon: BookOpen, count: 9, color: 'text-emerald-400' },
  { name: 'Bags & Wallets', icon: Briefcase, count: 15, color: 'text-pink-400' },
  { name: 'Clothing & Accessories', icon: Shirt, count: 8, color: 'text-cyan-400' },
];

export default function Home({ 
  setCurrentPage, 
  setSelectedCategory, 
  setSearchQuery, 
  onSelectItem, 
  onEditItem, 
  onToggleResolved 
}) {
  const { items } = useItems();
  const [localSearch, setLocalSearch] = useState('');

  const lostItems = items.filter(i => i.item_type === 'lost' && i.status === 'active');
  const foundItems = items.filter(i => i.item_type === 'found' && i.status === 'active');
  const resolvedCount = items.filter(i => i.status === 'resolved').length;
  const resolutionRate = items.length > 0 ? Math.round((resolvedCount / items.length) * 100) : 88;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (setSearchQuery) {
      setSearchQuery(localSearch);
    }
    setCurrentPage('lost');
  };

  const handleCategoryClick = (categoryName) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryName);
    }
    setCurrentPage('lost');
  };

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-purple/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-brand-purple/30 text-xs font-semibold text-brand-purple-light shadow-glow-purple">
            <Sparkles className="w-4 h-4 text-brand-purple-light animate-pulse" />
            <span>The Official Smart Campus Lost & Found Network</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Lost something on campus? <br />
              <span className="bg-gradient-to-r from-brand-purple-light via-indigo-300 to-white bg-clip-text text-transparent">
                We'll help you find it.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
              Fast, secure student portal powered by Supabase. Search lost belongings, report items you discovered, and safely reunite with campus community members.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex items-center glass-panel p-2 rounded-2xl border border-navy-700/80 shadow-2xl focus-within:border-brand-purple/60 focus-within:shadow-glow-purple transition-all duration-300">
              <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by item name (e.g. MacBook, student ID, blue water bottle, keys)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-brand-purple-dark hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md flex-shrink-0 transition-transform active:scale-95"
              >
                Search
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Dual Call To Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentPage('add')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-500/25 hover:scale-105 transition-all"
            >
              <AlertCircle className="w-4 h-4" />
              Report Lost Belonging
            </button>

            <button
              onClick={() => setCurrentPage('add')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              I Found an Item
            </button>

            <button
              onClick={() => setCurrentPage('lost')}
              className="px-6 py-3.5 rounded-2xl bg-navy-900/80 hover:bg-navy-800 text-slate-200 font-semibold text-sm border border-navy-700/80 hover:border-slate-500 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              Browse Campus Board
            </button>
          </div>

          {/* Live Metrics Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
            <div className="p-4 rounded-2xl glass-panel border border-navy-800 text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Items</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{items.length}</p>
              <span className="text-[11px] text-slate-400">Campus records logged</span>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-navy-800 text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-rose-400">Active Lost</span>
              <p className="text-2xl sm:text-3xl font-black text-rose-300 mt-1">{lostItems.length}</p>
              <span className="text-[11px] text-slate-400">Waiting for recovery</span>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-navy-800 text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Safe With Finders</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1">{foundItems.length}</p>
              <span className="text-[11px] text-slate-400">Ready to be claimed</span>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-navy-800 text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-purple-light">Resolved Rate</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{resolutionRate}%</p>
              <span className="text-[11px] text-emerald-400 font-medium">Reunited successfully</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Popular Campus Categories</h2>
            <p className="text-xs sm:text-sm text-slate-400">Quickly filter through high-frequency missing items</p>
          </div>
          <button
            onClick={() => setCurrentPage('lost')}
            className="text-xs sm:text-sm font-bold text-brand-purple-light hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORY_ITEMS.map((cat) => {
            const Icon = cat.icon;
            const count = items.filter(i => i.category === cat.name).length;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="p-4 rounded-2xl glass-panel-interactive border border-navy-800 cursor-pointer group flex flex-col items-center text-center space-y-2 select-none"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center border border-navy-800 group-hover:border-brand-purple/40 group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                  {cat.name}
                </h4>
                <span className="text-[11px] font-semibold text-slate-400">
                  {count} items
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Lost Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Recently Reported Lost</h2>
              <p className="text-xs sm:text-sm text-slate-400">Help fellow campus peers recover their essentials</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('lost')}
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-rose-300 font-bold text-xs border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center gap-1.5"
          >
            <span>All Lost Items ({lostItems.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {lostItems.length === 0 ? (
          <div className="p-12 rounded-3xl glass-panel text-center space-y-3">
            <p className="text-slate-400 text-sm">No active lost items reported currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.slice(0, 3).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                onEdit={onEditItem}
                onToggleResolved={onToggleResolved}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent Found Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Recently Found Belongings</h2>
              <p className="text-xs sm:text-sm text-slate-400">Is one of these items yours? Verify and claim it now</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('found')}
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-emerald-300 font-bold text-xs border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center gap-1.5"
          >
            <span>All Found Items ({foundItems.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {foundItems.length === 0 ? (
          <div className="p-12 rounded-3xl glass-panel text-center space-y-3">
            <p className="text-slate-400 text-sm">No active found items posted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundItems.slice(0, 3).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                onEdit={onEditItem}
                onToggleResolved={onToggleResolved}
              />
            ))}
          </div>
        )}
      </section>

      {/* How CampusFind Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-navy-800 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple-light">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              How CampusFind Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Designed specifically for campus culture to facilitate quick, honest returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl glass-panel-subtle border border-navy-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Report & Tag</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Take a quick photo, tag the exact campus location (Library, Science Hall, Cafeteria), and upload your post in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl glass-panel-subtle border border-navy-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Match & Verify</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Students search by keyword and category filters. Finders and owners communicate directly using verified student emails.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl glass-panel-subtle border border-navy-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Safe Campus Reunion</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Meet at the campus security desk or student union front desk to return the item safely and mark the ticket resolved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
