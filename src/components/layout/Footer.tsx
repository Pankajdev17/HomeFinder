
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-real-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">HomeFinder</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We make real estate simple, 
              transparent, and effective.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=house" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=condo" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Condos
                </Link>
              </li>
              <li>
                <Link to="/properties?type=townhouse" className="text-gray-600 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 transition-colors">
                  Townhouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-real-600 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">123 Real Estate St, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-real-600" />
                <span className="text-gray-600 dark:text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-real-600" />
                <span className="text-gray-600 dark:text-gray-400">contact@homefinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} HomeFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
