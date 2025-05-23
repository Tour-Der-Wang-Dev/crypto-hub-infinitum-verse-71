
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { generateCspString, applySecurityHeaders, securityHeaders } from './security-headers';

describe('Security Headers Module', () => {
  const originalDocument = { ...document };
  
  // Mock document.createElement and appendChild
  beforeEach(() => {
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const element = originalDocument.createElement(tagName);
      vi.spyOn(element, 'setAttribute');
      return element;
    });
    
    vi.spyOn(document.head, 'appendChild').mockImplementation(() => {
      return document.createElement('meta');
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateCspString', () => {
    it('should generate a valid CSP string from config', () => {
      const cspString = generateCspString();
      
      // Check that all directives are included
      Object.keys(securityHeaders.contentSecurityPolicy).forEach(directive => {
        expect(cspString).toContain(directive);
      });
      
      // Check format of a specific directive
      expect(cspString).toContain("default-src 'self'");
    });
  });

  describe('applySecurityHeaders', () => {
    it('should add CSP meta tag to the document head', () => {
      applySecurityHeaders();
      
      // CSP meta should be applied
      expect(document.createElement).toHaveBeenCalledWith('meta');
      expect(document.head.appendChild).toHaveBeenCalled();
    });

    it('should add all security headers as meta tags', () => {
      const appendChildSpy = vi.spyOn(document.head, 'appendChild');
      
      applySecurityHeaders();
      
      // Check that all required security headers are added (CSP + 5 others)
      expect(appendChildSpy).toHaveBeenCalledTimes(6);
    });
  });
});
