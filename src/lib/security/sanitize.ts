
import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML strings to prevent XSS attacks
 * @param content The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};

/**
 * Sanitizes form input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized input string
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  // First use DOMPurify to remove any HTML
  const sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  // Then additionally escape any remaining special characters
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Custom hook to sanitize form values
 * @param value The value to sanitize
 * @returns The sanitized value
 */
export const useSanitizedValue = (value: string): string => {
  return sanitizeInput(value);
};
