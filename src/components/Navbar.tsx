
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Map, Marketplace, Freelance, Travel } from '@/components/custom-icons';
import { Link } from 'react-router-dom';
import InfinityLogo from '@/components/InfinityLogo';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-infi-dark/90 backdrop-blur-md border-b border-infi-gold/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <InfinityLogo className="h-8 w-8" />
          <span className="text-xl font-bold text-gradient">InfiWorld</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/map" className="px-3 py-2 rounded-md text-sm flex items-center gap-1.5 hover:bg-infi-blue/30 transition-colors">
            <Map size={16} /> Map
          </Link>
          <Link to="/marketplace" className="px-3 py-2 rounded-md text-sm flex items-center gap-1.5 hover:bg-infi-blue/30 transition-colors">
            <Marketplace size={16} /> Marketplace
          </Link>
          <Link to="/freelance" className="px-3 py-2 rounded-md text-sm flex items-center gap-1.5 hover:bg-infi-blue/30 transition-colors">
            <Freelance size={16} /> Freelance
          </Link>
          <Link to="/travel" className="px-3 py-2 rounded-md text-sm flex items-center gap-1.5 hover:bg-infi-blue/30 transition-colors">
            <Travel size={16} /> Travel
          </Link>
          <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm hover:bg-infi-blue/30 transition-colors">
            Dashboard
          </Link>
          <Link to="/admin" className="px-3 py-2 rounded-md text-sm hover:bg-infi-blue/30 transition-colors">
            Admin
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button className="gold-gradient animate-pulse-gold">
            Connect Wallet
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-md hover:bg-infi-blue/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-infi-dark-blue/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/map"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-infi-blue/30 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map size={18} /> Map
            </Link>
            <Link
              to="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-infi-blue/30 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Marketplace size={18} /> Marketplace
            </Link>
            <Link
              to="/freelance"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-infi-blue/30 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Freelance size={18} /> Freelance
            </Link>
            <Link
              to="/travel"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-infi-blue/30 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Travel size={18} /> Travel
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-infi-blue/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-infi-blue/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <div className="pt-2">
              <Button className="gold-gradient animate-pulse-gold w-full">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
