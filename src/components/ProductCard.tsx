import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className='group relative flex flex-col overflow-hidden rounded-lg border bg-background'>
      <div className='aspect-square overflow-hidden'>
        <Image
          src={product.images[0]}
          alt={product.title}
          width={500}
          height={500}
          className='h-full w-full object-cover transition-transform group-hover:scale-105'
          priority={false}
        />
      </div>

      <div className='flex flex-1 flex-col space-y-2 p-4'>
        <h3 className='text-lg font-medium'>{product.title}</h3>
        <p className='text-sm text-muted-foreground'>{product.description}</p>
        <div className='mt-auto flex items-center justify-between'>
          <span className='text-lg font-bold'>${product.price}</span>
          <Button
            onClick={() => onAddToCart(product)}
            disabled={product.sold}
            size='sm'
          >
            {product.sold ? 'Sold' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
}
