
import { renderHook } from '@testing-library/react';
import { render } from '@testing-library/react';
import { useCsrfToken, CsrfToken, generateCsrfToken } from './csrf';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('CSRF Protection', () => {
  // Mock sessionStorage
  const mockSessionStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // Setup sessionStorage mock
    Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });
  });

  afterEach(() => {
    mockSessionStorage.clear();
    vi.resetAllMocks();
  });

  describe('generateCsrfToken', () => {
    it('should generate a random token string', () => {
      const token = generateCsrfToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10);
    });

    it('should generate unique tokens each time', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toEqual(token2);
    });
  });

  describe('useCsrfToken', () => {
    it('should generate and store a token on mount', () => {
      const { result } = renderHook(() => useCsrfToken());
      
      expect(result.current.csrfToken).toBeTruthy();
      expect(mockSessionStorage.getItem('csrf_token')).toEqual(result.current.csrfToken);
    });

    it('should refresh the token when requested', () => {
      const { result } = renderHook(() => useCsrfToken());
      const initialToken = result.current.csrfToken;
      
      const newToken = result.current.refreshToken();
      
      expect(newToken).not.toEqual(initialToken);
      expect(mockSessionStorage.getItem('csrf_token')).toEqual(newToken);
    });

    it('should verify tokens correctly', () => {
      const { result } = renderHook(() => useCsrfToken());
      
      expect(result.current.verifyToken(result.current.csrfToken)).toBe(true);
      expect(result.current.verifyToken('invalid-token')).toBe(false);
    });
  });

  describe('CsrfToken component', () => {
    it('renders a hidden input with the token value', () => {
      const { container } = render(<CsrfToken />);
      
      const inputElement = container.querySelector('input[type="hidden"][name="csrf_token"]');
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('value');
    });
  });
});
