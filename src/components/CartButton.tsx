'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function CartButton() {
  const { items } = useCart();
  const router = useRouter();

  if (items.length === 0) return null;

  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative'
      onClick={() => router.push('/checkout')}
    >
      <ShoppingCart className='h-5 w-5' />
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Badge
            variant='secondary'
            className='absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center'
          >
            {items.length}
          </Badge>
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
