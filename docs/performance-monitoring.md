
# Performance Monitoring Guide

This document outlines how performance monitoring is set up for the InfiWorld application.

## Core Web Vitals Monitoring

We track the following Core Web Vitals metrics:

- **Largest Contentful Paint (LCP)**: Measures loading performance
- **First Input Delay (FID)**: Measures interactivity
- **Cumulative Layout Shift (CLS)**: Measures visual stability

## Google PageSpeed Insights Integration

The application integrates with Google PageSpeed Insights API to automatically track performance metrics.

### Setup Instructions

1. Create a Google API key with access to PageSpeed Insights API
2. Store the API key in environment variables
3. Run weekly performance reports using the scheduled task

### API Example

```typescript
const getPageSpeedInsights = async (url) => {
  const API_KEY = process.env.PAGESPEED_API_KEY;
  const API_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}&strategy=mobile`;
  
  const response = await fetch(API_URL);
  const data = await response.json();
  
  return {
    lcp: data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
    fid: data.lighthouseResult.audits['max-potential-fid'].displayValue,
    cls: data.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
    performance: data.lighthouseResult.categories.performance.score * 100,
  };
};
```

## Performance Optimizations Implemented

1. **Lazy Loading**
   - Images using `loading="lazy"`
   - Route-based component loading with React Suspense
   - Defer non-critical third-party scripts

2. **Code Splitting**
   - Route-based splitting
   - Vendor chunk extraction
   - Component-level chunking

3. **Service Worker**
   - Static asset caching
   - Offline page support
   - Background sync for forms

4. **Other Optimizations**
   - Minified CSS and JS
   - Compressed images
   - Preconnect to critical domains
   - Font optimization

## Performance Report Example

| Page | LCP | FID | CLS | Performance Score |
|------|-----|-----|-----|-------------------|
| Home | 1.2s | 70ms | 0.02 | 94 |
| Marketplace | 1.8s | 85ms | 0.03 | 89 |
| Travel | 1.5s | 75ms | 0.01 | 92 |

## Monitoring Schedule

- Weekly automated reports
- Monthly detailed analysis
- Quarterly optimization reviews
