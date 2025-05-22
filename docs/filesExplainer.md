
# Project File Structure Overview

This document provides an overview of all files in the InfiWorld project, with each file's significance and import count.

## Key
- 🟢 0-3 imports (low complexity)
- 🟡 4-7 imports (medium complexity)
- 🔴 8+ imports (high complexity)

## Root Files
- 🟢 `index.html` - Main HTML entry point with SEO meta tags and structured data
- 🟢 `vite.config.ts` - Vite configuration with code splitting and performance optimizations
- 🟢 `README.md` - Project documentation and setup instructions
- 🟢 `public/manifest.json` - PWA manifest file for app installation
- 🟢 `public/robots.txt` - Search engine crawling instructions
- 🟢 `public/sitemap.xml` - Website structure for search engines
- 🟢 `public/service-worker.js` - Offline capabilities and caching
- 🟢 `public/offline.html` - Fallback page for offline users

## Source Files
- 🟡 `src/main.tsx` - Application entry point with service worker registration
- 🔴 `src/App.tsx` - Main application component with routing

### Pages
- 🟡 `src/pages/Index.tsx` - Home page with hero section and features
- 🟡 `src/pages/MarketplacePage.tsx` - Crypto marketplace listings and filters
- 🟡 `src/pages/FreelancePage.tsx` - Freelancer services and job listings
- 🟡 `src/pages/TravelPage.tsx` - Travel booking interface with multiple tabs
- 🟢 `src/pages/MapPage.tsx` - Interactive map for crypto services
- 🟢 `src/pages/NotFound.tsx` - 404 error page
- 🟢 `src/pages/VerificationPage.tsx` - User verification flow

### Components
- 🟢 `src/components/Layout.tsx` - Main layout wrapper with navbar and footer
- 🟢 `src/components/Navbar.tsx` - Navigation header with mobile responsiveness
- 🟢 `src/components/Footer.tsx` - Site footer with links and information
- 🟢 `src/components/Hero.tsx` - Hero section with call-to-action
- 🟢 `src/components/FeatureSection.tsx` - Features showcase section
- 🟢 `src/components/InfinityLogo.tsx` - Logo component

#### Travel Components
- 🟡 `src/components/travel/FlightsTab.tsx` - Flight search interface with lazy loading
- 🟡 `src/components/travel/FlightResults.tsx` - Flight search results component
- 🟡 `src/components/travel/ExperiencesTab.tsx` - Experiences search interface
- 🟡 `src/components/travel/ExperienceResults.tsx` - Experience listings component
- 🟢 `src/components/travel/HotelsTab.tsx` - Hotel booking interface
- 🟢 `src/components/travel/JobsTab.tsx` - Travel industry job listings
- 🟢 `src/components/travel/FeaturedDestinations.tsx` - Highlighted travel destinations

#### Marketplace Components
- 🟢 `src/components/marketplace/ProductCard.tsx` - Product display component

#### Freelance Components
- 🟢 `src/components/freelance/FreelancerCard.tsx` - Freelancer profile card
- 🟢 `src/components/freelance/JobCard.tsx` - Job listing card

### UI Components
- 🟢 `src/components/ui/` - Various shadcn UI components with consistent styling

### Data
- 🟢 `src/data/marketplace-data.ts` - Product listings data
- 🟢 `src/data/freelance-data.ts` - Freelancer and job listings data
- 🟢 `src/data/travel-data.ts` - Travel-related data

### Utilities and Types
- 🟢 `src/lib/utils.ts` - Utility functions for the application
- 🟢 `src/hooks/use-toast.ts` - Custom hook for toast notifications
- 🟢 `src/hooks/use-mobile.tsx` - Mobile detection hook
- 🟢 `src/types/marketplace.ts` - TypeScript type definitions

### Documentation
- 🟢 `docs/performance-monitoring.md` - Performance tracking documentation
- 🟢 `docs/seo-guide.md` - SEO implementation details
- 🟢 `docs/filesExplainer.md` - This file structure explanation
