'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types/types';
import { getProductImagePath } from '@/lib/product-utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductDrawerProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDrawer({ product, onClose }: ProductDrawerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { addItem, isInCart, removeItem } = useCart();

  if (!product) return null;

  const isProductInCart = isInCart(product.id);

  const handlePrevImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.imageCount - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) =>
      prev === product.imageCount - 1 ? 0 : prev + 1
    );
  };

  const handleCartAction = () => {
    if (isProductInCart) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        sold: product.sold,
      });
    }
  };

  return (
    <Drawer open={!!product} onOpenChange={onClose} direction='right'>
      <DrawerContent className='h-screen max-w-3xl mx-auto border-l border-border bg-background/95'>
        <div className='flex flex-col h-full'>
          <DrawerHeader className='flex-none border-b'>
            <div className='flex items-center justify-between'>
              <DrawerTitle>{product.title}</DrawerTitle>
              <Button variant='ghost' size='icon' onClick={onClose}>
                <X className='h-4 w-4' />
              </Button>
            </div>
          </DrawerHeader>

          <div className='flex-1 overflow-y-auto'>
            {/* Image Carousel */}
            <div className='relative w-full flex justify-center items-center bg-muted/20'>
              <div className='relative w-full max-w-2xl h-[350px]'>
                {isImageLoading && <Skeleton className='w-full h-full' />}
                <Image
                  src={getProductImagePath(product.id, currentImageIndex + 1)}
                  alt={product.title}
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority
                  onLoadingComplete={() => setIsImageLoading(false)}
                />

                {/* Navigation Buttons */}
                {product.imageCount > 1 && (
                  <>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90'
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90'
                      onClick={handleNextImage}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className='p-4 space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold'>${product.price}</span>
                {product.sold && (
                  <span className='text-sm text-muted-foreground'>Sold</span>
                )}
              </div>

              <p className='text-muted-foreground'>{product.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex-none p-4 border-t'>
            <Button
              className='w-full'
              onClick={handleCartAction}
              disabled={product.sold}
              variant={isProductInCart ? 'destructive' : 'default'}
            >
              {product.sold ? (
                'Sold'
              ) : isProductInCart ? (
                <>
                  <Trash2 className='h-4 w-4' />
                  Remove
                </>
              ) : (
                <>
                  <Plus className='h-4 w-4' />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
