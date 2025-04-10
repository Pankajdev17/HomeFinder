
import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Home, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useProperties } from '@/context/PropertyContext';

interface PropertyFiltersProps {
  isMobile?: boolean;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ isMobile = false }) => {
  const { filters, updateFilters, resetFilters, properties } = useProperties();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    price: true,
    propertyType: true,
    bedrooms: true,
    bathrooms: true,
    area: true,
  });

  // Calculate max price from properties
  const maxPriceInData = Math.max(...properties.map(property => property.price));
  const maxPrice = Math.ceil(maxPriceInData / 1000000) * 1000000;

  const locationOptions = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Miami, FL",
    "San Francisco, CA",
    "Boston, MA",
    "Austin, TX",
    "Denver, CO",
    "Seattle, WA",
  ];

  const propertyTypeOptions = [
    { value: 'all', label: 'All Properties' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const bedroomOptions = [
    { value: null, label: 'Any' },
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 5, label: '5+' },
  ];

  const bathroomOptions = [
    { value: null, label: 'Any' },
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 5, label: '5+' },
  ];

  const areaOptions = [
    { value: null, label: 'Any' },
    { value: 500, label: '500+ sqft' },
    { value: 1000, label: '1000+ sqft' },
    { value: 1500, label: '1500+ sqft' },
    { value: 2000, label: '2000+ sqft' },
    { value: 3000, label: '3000+ sqft' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className={`${isMobile ? 'block lg:hidden' : 'hidden lg:block'}`}>
      {isMobile && (
        <Button 
          onClick={toggleFilters}
          variant="outline"
          className="w-full mb-4 flex items-center justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      )}

      {isOpen && (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${isMobile ? '' : 'sticky top-20'}`}>
          <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-lg text-gray-900 dark:text-white">Filters</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Reset
            </Button>
          </div>

          <div className="p-5 space-y-6">
            {/* Sale/Rent Toggle */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection('status')}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">Status</h4>
                {expandedSections.status ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              
              {expandedSections.status && (
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={filters.status === 'all' ? 'default' : 'outline'}
                    className={`flex items-center justify-center ${filters.status === 'all' ? 'bg-real-600 hover:bg-real-700' : ''}`}
                    onClick={() => updateFilters({ status: 'all' })}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    All
                  </Button>
                  <Button 
                    variant={filters.status === 'sale' ? 'default' : 'outline'}
                    className={`flex items-center justify-center ${filters.status === 'sale' ? 'bg-real-600 hover:bg-real-700' : ''}`}
                    onClick={() => updateFilters({ status: 'sale' })}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    For Sale
                  </Button>
                  <Button 
                    variant={filters.status === 'rent' ? 'default' : 'outline'}
                    className={`flex items-center justify-center ${filters.status === 'rent' ? 'bg-real-600 hover:bg-real-700' : ''}`}
                    onClick={() => updateFilters({ status: 'rent' })}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    For Rent
                  </Button>
                </div>
              )}
            </div>
            
            {/* Location */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Location</h4>
              <select
                value={filters.location}
                onChange={(e) => updateFilters({ location: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Any Location</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection('price')}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">Price Range</h4>
                {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              
              {expandedSections.price && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{formatPrice(filters.priceMin)}</span>
                    <span>{formatPrice(filters.priceMax)}</span>
                  </div>
                  <Slider
                    defaultValue={[filters.priceMin, filters.priceMax]}
                    min={0}
                    max={maxPrice}
                    step={10000}
                    value={[filters.priceMin, filters.priceMax]}
                    onValueChange={(value) => {
                      updateFilters({
                        priceMin: value[0],
                        priceMax: value[1]
                      });
                    }}
                    className="mt-6"
                  />
                </div>
              )}
            </div>
            
            {/* Property Type */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection('propertyType')}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">Property Type</h4>
                {expandedSections.propertyType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              
              {expandedSections.propertyType && (
                <div className="space-y-2">
                  {propertyTypeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={filters.propertyType === option.value ? 'default' : 'outline'}
                      className={`w-full justify-start ${filters.propertyType === option.value ? 'bg-real-600 hover:bg-real-700' : ''}`}
                      onClick={() => updateFilters({ propertyType: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Bedrooms */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection('bedrooms')}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">Bedrooms</h4>
                {expandedSections.bedrooms ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              
              {expandedSections.bedrooms && (
                <div className="grid grid-cols-3 gap-2">
                  {bedroomOptions.map((option) => (
                    <Button
                      key={option.label}
                      variant={filters.bedrooms === option.value ? 'default' : 'outline'}
                      className={`text-center ${filters.bedrooms === option.value ? 'bg-real-600 hover:bg-real-700' : ''}`}
                      onClick={() => updateFilters({ bedrooms: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Bathrooms */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection('bathrooms')}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">Bathrooms</h4>
                {expandedSections.bathrooms ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              
              {expandedSections.bathrooms && (
                <div className="grid grid-cols-3 gap-2">
                  {bathroomOptions.map((option) => (
                    <Button
                      key={option.label}
                      variant={filters.bathrooms === option.value ? 'default' : 'outline'}
                      className={`text-center ${filters.bathrooms === option.value ? 'bg-real-600 hover:bg-real-700' : ''}`}
                      onClick={() => updateFilters({ bathrooms: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Area */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection('area')}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">Area Size</h4>
                {expandedSections.area ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
              
              {expandedSections.area && (
                <div className="space-y-2">
                  {areaOptions.map((option) => (
                    <Button
                      key={option.label}
                      variant={filters.areaMin === option.value ? 'default' : 'outline'}
                      className={`w-full justify-start ${filters.areaMin === option.value ? 'bg-real-600 hover:bg-real-700' : ''}`}
                      onClick={() => updateFilters({ areaMin: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
