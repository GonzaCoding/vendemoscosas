/**
 * Formats a price in Spanish format (using dots as thousand separators and no decimals)
 * @param price The price to format
 * @returns The formatted price string
 */
export function formatPrice(price: number): string {
  return `$ ${price.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
