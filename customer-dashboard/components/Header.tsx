'use client';

import { Bell, Search, User, Globe, ChevronDown } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { translations } from '@/translations';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { locale, setLocale } = useLocale();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[locale];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'th' as const, name: 'ไทย', flag: '🇹🇭' },
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'ko' as const, name: '한국어', flag: '🇰🇷' },
    { code: 'vi' as const, name: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between pl-12 lg:pl-0">
        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`${t.search} ${t.searchOrders}`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden">
          <h2 className="font-bold text-gray-800">Customer Dashboard</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-2 px-2 md:px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
              <span className="text-lg sm:hidden">{currentLang.flag}</span>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:inline" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                      locale === lang.code ? 'bg-primary/10 text-primary' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                    {locale === lang.code && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-gray-200">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">customer@example.com</div>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
