'use client';

import { useEffect, useState } from 'react';
import { CategoryBadges } from './CategoryBadges';

export function StickyCategoryBadges() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        const searchSectionRect = searchSection.getBoundingClientRect();
        // Show sticky badges when search section is 100px from the top
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
    <div className='sticky top-16 z-40 w-full py-2'>
      <div className='container'>
        <CategoryBadges />
      </div>
    </div>
  );
}
