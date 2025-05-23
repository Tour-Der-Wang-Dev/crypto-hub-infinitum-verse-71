
import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeInput, useSanitizedValue } from './sanitize';
import { renderHook } from '@testing-library/react';

describe('Sanitization Security Module', () => {
  describe('sanitizeHtml', () => {
    it('should allow permitted tags', () => {
      const input = '<p>Hello <b>world</b> <i>text</i></p>';
      const output = sanitizeHtml(input);
      expect(output).toBe(input);
    });

    it('should remove script tags and attributes', () => {
      const input = '<p>Hello <script>alert("XSS")</script> world</p>';
      const output = sanitizeHtml(input);
      expect(output).toBe('<p>Hello  world</p>');
    });

    it('should remove disallowed attributes', () => {
      const input = '<a href="https://example.com" onclick="alert(1)">Link</a>';
      const output = sanitizeHtml(input);
      expect(output).toBe('<a href="https://example.com">Link</a>');
    });

    it('should allow permitted attributes', () => {
      const input = '<a href="https://example.com" target="_blank" rel="noopener">Link</a>';
      const output = sanitizeHtml(input);
      expect(output).toBe(input);
    });
  });

  describe('sanitizeInput', () => {
    it('should handle null or undefined input', () => {
      // @ts-ignore
      expect(sanitizeInput(null)).toBe('');
      // @ts-ignore
      expect(sanitizeInput(undefined)).toBe('');
    });

    it('should convert HTML to safe text', () => {
      const input = '<script>alert("XSS")</script>';
      expect(sanitizeInput(input)).not.toContain('<script>');
    });

    it('should escape HTML entities', () => {
      const input = '<div>Hello & World</div>';
      const output = sanitizeInput(input);
      expect(output).toContain('&lt;div&gt;');
      expect(output).toContain('&amp;');
    });
  });

  describe('useSanitizedValue', () => {
    it('should sanitize the provided value', () => {
      const inputValue = '<script>alert("XSS")</script>';
      const { result } = renderHook(() => useSanitizedValue(inputValue));
      expect(result.current).not.toContain('<script>');
    });
  });
});
