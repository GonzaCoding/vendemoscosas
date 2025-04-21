/**
 * Product interface representing a single item in the store
 */
export interface Product {
  id: string; // e.g. '001', '002', '003'
  title: string;
  price: number;
  description: string;
  category: string;
  sold: boolean;
  imageCount: number; // Number of images available for this product
  lateDeliver?: boolean; // Optional flag for products with late delivery
}

/**
 * Cart item type representing a product in the cart
 */
export interface CartItem {
  id: string;
  title: string;
  price: number;
  sold: boolean;
}

/**
 * Cart state interface for managing the shopping cart
 */
export interface Cart {
  items: CartItem[];
}

/**
 * Category type representing product categories with count
 */
export interface Category {
  name: string;
  count: number;
}

/**
 * Filter state interface for managing product filters
 */
export interface FilterState {
  searchQuery: string;
  selectedCategory: Category | null;
  sortOrder: 'asc' | 'desc' | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSortOrder: (order: 'asc' | 'desc' | null) => void;
  clearFilters: () => void;
  categories: Category[];
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

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  total: number;
}
