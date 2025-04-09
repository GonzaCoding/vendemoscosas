/**
 * Product interface representing a single item in the store
 */
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  sold: boolean;
  images: string[];
}

/**
 * Cart item type representing a product in the cart
 */
export type CartItem = Product;

/**
 * Category type representing product categories
 * Generated dynamically from the products.json data
 */
export type Category = string;

/**
 * Cart state interface for managing the shopping cart
 */
export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

/**
 * Filter state interface for managing product filters
 */
export interface FilterState {
  searchQuery: string;
  selectedCategory: Category | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | null) => void;
  clearFilters: () => void;
}

/**
 * Theme type for dark/light mode
 */
export type Theme = 'light' | 'dark';

/**
 * Theme state interface for managing theme preferences
 */
export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Utility type for creating a readonly version of a type
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Utility type for making all properties of a type optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};
