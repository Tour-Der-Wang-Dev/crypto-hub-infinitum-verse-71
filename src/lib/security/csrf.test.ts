
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useCsrfToken, generateCsrfToken, CsrfToken } from './csrf';

describe('CSRF Module', () => {
  // Mock sessionStorage
  const mockSessionStorage = (() => {
    let store: Record<string, string> = {};
    
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      clear: () => { store = {}; }
    };
  })();

  // Setup mock before each test
  beforeEach(() => {
    vi.spyOn(window, 'sessionStorage', 'get').mockReturnValue(mockSessionStorage as Storage);
    mockSessionStorage.clear();
  });

  describe('generateCsrfToken', () => {
    it('should generate a random token string', () => {
      const token = generateCsrfToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
    
    it('should generate unique tokens on each call', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('useCsrfToken hook', () => {
    it('should generate a token on mount and store in sessionStorage', () => {
      const { result } = renderHook(() => useCsrfToken());
      
      expect(typeof result.current.csrfToken).toBe('string');
      expect(result.current.csrfToken.length).toBeGreaterThan(0);
      expect(mockSessionStorage.getItem('csrf_token')).toBe(result.current.csrfToken);
    });
    
    it('refreshToken should generate a new token', () => {
      const { result } = renderHook(() => useCsrfToken());
      const initialToken = result.current.csrfToken;
      
      act(() => {
        result.current.refreshToken();
      });
      
      expect(result.current.csrfToken).not.toBe(initialToken);
      expect(mockSessionStorage.getItem('csrf_token')).toBe(result.current.csrfToken);
    });
    
    it('verifyToken should correctly validate tokens', () => {
      const { result } = renderHook(() => useCsrfToken());
      
      expect(result.current.verifyToken(result.current.csrfToken)).toBe(true);
      expect(result.current.verifyToken('invalid-token')).toBe(false);
    });
  });

  describe('CsrfToken component', () => {
    it('renders a hidden input with the CSRF token', () => {
      const mockToken = 'test-token';
      vi.mock('./csrf', async (importOriginal) => {
        const original = await importOriginal<typeof import('./csrf')>();
        return {
          ...original,
          useCsrfToken: () => ({
            csrfToken: mockToken,
            refreshToken: vi.fn(),
            verifyToken: vi.fn()
          })
        };
      });
      
      const { container } = render(React.createElement(CsrfToken));
      const inputElement = container.querySelector('input');
      
      expect(inputElement).not.toBeNull();
      expect(inputElement?.getAttribute('type')).toBe('hidden');
      expect(inputElement?.getAttribute('name')).toBe('csrf_token');
    });
  });
});
