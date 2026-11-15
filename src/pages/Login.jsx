import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Sparkles, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ setCurrentPage }) {
  const { signIn, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signIn({ email: email.trim(), password });
      setCurrentPage('dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail('marcus.wright@campus.edu');
    setPassword('CampusFind2026!');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 animate-fade-in">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-navy-800 shadow-2xl space-y-6">
        {/* Brand / Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-indigo-500 p-0.5 mx-auto shadow-glow-purple">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <LogIn className="w-6 h-6 text-brand-purple-light" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Sign In</h1>
          <p className="text-xs text-slate-400">Access your CampusFind dashboard and report listings</p>
        </div>

        {/* Demo Fast Fill button */}
        <button
          type="button"
          onClick={fillDemoAccount}
          className="w-full p-2.5 rounded-xl bg-brand-purple/10 border border-brand-purple/30 hover:bg-brand-purple/20 text-brand-purple-light text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-fill Demo Student Credentials</span>
        </button>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Campus Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu"
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-brand-purple-dark hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-glow-purple flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Authenticating...' : 'Sign In to CampusFind'}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-slate-400 border-t border-navy-800">
          <span>New to CampusFind? </span>
          <button
            onClick={() => setCurrentPage('signup')}
            className="font-bold text-brand-purple-light hover:underline inline-flex items-center gap-1"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
