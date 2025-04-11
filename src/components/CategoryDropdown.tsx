'use client';

import { useFilter } from '@/contexts/FilterContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function CategoryDropdown() {
  const { selectedCategory, categories, setSelectedCategory } = useFilter();

  // Sort categories by count in descending order
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          {selectedCategory ? selectedCategory.name : 'Categorias'}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuItem
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? 'bg-accent' : ''}
        >
          Todos
        </DropdownMenuItem>
        {sortedCategories.map((category) => (
          <DropdownMenuItem
            key={category.name}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory?.name === category.name ? 'bg-accent' : ''
            }
          >
            {category.name} ({category.count})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
