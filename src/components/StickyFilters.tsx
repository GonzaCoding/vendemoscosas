'use client';

import { useEffect, useState } from 'react';
import { CategoryDropdown } from './CategoryDropdown';
import { SortDropdown } from './SortDropdown';

export function StickyFilters() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        const searchSectionRect = searchSection.getBoundingClientRect();
        // Show sticky badges when search section is 50px from the top
        setIsVisible(searchSectionRect.top < 50);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className='sticky top-16 z-40 w-full px-4 pb-2 sm:px-6 lg:px-8'>
      <div className='container flex justify-center gap-2'>
        <CategoryDropdown />
        <SortDropdown />
      </div>
    </div>
  );
}
