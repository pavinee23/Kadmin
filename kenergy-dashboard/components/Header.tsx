"use client";

import { Search, Bell, RefreshCw, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSite } from "@/lib/SiteContext";
import { useLocale, localeData } from "@/lib/LocaleContext";
import { useState, useRef, useEffect } from "react";
import CountryFlag from "./CountryFlag";

export default function Header() {
  const { selectedSite } = useSite();
  const { locale, setLocale } = useLocale();
  const [showLocaleMenu, setShowLocaleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const siteDisplayName = selectedSite === "thailand" ? "Thailand" : "Republic of Korea";
  
  // Map locale to country for flag display
  const localeToCountry = {
    en: "uk" as const,
    th: "thailand" as const,
    ko: "korea" as const,
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLocaleMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/AMqDpBqx0RHlW36D/kenergysave-logo-m6L2JxknygHwL0Bj.png"
              alt="K Energy Save Co., Ltd."
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Current Site Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 rounded-lg">
            <CountryFlag country={selectedSite} size="md" />
            <span className="text-sm font-semibold text-primary">{siteDisplayName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Language Selector */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowLocaleMenu(!showLocaleMenu)}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
            >
              <CountryFlag country={localeToCountry[locale]} size="md" />
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Language Dropdown Menu */}
            {showLocaleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {(Object.keys(localeData) as Array<keyof typeof localeData>).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setLocale(key);
                      setShowLocaleMenu(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition ${
                      locale === key ? "bg-primary/10" : ""
                    }`}
                  >
                    <CountryFlag country={localeToCountry[key]} size="md" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-800">{localeData[key].name}</p>
                      <p className="text-xs text-gray-500">{localeData[key].code}</p>
                    </div>
                    {locale === key && (
                      <span className="text-primary text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Refresh */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <Image
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/AMqDpBqx0RHlW36D/kenergysave-logo-m6L2JxknygHwL0Bj.png"
                alt="K Energy Save"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">K Energy Save Co., Ltd.</p>
              <p className="text-xs text-gray-600">info@kenergy-save.com</p>
              <p className="text-xs text-primary font-medium">group of Zera</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
