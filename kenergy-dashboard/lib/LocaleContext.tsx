"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, TranslationKey } from "./translations";

type Locale = "en" | "th" | "ko";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export const localeData = {
  en: { code: "EN", name: "English", flag: "🇬🇧" },
  th: { code: "TH", name: "ไทย", flag: "🇹🇭" },
  ko: { code: "KO", name: "한국어", flag: "🇰🇷" },
};
