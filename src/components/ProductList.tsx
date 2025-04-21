import type { Product } from '@/types/types';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useFilter } from '@/contexts/FilterContext';
import { useMemo } from 'react';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  error?: Error | null;
  onAddToCart: (product: Product) => void;
}

export function ProductList({
  products,
  isLoading,
  error,
  onAddToCart,
}: ProductListProps) {
  const { searchQuery, selectedCategory, sortOrder, categories } = useFilter();

  const filteredProducts = products.filter((product) => {
    if (product.sold) return false;

    const matchesSearch = searchQuery
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory.name
      : true;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    // First sort by category count if no specific sort order is selected
    if (!sortOrder) {
      const categoryCountMap = new Map(
        categories.map((category) => [category.name, category.count])
      );

      // First sort by category count
      sorted.sort((a, b) => {
        const countA = categoryCountMap.get(a.category) || 0;
        const countB = categoryCountMap.get(b.category) || 0;
        return countB - countA; // Descending order
      });

      // Then sort by price within each category
      const categoryGroups = new Map<string, Product[]>();
      sorted.forEach((product) => {
        const group = categoryGroups.get(product.category) || [];
        group.push(product);
        categoryGroups.set(product.category, group);
      });

      // Sort each category group by price descending
      categoryGroups.forEach((group) => {
        group.sort((a, b) => b.price - a.price);
      });

      // Flatten the groups back into a single array
      sorted = Array.from(categoryGroups.values()).flat();
    } else {
      // Then sort by price if a sort order is selected
      sorted.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return sorted;
  }, [filteredProducts, sortOrder, categories]);

  if (error) {
    return (
      <div className='flex h-32 items-center justify-center rounded-lg border border-dashed'>
        <p className='text-center text-sm text-muted-foreground'>
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='flex flex-col space-y-3'>
            <Skeleton className='aspect-square' />
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/3' />
          </div>
        ))}
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className='flex h-32 items-center justify-center rounded-lg border border-dashed'>
        <p className='text-center text-sm text-muted-foreground'>
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
