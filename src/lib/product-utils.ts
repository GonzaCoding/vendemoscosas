import { Product, Category } from '@/types/types';

/**
 * Creates a custom error for product-related issues
 */
export const createProductError = (message: string): Error => {
  const error = new Error(message);
  error.name = 'ProductError';
  return error;
};

/**
 * Loads and validates product data from the JSON file
 * @returns Promise containing the array of products
 * @throws ProductError if data is invalid or cannot be loaded
 */
export async function loadProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) {
      throw createProductError('Failed to load products data');
    }

    const data = await response.json();

    // Validate the data structure
    if (!Array.isArray(data)) {
      throw createProductError('Products data must be an array');
    }

    // Validate each product
    const validatedProducts = data.map((product: unknown, index: number) => {
      if (!isValidProduct(product)) {
        throw createProductError(`Invalid product at index ${index}`);
      }
      return product;
    });

    return validatedProducts;
  } catch (error) {
    if (error instanceof Error && error.name === 'ProductError') {
      throw error;
    }
    throw createProductError(
      'An unexpected error occurred while loading products'
    );
  }
}

/**
 * Type guard to validate if an unknown object matches the Product interface
 */
function isValidProduct(product: unknown): product is Product {
  if (typeof product !== 'object' || product === null) {
    return false;
  }

  const potentialProduct = product as Record<string, unknown>;

  return (
    typeof potentialProduct.id === 'string' &&
    typeof potentialProduct.title === 'string' &&
    typeof potentialProduct.price === 'number' &&
    typeof potentialProduct.description === 'string' &&
    typeof potentialProduct.category === 'string' &&
    typeof potentialProduct.sold === 'boolean' &&
    Array.isArray(potentialProduct.images) &&
    potentialProduct.images.every((img: unknown) => typeof img === 'string')
  );
}

/**
 * Extracts unique categories from products array
 */
export function getCategories(products: Product[]): Category[] {
  const categories = new Set<Category>();
  products.forEach((product) => categories.add(product.category));
  return Array.from(categories).sort();
}

/**
 * Filters products based on search query and category
 */
export function filterProducts(
  products: Product[],
  searchQuery: string,
  selectedCategory: Category | null,
  includeSold: boolean = false
): Product[] {
  return products.filter((product) => {
    // Skip sold products unless explicitly included
    if (!includeSold && product.sold) return false;

    // Filter by category if selected
    if (selectedCategory && product.category !== selectedCategory) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return true;
  });
}

/**
 * Validates if an image path exists and is in the correct format
 */
export function isValidImagePath(path: string): boolean {
  // Check if path starts with /images/ and ends with .jpg
  if (!path.startsWith('/images/') || !path.endsWith('.jpg')) {
    return false;
  }

  // Check if path follows the format: /images/product-{id}-{index}.jpg
  const parts = path.split('/').pop()?.split('-');
  if (!parts || parts.length !== 3) return false;

  const [prefix, id, index] = parts;
  if (prefix !== 'product') return false;

  // Check if id and index are valid numbers
  const indexNum = parseInt(index.replace('.jpg', ''));
  return !isNaN(parseInt(id)) && !isNaN(indexNum);
}

/**
 * Gets the first valid image path from a product's images array
 * Falls back to a placeholder image if no valid images are found
 */
export function getPrimaryImage(product: Product): string {
  const validImage = product.images.find(isValidImagePath);
  return validImage || '/images/placeholder.jpg';
}
