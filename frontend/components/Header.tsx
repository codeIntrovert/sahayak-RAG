'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo/Brand */}
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
            Sahayak
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md transition-all"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>

          {/* Create Job Button */}
          <Link
            href="/jobs/create"
            className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-sm hover:shadow-md transition-all"
          >
            + Create Job
          </Link>

          {/* My Profile Button */}
          <Link
            href="/profile"
            className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-sm hover:shadow-md transition-all"
          >
            My Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
