
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/MapPage";
import MarketplacePage from "./pages/MarketplacePage";
import FreelancePage from "./pages/FreelancePage";
import TravelPage from "./pages/TravelPage";
import VerificationPage from "./pages/VerificationPage";

// Create a query client with security settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Security check for HTTP protocol
const isSecureContext = () => {
  return window.location.protocol === 'https:' 
    || window.location.hostname === 'localhost' 
    || window.location.hostname === '127.0.0.1';
};

const App = () => {
  const [isSecure, setIsSecure] = useState(true);
  
  useEffect(() => {
    // Check if we're on a secure connection
    const secure = isSecureContext();
    setIsSecure(secure);
    
    // Log security checks
    if (!secure) {
      console.warn('Application is running in an insecure context. Some features may be limited.');
    }
    
    // Set security headers via CSP report-only for violations monitoring
    if (secure) {
      // This would normally be done server-side, but we're demonstrating it here
      console.log('Security context is verified');
    }
    
    // Add event listener for security errors
    const handleSecurityError = (e: SecurityPolicyViolationEvent) => {
      console.error('Content Security Policy violation:', 
        e.blockedURI,
        'violated directive:', e.violatedDirective);
    };
    
    document.addEventListener('securitypolicyviolation', handleSecurityError);
    
    return () => {
      document.removeEventListener('securitypolicyviolation', handleSecurityError);
    };
  }, []);
  
  // Force redirect to HTTPS in production
  if (!isSecure && process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined' && window.location.protocol === 'http:') {
      window.location.href = window.location.href.replace('http:', 'https:');
      return null;
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/freelance" element={<FreelancePage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
