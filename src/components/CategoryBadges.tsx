'use client';

import { useFilter } from '@/contexts/FilterContext';
import { Badge } from '@/components/ui/badge';

export function CategoryBadges() {
  const { selectedCategory, categories, setSelectedCategory } = useFilter();

  // Sort categories by count in descending order
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <div className='flex flex-wrap gap-2'>
      {sortedCategories.map((category) => (
        <Badge
          key={category.name}
          variant={
            selectedCategory?.name === category.name ? 'default' : 'outline'
          }
          className='cursor-pointer bg-white py-[6px]'
          onClick={() => {
            if (selectedCategory?.name === category.name) {
              setSelectedCategory(null);
            } else {
              setSelectedCategory(category);
            }
          }}
        >
          {category.name} ({category.count})
        </Badge>
      ))}
    </div>
  );
}
