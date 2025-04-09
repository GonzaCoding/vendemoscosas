
# 🛒 Personal E-Commerce (Mobile-First) – Developer Spec

## 📌 Overview

Build a **simple, mobile-first e-commerce site** using **Next.js** and **ShadCN/UI** to sell personal items. Products are listed, browsed, and added to a cart. Checkout is completed via **WhatsApp**. Product data and images are managed manually through local files.

---

## ⚙️ Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: ShadCN/UI (Tailwind + Radix UI)
- **Hosting**: Vercel (with free subdomain)
- **State**: React state + localStorage
- **Image Handling**: Next.js `<Image />` with lazy loading
- **Analytics**: Page views, product clicks, cart actions (planned)

---

## 🧱 Architecture

### Pages & Routes

| Route       | Description                            |
|-------------|----------------------------------------|
| `/`         | Homepage: intro, filters, product list |
| `/checkout` | Review cart + confirm WhatsApp message |

---

### File Structure

```
/app
  /checkout
  /components
  /lib
/public
  /images
    product-1-1.jpg
    product-1-2.jpg
/data
  products.json
```

---

### Component Tree (Simplified)

```
Layout
├── Header
│   ├── Logo / Intro
│   ├── Category Menu
│   └── Cart Button (badge + animation)
├── SearchInput
├── FilterDropdown
├── ProductList
│   └── ProductCard
│       └── ProductDrawer
└── Footer (optional)
```

---

## 📦 Data Handling

### Product JSON Format

Stored in `/data/products.json`

```json
[
  {
    "id": "product-1",
    "title": "Vintage Chair",
    "price": 100,
    "description": "Comfortable and stylish.",
    "category": "Furniture",
    "sold": false,
    "images": [
      "/images/product-1-1.jpg",
      "/images/product-1-2.jpg"
    ]
  }
]
```

- Images stored in `/public/images`
- Filename format: `product-{id}-{index}.jpg`

---

## 🛒 Cart Behavior

- Stored in `localStorage` (per device)
- No quantities (1 per product)
- Only shows **cart button** after adding an item
- Badge count + cart icon animation
- Supports removing items from checkout page
- Drawer + product list both allow "Add to cart"
- Sold products:
  - Hidden from homepage
  - Still show in cart (marked disabled)
  - Excluded from WhatsApp message

---

## 💬 WhatsApp Checkout

- Checkout button on `/checkout`
- Opens confirmation modal:
  > “You’re about to contact us on WhatsApp — ready?”
- WhatsApp message format:

```
Hello! I'm interested in:
- Product 1 – $100
- Product 2 – $200
Total: $300
```

- Uses `encodeURIComponent` to link to WhatsApp

---

## 🔍 UI Features

- **Mobile-first** layout (1 product per row)
- Product card with:
  - Image
  - Title + Price
  - Add button
- Product drawer (right side):
  - Up to 4–5 images (carousel)
  - Full description
  - Add to cart
- Search input:
  - Filters by title and description
  - Works with category dropdown
- **Category menu**:
  - Generated dynamically from JSON
  - Used for menu links + dropdown filter
- **Dark mode**:
  - Toggle switch in header
  - Stored in `localStorage`

---

## 🧪 Testing Plan

### Manual Tests

- ✅ Product JSON loads
- ✅ Images show correctly
- ✅ LocalStorage cart persists
- ✅ Sold items hidden from homepage
- ✅ Sold items disabled in cart
- ✅ WhatsApp message generates as expected
- ✅ Dark/light theme toggles + saves
- ✅ Mobile layout + drawer UX smooth
- ✅ Search + filter work independently and together

### (Optional) Unit Tests

- Product filtering logic
- Cart total + WhatsApp message generation
- LocalStorage utilities

---

## 🚫 Error Handling

- Image load fallback UI
- Defensive check against adding sold products
- Handle missing/malformed product data
- Disable checkout if cart contains only sold items

---

## 🧠 Analytics (Planned)

- Page views
- Product clicks
- Add to cart events
- Checkout initiated

Use lightweight client-side tracking (e.g., Vercel Analytics, Plausible, or custom).

---

## ✅ Hosting & Deployment

- Hosted on **Vercel**
- Uses free `.vercel.app` subdomain
- Product data/images managed via manual file edits
- No authentication required

---

## 📁 Example Product Files

### Image Naming Convention

```
/public/images/product-1-1.jpg
/public/images/product-1-2.jpg
/public/images/product-2-1.jpg
...
```

### Product JSON Entry

```json
{
  "id": "product-1",
  "title": "Wooden Table",
  "price": 120,
  "category": "Furniture",
  "sold": false,
  "description": "Solid wood table, 4ft long.",
  "images": [
    "/images/product-1-1.jpg",
    "/images/product-1-2.jpg"
  ]
}
```

---

## 🛠️ Next Steps for Developer

1. Scaffold the Next.js + ShadCN project  
2. Create data loading and context hooks  
3. Build layout + components  
4. Wire up cart + localStorage  
5. Implement WhatsApp integration  
6. Add UI polish (toasts, modals, filters, animations)  
7. Add analytics tracking  
8. Deploy to Vercel  

---

**End of Spec**
