import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Calendar,
  RotateCcw
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';

const CATEGORIES = [
  'All Categories',
  'Electronics',
  'ID & Cards',
  'Keys',
  'Books & Stationery',
  'Bags & Wallets',
  'Clothing & Accessories',
  'Other'
];

const LOCATIONS = [
  'All Locations',
  'Central Library',
  'Student Center Food Court',
  'Engineering Block',
  'Science Quad',
  'Sports & Recreation Complex',
  'Campus Dining Hall',
  'Humanities & Arts Wing',
  'Hostels / Dormitory Area',
  'Campus Parking Lots',
  'Other / Campus Grounds'
];

export default function FoundItems({ 
  setCurrentPage, 
  initialSearch = '', 
  initialCategory = 'All Categories',
  onSelectItem, 
  onEditItem, 
  onToggleResolved 
}) {
  const { items } = useItems();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState('All Locations');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'resolved'
  const [sortBy, setSortBy] = useState('newest');

  // Filter found items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => item.item_type === 'found')
      .filter((item) => {
        // Status filter
        if (statusFilter === 'active' && item.status !== 'active') return false;
        if (statusFilter === 'resolved' && item.status !== 'resolved') return false;

        // Category filter
        if (category !== 'All Categories' && item.category !== category) return false;

        // Location filter
        if (location !== 'All Locations' && !item.location.toLowerCase().includes(location.toLowerCase())) {
          return false;
        }

        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          const matchLoc = item.location?.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date || a.created_at).getTime();
        const dateB = new Date(b.date || b.created_at).getTime();
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [items, search, category, location, statusFilter, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setCategory('All Categories');
    setLocation('All Locations');
    setStatusFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters = search || category !== 'All Categories' || location !== 'All Locations' || statusFilter !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Campus Found Items
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Turned in or safely safeguarded items waiting to be reclaimed by their rightful owners.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('add')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          Report Found Item
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-navy-800 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search found items by title, category, brand, or campus spot..."
            className="w-full glass-input pl-12 pr-10 py-3 rounded-2xl text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-navy-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Found Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-navy-900 text-white">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
            >
              <option value="all" className="bg-navy-900 text-white">All (Active & Claimed)</option>
              <option value="active" className="bg-navy-900 text-white">Active Only (Unclaimed)</option>
              <option value="resolved" className="bg-navy-900 text-white">Resolved (Reunited)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
            >
              <option value="newest" className="bg-navy-900 text-white">Newest First</option>
              <option value="oldest" className="bg-navy-900 text-white">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Filter status & clear row */}
        <div className="flex items-center justify-between pt-2 border-t border-navy-800/60 text-xs text-slate-400">
          <span>
            Found <strong className="text-white">{filteredItems.length}</strong> cataloged item{filteredItems.length === 1 ? '' : 's'}
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-brand-purple-light hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Found Items */}
      {filteredItems.length === 0 ? (
        <div className="p-16 rounded-3xl glass-panel text-center space-y-4 border border-navy-800">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 mx-auto flex items-center justify-center border border-navy-800 text-slate-400">
            <Sparkles className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No Found Items Matching Criteria</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              No discovered items meet this filter criteria right now. Check back soon or search the Lost Items directory.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-navy-800 hover:bg-navy-700 text-white transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setCurrentPage('add')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-purple hover:bg-brand-purple-dark text-white transition-colors"
            >
              Post Found Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
    </div>
  );
}
