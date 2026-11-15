import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  User, 
  Building, 
  GraduationCap, 
  Mail, 
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';
import confetti from 'canvas-confetti';

export default function Dashboard({ 
  setCurrentPage, 
  onSelectItem, 
  onEditItem, 
  onToggleResolved 
}) {
  const { user } = useAuth();
  const { items, deleteItem } = useItems();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'lost', 'found', 'resolved'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // If user is not logged in
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-navy-900 border border-navy-800 text-brand-purple-light mx-auto flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Student Dashboard</h2>
          <p className="text-sm text-slate-400">
            Please sign in to manage your campus lost and found submissions, edit details, and mark items as resolved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage('login')}
            className="px-6 py-3 rounded-2xl bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple transition-all"
          >
            <LogIn className="w-4 h-4" />
            Sign In to Account
          </button>
          <button
            onClick={() => setCurrentPage('signup')}
            className="px-6 py-3 rounded-2xl bg-white text-navy-950 hover:bg-slate-100 font-bold text-xs transition-all"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  // Filter items owned by this user
  const myItems = items.filter(
    (item) => item.user_id === user.id || item.user_email === user.email
  );

  const myLostCount = myItems.filter((i) => i.item_type === 'lost').length;
  const myFoundCount = myItems.filter((i) => i.item_type === 'found').length;
  const myResolvedCount = myItems.filter((i) => i.status === 'resolved').length;
  const resolutionPercentage = myItems.length > 0 ? Math.round((myResolvedCount / myItems.length) * 100) : 0;

  // Filtered by active tab
  const displayedItems = myItems.filter((item) => {
    if (activeTab === 'lost') return item.item_type === 'lost';
    if (activeTab === 'found') return item.item_type === 'found';
    if (activeTab === 'resolved') return item.status === 'resolved';
    return true;
  });

  const handleDelete = async (id, imagePath) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      return;
    }
    try {
      await deleteItem(id, imagePath);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleResolve = async (item) => {
    if (item.status !== 'resolved') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
    await onToggleResolved(item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* Profile Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-navy-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand-purple to-indigo-500 p-0.5 flex-shrink-0 shadow-glow-purple">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center text-2xl font-black text-white">
              {(user.user_metadata?.full_name || user.email || 'S').charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                Student Account
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                {user.email}
              </span>
              {user.user_metadata?.student_id && (
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-purple-light" />
                  ID: {user.user_metadata.student_id}
                </span>
              )}
              {user.user_metadata?.department && (
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {user.user_metadata.department}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('add')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-brand-purple-dark hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-purple hover:scale-105 transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Report
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-navy-800">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Reports</span>
          <p className="text-3xl font-black text-white mt-1.5">{myItems.length}</p>
          <span className="text-[11px] text-slate-400">Your logged items</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-navy-800">
          <span className="text-xs uppercase font-bold tracking-wider text-rose-400">My Lost Posts</span>
          <p className="text-3xl font-black text-rose-300 mt-1.5">{myLostCount}</p>
          <span className="text-[11px] text-slate-400">Items you're seeking</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-navy-800">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">My Found Posts</span>
          <p className="text-3xl font-black text-emerald-300 mt-1.5">{myFoundCount}</p>
          <span className="text-[11px] text-slate-400">Items you safely turned in</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-navy-800">
          <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">Resolved Cases</span>
          <p className="text-3xl font-black text-white mt-1.5">{myResolvedCount}</p>
          <span className="text-[11px] text-emerald-400 font-medium">{resolutionPercentage}% resolved</span>
        </div>
      </div>

      {/* Tabs and Management Content */}
      <div className="space-y-6">
        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-navy-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-navy-800 text-white shadow-sm border border-navy-700'
                : 'text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            All Submissions ({myItems.length})
          </button>

          <button
            onClick={() => setActiveTab('lost')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lost'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            Lost ({myLostCount})
          </button>

          <button
            onClick={() => setActiveTab('found')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'found'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            Found ({myFoundCount})
          </button>

          <button
            onClick={() => setActiveTab('resolved')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'resolved'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            Resolved ({myResolvedCount})
          </button>
        </div>

        {/* Displayed Items List / Grid */}
        {displayedItems.length === 0 ? (
          <div className="p-16 rounded-3xl glass-panel text-center space-y-4 border border-navy-800">
            <div className="w-16 h-16 rounded-2xl bg-navy-900 mx-auto flex items-center justify-center border border-navy-800 text-slate-400">
              <Package className="w-8 h-8 text-brand-purple-light" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No items found in this section</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                {activeTab === 'all'
                  ? "You haven't reported any lost or found items yet."
                  : `You have no ${activeTab} items logged.`}
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('add')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-purple hover:bg-brand-purple-dark text-white transition-colors shadow-glow-purple"
            >
              Post Your First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                onEdit={onEditItem}
                onToggleResolved={handleResolve}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
