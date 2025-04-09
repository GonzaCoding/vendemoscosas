import { useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/types/types';
import {
  STORAGE_KEYS,
  getFromStorage,
  setInStorage,
} from '../lib/storage';

const DEFAULT_CART: Cart = {
  items: [],
};

export function useCart() {
  const [cart, setCart] = useState<Cart>(DEFAULT_CART);

  useEffect(() => {
    const savedCart = getFromStorage<Cart>(STORAGE_KEYS.CART, DEFAULT_CART);
    setCart(savedCart);
  }, []);

  const addToCart = (product: Product) => {
    if (product.sold) return;

    const newItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      sold: product.sold,
    };

    const newCart = {
      items: [...cart.items, newItem],
    };

    setCart(newCart);
    setInStorage(STORAGE_KEYS.CART, newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = {
      items: cart.items.filter((item: CartItem) => item.id !== productId),
    };

    setCart(newCart);
    setInStorage(STORAGE_KEYS.CART, newCart);
  };

  const clearCart = () => {
    setCart(DEFAULT_CART);
    setInStorage(STORAGE_KEYS.CART, DEFAULT_CART);
  };

  const getTotal = () => {
    return cart.items.reduce((total: number, item: CartItem) => {
      if (item.sold) return total;
      return total + item.price;
    }, 0);
  };

  const hasItems = cart.items.length > 0;
  const hasOnlySoldItems = cart.items.every((item: CartItem) => item.sold);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
    hasItems,
    hasOnlySoldItems,
  };
}
