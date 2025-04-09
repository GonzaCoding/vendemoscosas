import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (products.length === 0) {
    return (
      <div className='flex h-32 items-center justify-center rounded-lg border border-dashed'>
        <p className='text-center text-sm text-muted-foreground'>
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
