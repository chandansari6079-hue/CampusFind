import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, GraduationCap, Building, Phone, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup({ setCurrentPage }) {
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    department: 'Computer Science & Engineering',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signUp({
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        studentId: formData.studentId.trim(),
        department: formData.department,
        phone: formData.phone.trim(),
      });

      setRegisteredSuccess(true);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create student account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-navy-800 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-indigo-500 p-0.5 mx-auto shadow-glow-purple">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-brand-purple-light" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Create Student Account</h1>
          <p className="text-xs text-slate-400">Join the campus lost & found network with your student credentials</p>
        </div>

        {registeredSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Registration Successful!</h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Your student profile is now configured. If your Supabase instance requires email verification, check your inbox to confirm your address, or sign in below.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('login')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-white text-navy-950 hover:bg-slate-100 transition-colors shadow-md"
            >
              Proceed to Sign In
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Student ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Jordan Hayes"
                      className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Student ID Number
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="e.g. STU-2024-4190"
                      className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Department & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Campus Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full glass-input py-2.5 px-3 rounded-xl text-xs font-medium"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Business & Finance">Business & Finance</option>
                    <option value="Biological & Health Sciences">Biological & Health Sciences</option>
                    <option value="Arts, Humanities & Design">Arts, Humanities & Design</option>
                    <option value="Physical Sciences & Math">Physical Sciences & Math</option>
                    <option value="Faculty / Campus Staff">Faculty / Campus Staff</option>
                    <option value="Other Department">Other Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Contact Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Campus Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Campus Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@campus.edu"
                    className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      className="w-full glass-input pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Re-type password"
                      className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-brand-purple-dark hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-glow-purple flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Creating Account in Supabase...' : 'Complete Registration'}
              </button>
            </form>

            {/* Footer */}
            <div className="pt-2 text-center text-xs text-slate-400 border-t border-navy-800">
              <span>Already registered? </span>
              <button
                onClick={() => setCurrentPage('login')}
                className="font-bold text-brand-purple-light hover:underline"
              >
                Sign In to Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
