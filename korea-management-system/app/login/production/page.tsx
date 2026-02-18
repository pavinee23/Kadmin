'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CompanyLogo from '@/components/CompanyLogo';
import CountryFlag from '@/components/CountryFlag';

export default function ProductionLoginPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in production, use proper auth)
    if (credentials.username && credentials.password) {
      // Redirect to production dashboard
      router.push('/production/dashboard');
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Language Switcher - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-orange-600 hover:text-orange-800 flex items-center gap-2"
        >
          ← {t.back}
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Company Logo */}
            <div className="flex justify-center mb-4">
              <CompanyLogo size="2xl" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-lg font-bold text-gray-900">{t.companyName}</h1>
              <CountryFlag country="KR" size="sm" />
            </div>
            {/* Department Info */}
            <div className="flex items-center justify-center gap-2 my-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🏭</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {t.productionDepartment}
            </h2>
            <p className="text-gray-600 text-sm">
              {t.productionDepartmentDesc}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'ko' ? '사용자명' : 'Username'}
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder={locale === 'ko' ? '사용자명을 입력하세요' : 'Enter username'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'ko' ? '비밀번호' : 'Password'}
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder={locale === 'ko' ? '비밀번호를 입력하세요' : 'Enter password'}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {locale === 'ko' ? '로그인' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
