
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

export interface NavLink {
  text: string;
  href: string;
}

export interface UserInfo {
  name: string;
  avatar: string;
}

interface MainNavbarProps {
  links: NavLink[];
  user?: UserInfo;
  logo?: React.ReactNode;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const MainNavbar = ({
  links,
  user,
  logo,
  onSignIn = () => console.log('Sign in clicked'),
  onSignOut = () => console.log('Sign out clicked'),
}: MainNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex shrink-0 items-center">
            {logo ? (
              logo
            ) : (
              <Link to="/" className="text-xl font-bold text-primary">
                InfiWorld
              </Link>
            )}
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4 space-x-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Auth section */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:block">
                <Button variant="outline" size="sm" onClick={onSignIn} className="mr-2">
                  Sign In
                </Button>
                <Button size="sm">Sign Up</Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-accordion-down origin-top">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              {!user && (
                <div className="pt-4 flex flex-col space-y-2">
                  <Button variant="outline" onClick={onSignIn}>
                    Sign In
                  </Button>
                  <Button>Sign Up</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
