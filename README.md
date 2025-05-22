
# InfiWorld Crypto Hub

[![Performance: Optimized](https://img.shields.io/badge/Performance-Optimized-success)](https://infiworld.lovable.app)
[![SEO: Enhanced](https://img.shields.io/badge/SEO-Enhanced-blue)](https://infiworld.lovable.app)
[![PWA: Enabled](https://img.shields.io/badge/PWA-Enabled-blueviolet)](https://infiworld.lovable.app)

The ultimate platform integrating cryptocurrency payments into marketplace, freelance services, and travel reservations.

## Features

- **Marketplace**: Buy and sell products with cryptocurrency
- **Freelance**: Find or offer services with secure crypto payments
- **Travel**: Book flights, hotels, and experiences using blockchain
- **Interactive Map**: Discover crypto-friendly businesses globally
- **PWA Support**: Install as an app and use offline

## Performance Optimizations

InfiWorld has been optimized for maximum performance:

- 🚀 Lazy loading for images and below-the-fold content
- 📦 Code splitting for route-based chunk loading
- 🔄 Service worker for offline capabilities and caching
- 📱 Core Web Vitals optimized (LCP, FID, CLS)

## SEO Enhancements

- 📑 Semantic HTML structure with proper heading hierarchy
- 🔍 Comprehensive meta tags including Open Graph and Twitter Cards
- 🧩 Structured data with JSON-LD for rich search results
- 🗺️ Dynamic sitemap.xml and optimized robots.txt

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: lucide-react

## Getting Started

```typescript
// Prerequisites
// Node.js 16+ and npm or yarn

// Clone the repository
git clone https://github.com/your-username/infiworld.git

// Install dependencies
cd infiworld
npm install

// Start development server
npm run dev

// Build for production
npm run build

// Preview production build
npm run preview
```

## Environment Setup

```typescript
// .env file structure
VITE_API_URL=https://api.example.com
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_PAGESPEED_API_KEY=your_key_here
```

## Project Structure

```
infiworld/
├── docs/                  # Documentation files
├── public/                # Static assets
│   ├── service-worker.js  # PWA service worker
│   ├── manifest.json      # PWA manifest
│   ├── sitemap.xml        # SEO sitemap
│   └── robots.txt         # Crawler instructions
├── src/
│   ├── components/        # UI components
│   ├── data/              # Mock data
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   └── types/             # TypeScript types
└── README.md              # This file
```

## Performance Monitoring

Performance metrics are automatically tracked using Google PageSpeed Insights API. See `docs/performance-monitoring.md` for details.

## SEO Strategy

Comprehensive SEO implementation details are available in `docs/seo-guide.md`.

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue or contact us at support@infiworld.com.
