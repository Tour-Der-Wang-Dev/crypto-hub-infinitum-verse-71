
import React, { useState } from 'react';
import { Shield, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVulnerabilityScanner, type ScanResult } from '@/lib/security/vulnerability-scanner';

interface SecurityMonitorProps {
  showDetails?: boolean;
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ showDetails = false }) => {
  const { scanning, results, startScan } = useVulnerabilityScanner();
  const [showFullReport, setShowFullReport] = useState(false);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertCircle className={`${getSeverityColor(severity)} mr-2`} size={16} />;
      case 'medium':
        return <AlertTriangle className={`${getSeverityColor(severity)} mr-2`} size={16} />;
      case 'low':
        return <AlertTriangle className={`${getSeverityColor(severity)} mr-2`} size={16} />;
      default:
        return null;
    }
  };

  const renderVulnerabilities = (scanResults: ScanResult) => {
    if (scanResults.vulnerabilities.length === 0) {
      return (
        <div className="flex items-center p-4 bg-green-950/20 rounded-md">
          <CheckCircle className="text-green-500 mr-2" size={18} />
          <span>No vulnerabilities detected!</span>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-infi-dark-blue/60">
            <div className="text-sm font-medium">Critical</div>
            <div className={`text-lg ${scanResults.summary.critical > 0 ? 'text-red-600' : 'text-green-500'}`}>
              {scanResults.summary.critical}
            </div>
          </div>
          <div className="p-2 rounded bg-infi-dark-blue/60">
            <div className="text-sm font-medium">High</div>
            <div className={`text-lg ${scanResults.summary.high > 0 ? 'text-orange-500' : 'text-green-500'}`}>
              {scanResults.summary.high}
            </div>
          </div>
          <div className="p-2 rounded bg-infi-dark-blue/60">
            <div className="text-sm font-medium">Medium</div>
            <div className={`text-lg ${scanResults.summary.medium > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
              {scanResults.summary.medium}
            </div>
          </div>
          <div className="p-2 rounded bg-infi-dark-blue/60">
            <div className="text-sm font-medium">Low</div>
            <div className={`text-lg ${scanResults.summary.low > 0 ? 'text-blue-500' : 'text-green-500'}`}>
              {scanResults.summary.low}
            </div>
          </div>
        </div>
        
        {showFullReport && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium">Vulnerability Details:</h4>
            {scanResults.vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="p-3 bg-infi-dark-blue/30 rounded-md">
                <div className="flex items-center">
                  {getSeverityIcon(vuln.severity)}
                  <span className="font-medium">{vuln.title}</span>
                  <span className={`ml-auto text-xs ${getSeverityColor(vuln.severity)}`}>
                    {vuln.severity.toUpperCase()}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Package: {vuln.packageName}
                  {vuln.fixedIn && ` (Fixed in: ${vuln.fixedIn})`}
                </div>
                {vuln.description && (
                  <div className="mt-2 text-xs">{vuln.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card-glass p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Shield className="text-infi-gold mr-2" size={20} />
        <h3 className="text-lg font-medium">Security Monitor</h3>
      </div>
      
      {showDetails && (
        <div className="mb-4 text-sm text-gray-400">
          <p>Security monitoring helps protect your application from vulnerabilities and threats.</p>
        </div>
      )}
      
      {results ? (
        <div className="space-y-4">
          {renderVulnerabilities(results)}
          <div className="flex justify-between">
            <Button 
              onClick={() => setShowFullReport(!showFullReport)}
              variant="outline"
              size="sm"
            >
              {showFullReport ? 'Hide Details' : 'Show Details'}
            </Button>
            <Button
              onClick={startScan}
              disabled={scanning}
              size="sm"
            >
              {scanning ? 'Scanning...' : 'Scan Again'}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-400 mb-4">
            Scan your application for security vulnerabilities
          </p>
          <Button 
            onClick={startScan} 
            disabled={scanning}
            className="w-full"
          >
            {scanning ? 'Scanning...' : 'Start Security Scan'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SecurityMonitor;
