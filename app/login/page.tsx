'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import CompanyLogo from '@/components/CompanyLogo';
import CountryFlag from '@/components/CountryFlag';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function MainLoginPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 900));

    if (username && password) {
      localStorage.setItem('kms_auth', '1');
      if (rememberMe) localStorage.setItem('kms_remember', '1');
      router.push('/');
    } else {
      setError(t.loginError);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
      {/* Language Switcher top-right */}
      <div className="fixed top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-sm">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/95 rounded-full w-24 h-24 flex items-center justify-center shadow-md overflow-hidden">
                <CompanyLogo size="2xl" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <h1 className="text-base font-bold">{t.companyName}</h1>
              <CountryFlag country="KR" size="sm" />
            </div>
            <p className="text-blue-100 text-xs mb-2">{t.companySlogan}</p>
            <div className="border-t border-white/20 pt-2">
              <p className="text-xs font-semibold text-white/90">{t.systemName}</p>
              <p className="text-xs text-blue-200">{t.systemNameSub}</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 py-6 space-y-4">
            <h2 className="text-center text-base font-semibold text-gray-800">
              {t.loginButton}
            </h2>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                  {t.username}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder={t.usernamePlaceholder}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                    {t.password}
                  </label>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {t.forgotPassword}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder={t.passwordPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-xs text-gray-700 cursor-pointer">
                  {t.rememberMe}
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    {t.loggingIn}
                  </>
                ) : (
                  t.loginButton
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-3 text-center text-xs text-gray-500">
          {t.loginFooter}
        </p>
      </div>
    </div>
  );
}
