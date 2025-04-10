'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/types';
import { useState } from 'react';
import { ProductDrawer } from './ProductDrawer';
import { getPrimaryImage } from '@/lib/product-utils';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isInCart } = useCart();

  return (
    <>
      <article
        className='group relative flex flex-col overflow-hidden rounded-lg border bg-background cursor-pointer w-full'
        onClick={() => setIsDrawerOpen(true)}
      >
        <div className='relative w-full h-[250px] bg-muted/20'>
          <Image
            src={getPrimaryImage(product.id)}
            alt={product.title}
            fill
            className='object-contain'
            priority={false}
          />
        </div>

        <div className='flex flex-1 flex-col space-y-2 p-4'>
          <h3 className='text-lg font-medium'>{product.title}</h3>
          <div className='mt-auto flex items-center justify-between'>
            <span className='text-lg font-bold'>${product.price}</span>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={product.sold || isInCart(product.id)}
              size='sm'
            >
              {product.sold
                ? 'Sold'
                : isInCart(product.id)
                ? 'Added to Cart'
                : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </article>

      <ProductDrawer
        product={isDrawerOpen ? product : null}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
