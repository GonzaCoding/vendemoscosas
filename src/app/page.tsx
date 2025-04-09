import { Header } from '@/components/Header';
import { Container } from '@/components/Container';

export default function Home() {
  return (
    <main className='flex-1'>
      <Header />
      <Container>
        <div className='py-8'>
          <h1 className='text-3xl font-bold mb-6'>Welcome to Vendemos Cosas</h1>
          <p className='text-muted-foreground'>
            Browse our collection of items for sale.
          </p>
        </div>
      </Container>
    </main>
  );
}
