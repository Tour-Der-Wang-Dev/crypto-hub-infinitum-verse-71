
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Index from '@/pages/Index';
import MapPage from '@/pages/MapPage';
import MarketplacePage from '@/pages/MarketplacePage';
import FreelancePage from '@/pages/FreelancePage';
import TravelPage from '@/pages/TravelPage';
import VerificationPage from '@/pages/VerificationPage';
import DashboardPage from '@/pages/DashboardPage';
import ProjectDashboardPage from '@/pages/ProjectDashboardPage';
import AdminPage from '@/pages/AdminPage';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/freelance" element={<FreelancePage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectDashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
