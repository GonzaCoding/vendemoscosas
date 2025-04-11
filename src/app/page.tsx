'use client';

import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { ProductList } from '@/components/ProductList';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types/types';
import { SearchInput } from '@/components/SearchInput';
import { FilterProvider } from '@/contexts/FilterContext';
import { CategoryBadges } from '@/components/CategoryBadges';

export default function Home() {
  const { products, isLoading, error } = useProducts();
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      sold: product.sold,
    });
  };

  return (
    <FilterProvider>
      <main className='flex-1'>
        <Header />
        <Container>
          <div className='py-4'>
            <h1 className='text-2xl font-bold mb-2'>Hola! 👋</h1>
            <p className='text-muted-foreground mb-2'>
              Somos Gonza y Maru ❤️ y estamos vendiendo cosas que no usamos.
              <br />
              Para nuestros amigos y conocidos podemos arreglar facilidades de
              pago.
              <br />
              Agregá todo lo que te gusta al carrito 🛒 y contactanos para
              coordinar ☎️.
            </p>
            <div id='search-section' className='space-y-4 mb-8'>
              <CategoryBadges />
              <SearchInput />
            </div>
            <ProductList
              products={products}
              isLoading={isLoading}
              error={error}
              onAddToCart={handleAddToCart}
            />
          </div>
        </Container>
      </main>
    </FilterProvider>
  );
}
