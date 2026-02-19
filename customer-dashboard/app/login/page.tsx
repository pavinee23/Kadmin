'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Eye, EyeOff, Zap } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { translations } from '@/translations';

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication delay
    await new Promise((res) => setTimeout(res, 800));

    // Simple demo check — replace with real API call
    if (emailOrUsername && password) {
      localStorage.setItem('cd_auth', '1');
      router.push('/');
    } else {
      setError(t.loginError);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Top banner */}
        <div className="bg-primary px-8 py-10 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Dashboard</h1>
          <p className="text-emerald-100 text-sm mt-1">{t.loginSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 text-center">{t.loginTitle}</h2>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Email / Username */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t.emailOrUsername}
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                {t.password}
              </label>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
              >
                {t.forgotPassword}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-primary rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
              {t.rememberMe}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {t.loginLoading}
              </>
            ) : (
              t.signIn
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
