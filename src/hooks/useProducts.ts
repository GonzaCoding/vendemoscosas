import { useState, useEffect } from 'react';
import type { Product } from '@/types/types';

export function useProducts(): {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
  getAvailableProducts: () => Product[];
} {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getAvailableProducts = () => {
    return products.filter((product) => !product.sold);
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getAvailableProducts,
  };
}
