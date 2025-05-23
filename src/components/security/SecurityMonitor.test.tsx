
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecurityMonitor from './SecurityMonitor';
import * as vulnScanner from '@/lib/security/vulnerability-scanner';

// Mock the vulnerability scanner hook
vi.mock('@/lib/security/vulnerability-scanner', () => ({
  useVulnerabilityScanner: vi.fn(),
}));

describe('SecurityMonitor Component', () => {
  const mockScanResult = {
    vulnerabilities: [
      {
        id: 'VULN-1',
        title: 'Test Vulnerability',
        packageName: 'test-package',
        severity: 'high',
        fixedIn: '2.0.0',
        description: 'This is a test vulnerability'
      }
    ],
    summary: {
      critical: 0,
      high: 1,
      medium: 0,
      low: 0
    }
  };

  beforeEach(() => {
    // Reset mock before each test
    vi.mocked(vulnScanner.useVulnerabilityScanner).mockReset();
  });

  it('should render the security monitor with initial state', () => {
    vi.mocked(vulnScanner.useVulnerabilityScanner).mockReturnValue({
      scanning: false,
      results: null,
      startScan: vi.fn(),
    });

    render(<SecurityMonitor />);
    
    expect(screen.getByText('Security Monitor')).toBeInTheDocument();
    expect(screen.getByText('Scan your application for security vulnerabilities')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Security Scan/i })).toBeInTheDocument();
  });

  it('should show scanning state', () => {
    vi.mocked(vulnScanner.useVulnerabilityScanner).mockReturnValue({
      scanning: true,
      results: null,
      startScan: vi.fn(),
    });

    render(<SecurityMonitor />);
    
    expect(screen.getByRole('button', { name: /Scanning.../i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Scanning.../i })).toBeDisabled();
  });

  it('should display scan results when available', async () => {
    const startScanMock = vi.fn();
    vi.mocked(vulnScanner.useVulnerabilityScanner).mockReturnValue({
      scanning: false,
      results: mockScanResult,
      startScan: startScanMock,
    });

    render(<SecurityMonitor />);
    
    // Results summary should be displayed
    expect(screen.getByText('1')).toBeInTheDocument(); // High vulnerabilities
    
    // Show details button should be present
    const showDetailsButton = screen.getByRole('button', { name: /Show Details/i });
    expect(showDetailsButton).toBeInTheDocument();
    
    // Click to show details
    fireEvent.click(showDetailsButton);
    
    // Vulnerability details should now be displayed
    await waitFor(() => {
      expect(screen.getByText('Test Vulnerability')).toBeInTheDocument();
      expect(screen.getByText(/Package: test-package/)).toBeInTheDocument();
      expect(screen.getByText('This is a test vulnerability')).toBeInTheDocument();
    });
    
    // Scan again button should be present
    const scanAgainButton = screen.getByRole('button', { name: /Scan Again/i });
    expect(scanAgainButton).toBeInTheDocument();
    
    // Click to scan again
    fireEvent.click(scanAgainButton);
    expect(startScanMock).toHaveBeenCalledTimes(1);
  });

  it('should show no vulnerabilities message when results are empty', () => {
    vi.mocked(vulnScanner.useVulnerabilityScanner).mockReturnValue({
      scanning: false,
      results: {
        vulnerabilities: [],
        summary: { critical: 0, high: 0, medium: 0, low: 0 }
      },
      startScan: vi.fn(),
    });

    render(<SecurityMonitor />);
    
    expect(screen.getByText('No vulnerabilities detected!')).toBeInTheDocument();
  });

  it('should show details when showDetails prop is true', () => {
    vi.mocked(vulnScanner.useVulnerabilityScanner).mockReturnValue({
      scanning: false,
      results: null,
      startScan: vi.fn(),
    });

    render(<SecurityMonitor showDetails={true} />);
    
    expect(screen.getByText('Security monitoring helps protect your application from vulnerabilities and threats.')).toBeInTheDocument();
  });
});
