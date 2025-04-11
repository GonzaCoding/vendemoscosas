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
import { trackAddToCart } from '@/lib/analytics';

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
      trackAddToCart(product.id, product.title, product.price);
    }
  };

  return (
    <Drawer open={!!product} onOpenChange={onClose} direction='right'>
      <DrawerContent className='h-screen max-w-3xl mx-auto border-l border-border bg-background/95 transition-all duration-300 ease-in-out'>
        <div className='flex flex-col h-full'>
          <DrawerHeader className='flex-none border-b transition-colors duration-300'>
            <div className='flex items-center justify-between'>
              <DrawerTitle className='transition-colors duration-300'>
                {product.title}
              </DrawerTitle>
              <Button
                variant='ghost'
                size='icon'
                onClick={onClose}
                className='transition-colors duration-300 hover:bg-muted'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </DrawerHeader>

          <div className='flex-1 overflow-y-auto'>
            {/* Image Carousel */}
            <div className='relative w-full flex justify-center items-center bg-muted/20 transition-colors duration-300'>
              <div className='relative w-full max-w-2xl h-[350px]'>
                {isImageLoading && (
                  <Skeleton className='w-full h-full animate-pulse' />
                )}
                <Image
                  src={getProductImagePath(product.id, currentImageIndex + 1)}
                  alt={product.title}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    isImageLoading
                      ? 'opacity-0 scale-95'
                      : 'opacity-100 scale-100'
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
                      className='absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 transition-colors duration-300'
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 transition-colors duration-300'
                      onClick={handleNextImage}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className='p-4 space-y-4 transition-colors duration-300'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold transition-colors duration-300'>
                  ${product.price}
                </span>
                {product.sold && (
                  <span className='text-sm text-muted-foreground transition-colors duration-300'>
                    Sold
                  </span>
                )}
              </div>

              <p className='text-muted-foreground transition-colors duration-300'>
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex-none p-4 border-t transition-colors duration-300'>
            <Button
              className='w-full transition-all duration-300 hover:scale-[1.02]'
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
