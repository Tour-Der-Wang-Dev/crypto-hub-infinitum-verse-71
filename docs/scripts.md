
# Script Commands Reference

This document provides detailed information about the npm scripts available in this project.

## Available Scripts

### Development Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Starts the development server with hot-reload | `npm run dev` |
| `npm run build` | Builds the app for production | `npm run build` |
| `npm run preview` | Locally preview production build | `npm run preview` |
| `npm run lint` | Runs ESLint to check code quality | `npm run lint` |
| `npm run type-check` | Verifies TypeScript types | `npm run type-check` |

### Performance Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run analyze` | Analyzes bundle size with rollup-plugin-visualizer | `npm run analyze` |
| `npm run lighthouse` | Runs Lighthouse CI for performance metrics | `npm run lighthouse` |

### PWA Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run generate-sw` | Regenerate service worker | `npm run generate-sw` |

### SEO Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run generate-sitemap` | Creates or updates the sitemap.xml | `npm run generate-sitemap` |

## Script Parameters

### Lighthouse Script Parameters

```typescript
interface LighthouseParams {
  /**
   * URL to run Lighthouse against
   * @default "http://localhost:8080"
   */
  url?: string;

  /**
   * Which device to emulate
   * @default "mobile"
   */
  device?: "mobile" | "desktop";

  /**
   * Output format for the report
   * @default "html"
   */
  output?: "json" | "html" | "csv";
  
  /**
   * Where to save the report
   * @default "./lighthouse-report"
   */
  outputPath?: string;
}
```

### Example Usage:

```bash
# Run Lighthouse on production URL with desktop emulation
npm run lighthouse -- --url=https://infiworld.lovable.app --device=desktop

# Generate JSON output for CI integration
npm run lighthouse -- --output=json --outputPath=./ci-reports
```

### Sitemap Generation Parameters

```typescript
interface SitemapParams {
  /**
   * Base URL for the sitemap
   * @default "https://infiworld.lovable.app"
   */
  baseUrl?: string;
  
  /**
   * Output path for the sitemap file
   * @default "./public/sitemap.xml"
   */
  output?: string;
  
  /**
   * Pages to exclude from the sitemap
   * @default ["404", "private/*"]
   */
  exclude?: string[];
}
```

### Example Usage:

```bash
# Generate sitemap with custom base URL
npm run generate-sitemap -- --baseUrl=https://mycustom.domain

# Exclude additional pages
npm run generate-sitemap -- --exclude=admin/*,temp/*
```

## Automation Scripts

These scripts are typically run in CI environments or scheduled tasks:

```bash
# Run full performance and SEO audit
npm run audit-all

# Generate weekly performance report
npm run report-performance

# Generate monthly SEO report
npm run report-seo
```
