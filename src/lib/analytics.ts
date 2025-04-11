// Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

// Track product view
export const trackProductView = (
  productId: string,
  productName: string,
  price: number
) => {
  if (typeof window === 'undefined') return;

  window.gtag('event', 'view_item', {
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
      },
    ],
  });
};

// Track add to cart
export const trackAddToCart = (
  productId: string,
  productName: string,
  price: number
) => {
  if (typeof window === 'undefined') return;

  window.gtag('event', 'add_to_cart', {
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
      },
    ],
  });
};
