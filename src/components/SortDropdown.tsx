'use client';

import { useFilter } from '@/contexts/FilterContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowDown, ArrowUp } from 'lucide-react';

export function SortDropdown() {
  const { sortOrder, setSortOrder } = useFilter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          {sortOrder === 'asc' ? (
            <>
              <span>$</span>
              <ArrowDown className='h-4 w-4' />
            </>
          ) : sortOrder === 'desc' ? (
            <>
              <span>$</span>
              <ArrowUp className='h-4 w-4' />
            </>
          ) : (
            'Ordenar'
          )}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuItem
          onClick={() => setSortOrder(null)}
          className={!sortOrder ? 'bg-accent' : ''}
        >
          Sin orden
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSortOrder('asc')}
          className={sortOrder === 'asc' ? 'bg-accent' : ''}
        >
          Precio: Menor a Mayor
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSortOrder('desc')}
          className={sortOrder === 'desc' ? 'bg-accent' : ''}
        >
          Precio: Mayor a Menor
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
