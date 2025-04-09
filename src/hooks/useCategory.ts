import { useState, useMemo } from 'react';
import type { Product } from '@/types/types';

export function useCategory(products: Product[]): {
  categories: { name: string; count: number }[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  resetCategory: () => void;
  filteredProducts: Product[];
} {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();

    products.forEach((product) => {
      if (!product.sold) {
        const count = categoryMap.get(product.category) || 0;
        categoryMap.set(product.category, count + 1);
      }
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const resetCategory = () => setSelectedCategory(null);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    resetCategory,
    filteredProducts,
  };
}
