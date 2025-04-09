'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { FilterState, Category } from '@/types/types';
import { useProducts } from '@/hooks/useProducts';

const FilterContext = createContext<FilterState | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach((product) => {
      if (!product.sold) {
        categoryMap.set(
          product.category,
          (categoryMap.get(product.category) || 0) + 1
        );
      }
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        clearFilters,
        categories,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
