
import React from 'react';
import { ChevronRight, Home, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';

const Hero: React.FC = () => {
  const { updateFilters } = useProperties();

  const handleBuyClick = () => {
    updateFilters({ status: 'sale' });
  };

  const handleRentClick = () => {
    updateFilters({ status: 'rent' });
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/75 dark:from-gray-900/90 dark:to-gray-900/75 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your <span className="text-real-600">Perfect</span> Home
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
              Discover your dream property from thousands of listings in your desired location. 
              Whether buying or renting, we've got you covered.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Button 
                asChild
                size="lg" 
                className="bg-real-600 hover:bg-real-700 gap-2"
                onClick={handleBuyClick}
              >
                <Link to="/properties">
                  <Home className="h-5 w-5" />
                  Buy a Home
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={handleRentClick}
              >
                <Link to="/properties">
                  <Building className="h-5 w-5" />
                  Rent a Home
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center">
                  <Home className="h-5 w-5 text-real-600" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">5000+ Properties</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center">
                  <Building className="h-5 w-5 text-real-600" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">100+ Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-real-600" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Best Price Guarantee</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop" 
                alt="Modern home" 
                className="rounded-lg shadow-xl object-cover w-full max-h-[550px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-4 px-6 w-64">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Start Your Search</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Find homes in your dream location</p>
                <Link to="/properties" className="text-real-600 dark:text-real-400 flex items-center text-sm font-medium">
                  Browse all properties
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
