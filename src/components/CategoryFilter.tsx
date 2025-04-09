'use client';

import { useFilter } from '@/contexts/FilterContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory, categories } = useFilter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-full sm:w-auto'>
          {selectedCategory?.name || 'All Categories'}
          <ChevronDown className='ml-2 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
          All Categories
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.name}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name} ({category.count})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
