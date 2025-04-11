'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useFilter } from '@/contexts/FilterContext';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

export function SearchInput() {
  const { setSearchQuery } = useFilter();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div className='relative w-full'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Buscar...'
        className='pl-8'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
