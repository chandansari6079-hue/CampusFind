import React, { useState } from 'react';
import { 
  PlusCircle, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X, 
  Loader2,
  ShieldCheck,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import confetti from 'canvas-confetti';

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

export default function AddItem({ setCurrentPage, onSelectItem }) {
  const { user } = useAuth();
  const { addItem } = useItems();

  const [itemType, setItemType] = useState('lost'); // 'lost' | 'found'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [location, setLocation] = useState('Central Library');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [contactInfo, setContactInfo] = useState(user?.email || '');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successItem, setSuccessItem] = useState(null);

  const handleImageSelect = (file) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setError('Image file size must be less than 8MB.');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please provide a title and detailed description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const itemData = {
        title: title.trim(),
        description: description.trim(),
        category,
        location,
        date,
        item_type: itemType,
        contact_info: contactInfo.trim(),
      };

      const created = await addItem(itemData, imageFile);
      
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
        });
      } catch (cErr) {
        // ignore
      }

      setSuccessItem(created);
    } catch (err) {
      console.error('Failed to post item:', err);
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-purple-light">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Campus Portal Submission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Report an Item
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Broadcast your lost or discovered belonging across the entire campus student network.
        </p>
      </div>

      {/* Success Banner / Card */}
      {successItem ? (
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-emerald-500/40 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Item Reported Successfully!</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your {successItem.item_type === 'lost' ? 'lost' : 'found'} report for{' '}
              <strong className="text-white">"{successItem.title}"</strong> is now live on the campus portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                if (onSelectItem) onSelectItem(successItem);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 transition-colors"
            >
              View Report Details
            </button>
            <button
              onClick={() => setCurrentPage(successItem.item_type === 'lost' ? 'lost' : 'found')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-purple hover:bg-brand-purple-dark text-white transition-colors shadow-glow-purple"
            >
              Go to {successItem.item_type === 'lost' ? 'Lost' : 'Found'} Items Board
            </button>
            <button
              onClick={() => {
                setSuccessItem(null);
                setTitle('');
                setDescription('');
                setImageFile(null);
                setImagePreview(null);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Post Another Item
            </button>
          </div>
        </div>
      ) : (
        /* Report Form */
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-navy-800 space-y-8 shadow-2xl">
          {/* Item Type Selector Tab */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select What You Are Reporting *
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setItemType('lost')}
                className={`py-4 px-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2.5 transition-all ${
                  itemType === 'lost'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-lg shadow-rose-500/10'
                    : 'bg-navy-950/60 text-slate-400 border-navy-800 hover:bg-navy-900'
                }`}
              >
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>I Lost Something</span>
              </button>

              <button
                type="button"
                onClick={() => setItemType('found')}
                className={`py-4 px-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2.5 transition-all ${
                  itemType === 'found'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-navy-950/60 text-slate-400 border-navy-800 hover:bg-navy-900'
                }`}
              >
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>I Found Something</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Item Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  itemType === 'lost' 
                    ? 'e.g. Space Gray 13" MacBook Air with Stickers' 
                    : 'e.g. Student ID Card found near Cafeteria cashiers'
                }
                className="w-full glass-input py-3 px-4 rounded-2xl text-sm"
              />
            </div>

            {/* Category & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full glass-input py-3 px-4 rounded-2xl text-xs font-medium"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-navy-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Campus Location *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full glass-input py-3 px-4 rounded-2xl text-xs font-medium"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-navy-900 text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Incident Date & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Date of Incident *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full glass-input py-3 px-4 rounded-2xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Contact Information / Instructions *
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. Email, phone number, or security desk drop-off"
                  className="w-full glass-input py-3 px-4 rounded-2xl text-xs"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe brand, color, distinguishing marks, stickers, case, precise table or room where it was lost or found..."
                className="w-full glass-input py-3 px-4 rounded-2xl text-xs leading-relaxed"
              />
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Item Photo (Recommended for instant recognition)
              </label>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-navy-700 bg-navy-950 max-h-64 flex items-center justify-center group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full max-h-64 object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-navy-950/80 hover:bg-rose-600 text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="p-8 rounded-2xl border-2 border-dashed border-navy-700 hover:border-brand-purple/50 bg-navy-950/50 hover:bg-navy-950 transition-all text-center space-y-3 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-900 border border-navy-800 text-slate-400 group-hover:text-brand-purple-light mx-auto flex items-center justify-center transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Drag & drop an item photo here, or{' '}
                      <label className="text-brand-purple-light underline cursor-pointer hover:text-white">
                        browse files
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageSelect(e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      PNG, JPG, WEBP up to 8MB. Stored securely on Supabase Storage.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Notice */}
            <div className="p-4 rounded-2xl bg-navy-950/70 border border-navy-800/80 flex items-start gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p>
                Your report will be tied to your verified profile ({user?.email || 'Guest Student'}). You can edit, resolve, or delete it anytime from your dashboard.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                itemType === 'lost'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-rose-500/25'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/25'
              } disabled:opacity-50`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading 
                ? 'Submitting to Supabase...' 
                : itemType === 'lost' 
                  ? 'Publish Lost Item Report' 
                  : 'Publish Found Item Record'
              }
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
