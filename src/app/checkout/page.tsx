'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { ProductDrawer } from '@/components/ProductDrawer';
import type { Product, CartItem } from '@/types/types';
import { loadProducts } from '@/lib/product-utils';

function CartHeader() {
  const router = useRouter();

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background border-b p-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Tu Carrito 🛒</h1>
          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <Button variant='outline' onClick={() => router.back()}>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Volver
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function CheckoutPage() {
  const { items, removeItem } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await loadProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    fetchProducts();
  }, []);

  const availableItems = items.filter((item) => !item.sold);
  const total = availableItems.reduce((sum, item) => sum + item.price, 0);

  const generateWhatsAppMessage = () => {
    const message = `Hello! I'm interested in:\n${availableItems
      .map((item) => `- ${item.title} – $${item.price}`)
      .join('\n')}\nTotal: $${total}`;
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const message = generateWhatsAppMessage();
    // Replace with your actual WhatsApp number (remove any spaces, dashes, or parentheses)
    const phoneNumber = '+541159458254';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setShowConfirmation(false);
  };

  const handleItemClick = (cartItem: CartItem) => {
    const fullProduct = allProducts.find((p) => p.id === cartItem.id);
    if (fullProduct) {
      setSelectedProduct(fullProduct);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <CartHeader />

      <main className='flex-1 pt-16 pb-32'>
        <div className='container mx-auto p-4'>
          {items.length === 0 ? (
            <p className='text-muted-foreground'>Tu carrito está vacío 🗑️</p>
          ) : (
            <div className='space-y-4'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors'
                  onClick={() => handleItemClick(item)}
                >
                  <div>
                    <h3 className='font-medium'>{item.title}</h3>
                    <p className='text-muted-foreground'>${item.price}</p>
                    {item.sold && (
                      <span className='text-sm text-destructive'>Sold</span>
                    )}
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    disabled={item.sold}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className='fixed bottom-0 left-0 right-0 bg-background border-t p-4'>
        <div className='container mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-lg font-medium'>Total</span>
            <span className='text-2xl font-bold'>${total}</span>
          </div>

          {availableItems.length > 0 ? (
            <Button
              className='w-full bg-[#25D366] hover:bg-[#25D366]/90 text-black border-2 border-black/10'
              onClick={handleCheckout}
            >
              Contactanos por WhatsApp
              <Image
                src='/whatsapp.svg'
                alt='WhatsApp'
                width={16}
                height={16}
                className='ml-2'
              />
            </Button>
          ) : (
            <Button className='w-full' disabled>
              No hay items elegidos
            </Button>
          )}
        </div>
      </footer>

      <ProductDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready para contactarnos?</AlertDialogTitle>
            <AlertDialogDescription>
              Se va a enviar el detalle de la compra a nuestro WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Continuar a WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
