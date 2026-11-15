import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useItems } from '../context/ItemContext';

const CATEGORIES = [
  'Electronics',
  'ID & Cards',
  'Keys',
  'Books & Stationery',
  'Bags & Wallets',
  'Clothing & Accessories',
  'Other'
];

const LOCATIONS = [
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

export default function EditItemModal({ item, onClose, onUpdated }) {
  const { updateItem } = useItems();
  
  const [formData, setFormData] = useState({
    title: item.title || '',
    description: item.description || '',
    category: item.category || 'Electronics',
    location: item.location || 'Central Library',
    date: item.date || new Date().toISOString().split('T')[0],
    item_type: item.item_type || 'lost',
    status: item.status || 'active',
    contact_info: item.contact_info || '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(item.image_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateItem(item.id, formData, imageFile);
      onUpdated && onUpdated();
      onClose();
    } catch (err) {
      console.error('Failed to update item:', err);
      setError(err.message || 'Failed to update item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-navy-900 border border-navy-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800 bg-navy-950/40">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Edit Item Post
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Item Type & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, item_type: 'lost' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    formData.item_type === 'lost'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-navy-950 text-slate-400 border-navy-800 hover:bg-navy-800'
                  }`}
                >
                  Lost Item
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, item_type: 'found' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    formData.item_type === 'found'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-navy-950 text-slate-400 border-navy-800 hover:bg-navy-800'
                  }`}
                >
                  Found Item
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
              >
                <option value="active">Active (Still searching / uncollected)</option>
                <option value="resolved">Resolved (Returned / Case closed)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Item Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full glass-input py-2.5 px-3.5 rounded-xl text-sm"
              placeholder="e.g. Space Gray MacBook Air with stickers"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Campus Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Incident Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Contact Info
              </label>
              <input
                type="text"
                value={formData.contact_info}
                onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                placeholder="Phone or preferred contact"
                className="w-full glass-input py-2.5 px-3.5 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full glass-input py-2.5 px-3.5 rounded-xl text-xs leading-relaxed"
              placeholder="Provide distinctive features, color, brand, condition, where exactly it was seen..."
            />
          </div>

          {/* Image Update */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Update Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              {previewUrl && (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-navy-700 bg-navy-950 flex-shrink-0">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-navy-700 hover:border-brand-purple/50 bg-navy-950/50 hover:bg-navy-950 text-xs text-slate-300 transition-colors">
                <Upload className="w-4 h-4 text-brand-purple-light" />
                <span>Choose new image file</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-navy-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-brand-purple-dark hover:to-indigo-700 text-white shadow-glow-purple flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
