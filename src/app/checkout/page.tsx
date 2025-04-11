'use client';

import { useState } from 'react';
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

function CartHeader() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between mb-4'>
      <h1 className='text-2xl font-bold'>Tu Carrito 🛒</h1>
      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <Button variant='outline' onClick={() => router.back()}>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Volver
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, removeItem } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  return (
    <div className='container mx-auto p-4 pb-32'>
      <CartHeader />

      {items.length === 0 ? (
        <p className='text-muted-foreground'>Tu carrito está vacío 🗑️</p>
      ) : (
        <>
          <div className='space-y-4'>
            {items.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between p-4 border rounded-lg'
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
                  onClick={() => removeItem(item.id)}
                  disabled={item.sold}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>

          <div className='fixed bottom-0 left-0 right-0 bg-background border-t p-4'>
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
                    src='/icons/whatsapp.svg'
                    alt='WhatsApp'
                    width={16}
                    height={16}
                    className='ml-2'
                  />
                </Button>
              ) : (
                <Button className='w-full' disabled>
                  All items are sold
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to Checkout?</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;re about to contact us on WhatsApp — ready?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Continue to WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
