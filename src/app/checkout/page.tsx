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

export default function CheckoutPage() {
  const { items, removeItem } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

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
    window.open(`https://wa.me/?text=${message}`, '_blank');
    setShowConfirmation(false);
  };

  if (items.length === 0) {
    return (
      <div className='container mx-auto p-4'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>Your Cart</h1>
          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <Button variant='outline' onClick={() => router.back()}>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back
            </Button>
          </div>
        </div>
        <p className='text-muted-foreground'>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Your Cart</h1>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Button variant='outline' onClick={() => router.back()}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
        </div>
      </div>

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

      <div className='mt-6 border-t pt-4'>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-lg font-medium'>Total</span>
          <span className='text-2xl font-bold'>${total}</span>
        </div>

        {availableItems.length > 0 ? (
          <Button
            className='w-full bg-[#25D366] hover:bg-[#25D366]/90 text-black border-2 border-black/10'
            onClick={handleCheckout}
          >
            Checkout via WhatsApp
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
