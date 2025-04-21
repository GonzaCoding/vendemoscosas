'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/types';
import { useState } from 'react';
import { ProductDrawer } from './ProductDrawer';
import { getPrimaryImage } from '@/lib/product-utils';
import { useCart } from '@/contexts/CartContext';
import { Plus, Trash2 } from 'lucide-react';
import { trackProductView, trackAddToCart } from '@/lib/analytics';
import { formatPrice } from '@/lib/price-utils';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isInCart, removeItem } = useCart();

  const isProductInCart = isInCart(product.id);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    trackProductView(product.id, product.title, product.price);
  };

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProductInCart) {
      removeItem(product.id);
    } else {
      onAddToCart(product);
      trackAddToCart(product.id, product.title, product.price);
    }
  };

  return (
    <>
      <article
        className='group relative flex flex-col overflow-hidden rounded-lg border bg-background cursor-pointer w-full'
        onClick={handleDrawerOpen}
      >
        <div className='relative w-full h-[250px] bg-muted/20'>
          <Image
            src={getPrimaryImage(product.id)}
            alt={product.title}
            fill
            className='object-contain'
            priority={false}
          />
          {product.lateDeliver && (
            <Badge
              variant='default'
              className='absolute top-2 right-2 bg-green-500 hover:bg-green-600'
            >
              Entrega Agosto
            </Badge>
          )}
        </div>

        <div className='flex flex-1 flex-col space-y-2 p-4'>
          <h3 className='text-lg font-medium'>{product.title}</h3>
          <div className='mt-auto flex items-center justify-between'>
            <span className='text-lg font-bold'>
              {formatPrice(product.price)}
            </span>
            <Button
              onClick={handleCartAction}
              variant={isProductInCart ? 'destructive' : 'default'}
              size='sm'
              disabled={product.sold}
            >
              {product.sold ? (
                'Sold'
              ) : isProductInCart ? (
                <>
                  <Trash2 className='h-4 w-4' />
                  Borrar
                </>
              ) : (
                <>
                  <Plus className='h-4 w-4' />
                  Agregar
                </>
              )}
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
