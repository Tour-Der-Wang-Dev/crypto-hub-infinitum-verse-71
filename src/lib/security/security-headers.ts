
/**
 * Security headers for the application
 * These would normally be set on the server, but we can also 
 * implement some of them in the frontend
 */

export const securityHeaders = {
  // Content Security Policy
  contentSecurityPolicy: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "https://cdn.gpteng.co", "'unsafe-inline'"], // Note: unsafe-inline included for existing scripts
    'style-src': ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:", "http:"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'connect-src': ["'self'", "https://api.snyk.io", "https://lovable.dev"],
    'frame-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
  },
  
  // HTTP Strict Transport Security
  strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
  
  // X-Content-Type-Options
  contentTypeOptions: 'nosniff',
  
  // X-Frame-Options
  frameOptions: 'DENY',
  
  // Referrer-Policy
  referrerPolicy: 'strict-origin-when-cross-origin',
  
  // Permissions-Policy
  permissionsPolicy: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  
  // X-XSS-Protection (for older browsers)
  xssProtection: '1; mode=block',
};

/**
 * Generates a CSP meta tag string from the security headers
 * @returns CSP meta tag string
 */
export const generateCspString = (): string => {
  const csp = securityHeaders.contentSecurityPolicy;
  let cspString = '';
  
  for (const [directive, sources] of Object.entries(csp)) {
    if (sources.length > 0) {
      cspString += `${directive} ${sources.join(' ')}; `;
    } else {
      cspString += `${directive}; `;
    }
  }
  
  return cspString.trim();
};

/**
 * Apply security headers to the HTML document
 * This should be called once when the app initializes
 */
export const applySecurityHeaders = () => {
  // Apply CSP via meta tag for browsers that support it
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = generateCspString();
  document.head.appendChild(cspMeta);
  
  // Apply other security meta tags
  const securityMetas = [
    { httpEquiv: 'X-Content-Type-Options', content: securityHeaders.contentTypeOptions },
    { httpEquiv: 'X-Frame-Options', content: securityHeaders.frameOptions },
    { httpEquiv: 'Referrer-Policy', content: securityHeaders.referrerPolicy },
    { httpEquiv: 'X-XSS-Protection', content: securityHeaders.xssProtection },
    { name: 'Permissions-Policy', content: securityHeaders.permissionsPolicy }
  ];
  
  securityMetas.forEach(meta => {
    const metaTag = document.createElement('meta');
    if (meta.httpEquiv) metaTag.httpEquiv = meta.httpEquiv;
    if (meta.name) metaTag.name = meta.name;
    metaTag.content = meta.content;
    document.head.appendChild(metaTag);
  });
  
  console.log('Security headers applied via meta tags');
};
