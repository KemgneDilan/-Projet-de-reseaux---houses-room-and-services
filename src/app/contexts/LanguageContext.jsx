"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // Always start with 'fr' to match server-side render, avoiding hydration mismatch
  const [lang, setLangState] = useState('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // After mount, read the stored preference
    const savedLang = localStorage.getItem('hrs_lang');
    if (savedLang && ['fr', 'en'].includes(savedLang)) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const changeLanguage = (newLang) => {
    if (['fr', 'en'].includes(newLang)) {
      setLangState(newLang);
      localStorage.setItem('hrs_lang', newLang);
    }
  };

  // During SSR / before mount: always use 'fr' to prevent hydration mismatch
  const activeLang = mounted ? lang : 'fr';

  const t = (key, params = {}) => {
    let str = translations[activeLang]?.[key] || translations['fr']?.[key] || key;
    Object.keys(params).forEach(paramKey => {
      str = str.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
    });
    return str;
  };

  return (
    <LanguageContext.Provider value={{ lang: activeLang, changeLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
