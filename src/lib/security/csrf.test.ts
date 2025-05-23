
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { generateCsrfToken, useCsrfToken, CsrfToken } from './csrf';
import { render } from '@testing-library/react';

describe('CSRF Security Module', () => {
  describe('generateCsrfToken', () => {
    it('should generate a non-empty string', () => {
      const token = generateCsrfToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate unique tokens', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('useCsrfToken', () => {
    beforeEach(() => {
      // Clear storage before each test
      window.sessionStorage.clear();
    });

    it('should generate and return a token on mount', () => {
      const { result } = renderHook(() => useCsrfToken());
      expect(result.current.csrfToken).toBeDefined();
      expect(typeof result.current.csrfToken).toBe('string');
      expect(result.current.csrfToken.length).toBeGreaterThan(0);
    });

    it('should store the token in sessionStorage', () => {
      const { result } = renderHook(() => useCsrfToken());
      const storedToken = sessionStorage.getItem('csrf_token');
      expect(storedToken).toBe(result.current.csrfToken);
    });

    it('should refresh the token when refreshToken is called', () => {
      const { result } = renderHook(() => useCsrfToken());
      const originalToken = result.current.csrfToken;
      const newToken = result.current.refreshToken();
      expect(newToken).not.toBe(originalToken);
      expect(result.current.csrfToken).toBe(newToken);
      expect(sessionStorage.getItem('csrf_token')).toBe(newToken);
    });

    it('should correctly verify valid tokens', () => {
      const { result } = renderHook(() => useCsrfToken());
      const token = result.current.csrfToken;
      expect(result.current.verifyToken(token)).toBe(true);
    });

    it('should reject invalid tokens', () => {
      const { result } = renderHook(() => useCsrfToken());
      expect(result.current.verifyToken('invalid-token')).toBe(false);
    });
  });

  describe('CsrfToken component', () => {
    it('should render a hidden input with the token value', () => {
      const { getByRole } = render(<CsrfToken />);
      const input = getByRole('none', { hidden: true }) as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.type).toBe('hidden');
      expect(input.name).toBe('csrf_token');
      expect(input.value).toBeDefined();
      expect(input.value.length).toBeGreaterThan(0);
    });
  });
});
