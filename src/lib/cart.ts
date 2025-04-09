import type { CartItem } from '@/types/types';

export function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(items));
}

export function clearCartFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
}
