'use client';

import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { ProductList } from '@/components/ProductList';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { products, isLoading, error } = useProducts();

  const handleAddToCart = (product: any) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  };

  return (
    <main className='flex-1'>
      <Header />
      <Container>
        <div className='py-8'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to Vendemos Cosas</h1>
          <p className='text-muted-foreground mb-8'>
            Browse our collection of items for sale.
          </p>
          <ProductList
            products={products}
            isLoading={isLoading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        </div>
      </Container>
    </main>
  );
}
