
import { useState, useEffect } from 'react';
import React from 'react';

/**
 * Generates a CSRF token
 * @returns A random CSRF token
 */
export const generateCsrfToken = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

/**
 * Custom hook for CSRF token management
 * @returns An object containing the CSRF token and methods to verify and refresh it
 */
export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Generate a new token when the component mounts
    const newToken = generateCsrfToken();
    setCsrfToken(newToken);
    
    // Store the token in sessionStorage for persistence
    sessionStorage.setItem('csrf_token', newToken);
  }, []);

  const refreshToken = () => {
    const newToken = generateCsrfToken();
    setCsrfToken(newToken);
    sessionStorage.setItem('csrf_token', newToken);
    return newToken;
  };

  const verifyToken = (token: string): boolean => {
    return token === sessionStorage.getItem('csrf_token');
  };

  return {
    csrfToken,
    refreshToken,
    verifyToken,
  };
};

/**
 * React component that adds a CSRF token to a form
 */
export const CsrfToken = () => {
  const { csrfToken } = useCsrfToken();

  return React.createElement(
    'input',
    {
      type: 'hidden',
      name: 'csrf_token',
      value: csrfToken,
      role: 'none'
    }
  );
};
