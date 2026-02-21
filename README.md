# Wholeseller India Clone

A pixel-perfect clone of an e-commerce wholesale gadgets store — built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

## Features

- **240 real products** scraped from the live site with locally stored images
- **Category filtering** — 12 product categories with scrollable tab bar
- **Search** — live search by product name, category, or item code
- **Pagination** — 50 products per page for fast loading
- **Product detail page** — full-screen image gallery, add-to-cart controls
- **Cart system** — Zustand-powered cart with quantity controls and floating cart bar
- **Responsive design** — mobile-first layout that adapts to all screen sizes
- **Local image storage** — all product images stored in `public/products/` (no external CDN)

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js 16 (App Router) | Framework, routing, SSR |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Zustand | State management (cart) |
| Lucide React | Icons |

## Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/const-ayush57/Fronted_works.git
cd Fronted_works

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with font & floating cart
│   ├── page.tsx            # Homepage with search, filters, pagination
│   ├── cart/page.tsx       # Cart page
│   └── item/[id]/page.tsx  # Product detail page
├── components/
│   ├── CategoryFilter.tsx  # Scrollable category tabs with arrows
│   ├── FloatingCartBar.tsx # Sticky bottom cart summary bar
│   ├── Header.tsx          # Store header with contact buttons
│   ├── ProductCard.tsx     # Product card (mobile list / desktop grid)
│   ├── ProductGrid.tsx     # Responsive product grid layout
│   └── SearchBar.tsx       # Search input component
├── data/
│   └── products.ts         # 240 products with categories & pricing
├── store/
│   └── cartStore.ts        # Zustand cart state management
└── public/
    ├── logo.png            # Store logo
    └── products/           # 240 product images (local)
```


