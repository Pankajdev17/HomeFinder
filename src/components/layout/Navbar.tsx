
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/common/ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-real-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">HomeFinder</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium hover:text-real-600 transition-colors ${location.pathname === '/' ? 'text-real-600' : 'text-gray-700 dark:text-gray-200'}`}>
              Home
            </Link>
            <Link to="/properties" className={`text-sm font-medium hover:text-real-600 transition-colors ${location.pathname === '/properties' ? 'text-real-600' : 'text-gray-700 dark:text-gray-200'}`}>
              Properties
            </Link>
            <Link to="/blog" className={`text-sm font-medium hover:text-real-600 transition-colors ${location.pathname === '/blog' ? 'text-real-600' : 'text-gray-700 dark:text-gray-200'}`}>
              Blog
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <Button asChild size="sm" className="bg-real-600 hover:bg-real-700">
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="rounded-full"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <Link to="/" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Home
            </Link>
            <Link to="/properties" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Properties
            </Link>
            <Link to="/blog" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Blog
            </Link>
            <Link to="/favorites" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Favorites
            </Link>
            <Link to="/contact" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Contact
            </Link>
            <div className="pt-2">
              <Button asChild className="w-full bg-real-600 hover:bg-real-700">
                <Link to="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
