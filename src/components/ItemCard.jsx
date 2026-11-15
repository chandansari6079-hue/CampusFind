import React from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  Edit3,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ItemCard({ 
  item, 
  onSelect, 
  onEdit, 
  onToggleResolved 
}) {
  const { user } = useAuth();
  const isOwner = user && (user.id === item.user_id || user.email === item.user_email);
  const isLost = item.item_type === 'lost';
  const isResolved = item.status === 'resolved';

  const categoryColorMap = {
    'Electronics': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'ID & Cards': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Keys': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Books & Stationery': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Bags & Wallets': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    'Clothing & Accessories': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Other': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  const badgeColor = categoryColorMap[item.category] || categoryColorMap['Other'];

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden glass-panel-interactive border transition-all duration-300 flex flex-col ${
        isResolved ? 'opacity-75 border-slate-700/60' : 'border-navy-700/60 hover:border-brand-purple/50'
      }`}
    >
      {/* Image Thumbnail Container */}
      <div 
        onClick={() => onSelect(item)} 
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy-900 cursor-pointer"
      >
        <img
          src={item.image_url || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-md uppercase backdrop-blur-md flex items-center gap-1 border ${
                isLost 
                  ? 'bg-rose-500/90 text-white border-rose-400/40' 
                  : 'bg-emerald-500/90 text-white border-emerald-400/40'
              }`}
            >
              {isLost ? <AlertCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              {isLost ? 'Lost Item' : 'Found Item'}
            </span>

            {isResolved && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Resolved
              </span>
            )}
          </div>

          <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold backdrop-blur-md border ${badgeColor}`}>
            {item.category}
          </span>
        </div>

        {/* Quick view hint hover */}
        <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-white/90 text-navy-950 text-xs font-bold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4" />
            View Full Details
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 
            onClick={() => onSelect(item)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-brand-purple-light transition-colors line-clamp-1 cursor-pointer"
          >
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Metadata info */}
        <div className="mt-4 pt-3 border-t border-navy-800/80 space-y-2 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-brand-purple-light flex-shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{item.date}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[130px]">{item.user_name || 'Student'}</span>
            </div>

            {/* Owner Actions shortcut */}
            {isOwner ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(item);
                  }}
                  className="px-2 py-1 rounded-lg text-xs font-medium text-brand-purple-light hover:bg-brand-purple/10 border border-brand-purple/20 transition-colors flex items-center gap-1"
                  title="Edit post"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleResolved && onToggleResolved(item);
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                    isResolved
                      ? 'text-amber-400 border-amber-500/30 hover:bg-amber-500/10'
                      : 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
                  }`}
                  title={isResolved ? 'Mark as Active' : 'Mark as Resolved'}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {isResolved ? 'Reopen' : 'Resolve'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => onSelect(item)}
                className="text-xs font-semibold text-brand-purple-light hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Details</span>
                <span className="text-[10px]">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
