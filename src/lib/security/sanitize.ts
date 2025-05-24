
import DOMPurify from 'dompurify';
import { useMemo } from 'react';

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'b', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
  });
};

export const sanitizeInput = (input: any): string => {
  if (input === null || input === undefined) {
    return '';
  }
  
  const str = String(input);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

export const useSanitizedValue = (value: string): string => {
  return useMemo(() => sanitizeInput(value), [value]);
};
