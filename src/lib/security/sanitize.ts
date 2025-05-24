
import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param dirty - The potentially unsafe HTML string
 * @returns Sanitized HTML string
 */
export const sanitizeInput = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
    ALLOWED_URI_REGEXP: /^https?:\/\//,
  });
};

/**
 * Sanitizes user input for safe display
 * @param input - User input string
 * @returns Sanitized string
 */
export const sanitizeUserInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates and sanitizes email addresses
 * @param email - Email string to validate
 * @returns Sanitized email or null if invalid
 */
export const sanitizeEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = sanitizeUserInput(email.toLowerCase());
  
  return emailRegex.test(sanitized) ? sanitized : null;
};

/**
 * Sanitizes URL input
 * @param url - URL string to sanitize
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeUrl = (url: string): string | null => {
  try {
    const sanitized = sanitizeUserInput(url);
    const urlObj = new URL(sanitized);
    
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return null;
    }
    
    return urlObj.toString();
  } catch {
    return null;
  }
};
