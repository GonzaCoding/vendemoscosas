import type { Product, Category } from '@/types/types';

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
 * Extracts unique categories from products array with their counts
 */
export function getCategories(products: Product[]): Category[] {
  const categoryMap = new Map<string, number>();

  products.forEach((product) => {
    if (!product.sold) {
      const count = categoryMap.get(product.category) || 0;
      categoryMap.set(product.category, count + 1);
    }
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));
}

/**
 * Filters products based on search query and category
 */
export function filterProducts(
  products: Product[],
  searchQuery: string,
  selectedCategory: string | null,
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
 * Gets the image path for a product
 * @param productId The product ID (e.g. '001')
 * @param imageNumber The image number (e.g. 1, 2, 3)
 * @returns The path to the image
 */
export function getProductImagePath(
  productId: string,
  imageNumber: number
): string {
  return `/${productId}/${imageNumber.toString().padStart(2, '0')}.jpeg`;
}

/**
 * Gets all available images for a product
 * @param productId The product ID (e.g. '001')
 * @param imageCount The number of images available for the product
 * @returns Array of image paths
 */
export function getProductImages(
  productId: string,
  imageCount: number
): string[] {
  return Array.from({ length: imageCount }, (_, i) =>
    getProductImagePath(productId, i + 1)
  );
}

/**
 * Gets the primary image for a product
 */
export function getPrimaryImage(productId: string): string {
  return getProductImagePath(productId, 1);
}
