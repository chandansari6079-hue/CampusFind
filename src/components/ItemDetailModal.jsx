import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Edit3, 
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function ItemDetailModal({ 
  item, 
  onClose, 
  onEdit, 
  onDelete, 
  onToggleResolved 
}) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!item) return null;

  const isOwner = user && (user.id === item.user_id || user.email === item.user_email);
  const isLost = item.item_type === 'lost';
  const isResolved = item.status === 'resolved';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResolveClick = async () => {
    if (!isResolved) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore confetti error
      }
    }
    await onToggleResolved(item);
  };

  const handleDeleteClick = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(item.id, item.image_path);
      onClose();
    } catch (err) {
      console.error('Failed to delete item:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-navy-900 border border-navy-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800 bg-navy-950/40">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${
                isLost ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {isLost ? <AlertCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              {isLost ? 'Lost Item Report' : 'Found Item Report'}
            </span>

            {isResolved && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Resolved & Closed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors border border-transparent hover:border-navy-700"
              title="Copy page link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors border border-transparent hover:border-navy-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Visual & Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="relative rounded-2xl overflow-hidden bg-navy-950 border border-navy-800 max-h-80 flex items-center justify-center">
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'}
                alt={item.title}
                className="w-full h-full object-cover max-h-80"
              />
            </div>

            {/* Core Info */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-navy-800 text-brand-purple-light border border-navy-700">
                  {item.category}
                </span>

                <h2 className="text-2xl font-black text-white mt-2 leading-tight">
                  {item.title}
                </h2>

                <div className="mt-4 space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-purple-light flex-shrink-0" />
                    <span><strong className="text-white">Campus Location:</strong> {item.location}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span><strong className="text-white">Date Reported:</strong> {item.date}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span><strong className="text-white">Posted By:</strong> {item.user_name || 'Campus Member'}</span>
                  </div>
                </div>
              </div>

              {/* Safety notice */}
              <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800 flex items-start gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Safety Tip:</strong> Meet in high-traffic campus zones (e.g. Student Center, Main Library Helpdesk) or the Campus Security Office when returning or claiming items.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Item Description</h4>
            <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {item.description}
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-indigo-950/40 border border-navy-700/80 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-purple-light" />
              Contact & Claim Instructions
            </h4>
            <p className="text-xs text-slate-300">
              {item.contact_info ? item.contact_info : `Reach out to the reporter at ${item.user_email || 'campus lost & found desk'}.`}
            </p>
            {item.user_email && (
              <a
                href={`mailto:${item.user_email}?subject=Regarding your CampusFind post: ${encodeURIComponent(item.title)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-purple hover:bg-brand-purple-dark text-white shadow-glow-purple transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Reporter Directly
              </a>
            )}
          </div>

          {/* Owner Exclusive Controls */}
          {isOwner && (
            <div className="pt-4 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3 bg-navy-950/40 p-4 rounded-2xl border">
              <div>
                <p className="text-xs font-bold text-white">Post Management (You are the author)</p>
                <p className="text-[11px] text-slate-400">Update item status, modify details, or remove the post once resolved.</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleResolveClick}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    isResolved 
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20' 
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isResolved ? 'Mark as Active' : 'Mark as Resolved'}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onEdit(item);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-brand-purple-light" />
                  Edit Post
                </button>

                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    deleteConfirm
                      ? 'bg-rose-600 text-white shadow-lg animate-pulse'
                      : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? 'Deleting...' : deleteConfirm ? 'Confirm Delete?' : 'Delete'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
