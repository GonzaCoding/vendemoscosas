'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/types';

interface ProductDrawerProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDrawer({ product, onClose }: ProductDrawerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, isInCart } = useCart();

  if (!product) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      sold: product.sold,
    });
    onClose();
  };

  return (
    <Drawer open={!!product} onOpenChange={onClose}>
      <DrawerContent className='h-[90vh]'>
        <div className='flex flex-col h-full'>
          <DrawerHeader className='flex-none'>
            <div className='flex items-center justify-between'>
              <DrawerTitle>{product.title}</DrawerTitle>
              <Button variant='ghost' size='icon' onClick={onClose}>
                <X className='h-4 w-4' />
              </Button>
            </div>
          </DrawerHeader>

          <div className='flex-1 overflow-y-auto'>
            {/* Image Carousel */}
            <div className='relative aspect-square w-full'>
              <Image
                src={product.images[currentImageIndex]}
                alt={product.title}
                fill
                className='object-cover'
                priority
              />

              {/* Navigation Buttons */}
              {product.images.length > 1 && (
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

            {/* Product Details */}
            <div className='p-4 space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold'>${product.price}</span>
                {product.sold && (
                  <span className='text-sm text-muted-foreground'>Sold</span>
                )}
              </div>

              <p className='text-muted-foreground'>{product.description}</p>

              <div className='flex items-center gap-2'>
                <span className='text-sm text-muted-foreground'>Category:</span>
                <span className='text-sm font-medium'>{product.category}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex-none p-4 border-t'>
            <Button
              className='w-full'
              onClick={handleAddToCart}
              disabled={product.sold || isInCart(product.id)}
            >
              {product.sold
                ? 'Sold'
                : isInCart(product.id)
                ? 'Added to Cart'
                : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
