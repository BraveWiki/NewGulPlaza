import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Store, Heart, BookOpen, LayoutDashboard, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, userRole } = useAuth();
  
  // Don't show navbar on vendor dashboard pages
  const isVendorRoute = location.pathname.startsWith('/vendor');
  if (isVendorRoute) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shops', label: 'Shops', icon: Store },
    { path: '/stories', label: 'Stories', icon: BookOpen },
    { path: '/donate', label: 'Donate', icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F4EFE6]/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#D93A3A] flex items-center justify-center transition-transform group-hover:scale-105">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#111111]">
              GulPlaza
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#111111] text-[#F4EFE6]'
                    : 'text-[#6E6A63] hover:text-[#111111] hover:bg-[#111111]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser && userRole === 'vendor' ? (
              <Link to="/vendor/dashboard">
                <Button className="btn-primary gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/vendor/login">
                <Button className="btn-outline text-sm">
                  Vendor Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-80 bg-[#F4EFE6] border-l border-[#111111]/10"
            >
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#D93A3A] flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl text-[#111111]">
                    GulPlaza
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.path}>
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-[#111111] text-[#F4EFE6]'
                            : 'text-[#6E6A63] hover:text-[#111111] hover:bg-[#111111]/5'
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <SheetClose asChild>
                    {currentUser && userRole === 'vendor' ? (
                      <Link to="/vendor/dashboard">
                        <Button className="w-full btn-primary gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Vendor Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/vendor/login">
                        <Button className="w-full btn-primary">
                          Vendor Login
                        </Button>
                      </Link>
                    )}
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
