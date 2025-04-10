
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import propertiesData from '../data/properties.json';

// Property types
export interface Property {
  id: string;
  title: string;
  price: number;
  priceUnit: string;
  location: {
    city: string;
    state: string;
    address: string;
    zip: string;
  };
  images: string[];
  badges: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  propertyType: string;
  listed: string;
  status: 'sale' | 'rent';
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

interface PropertyFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  propertyType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  areaMin: number | null;
  status: 'sale' | 'rent' | 'all';
  [key: string]: string | number | null;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: PropertyFilters;
  loading: boolean;
  searchTerm: string;
  updateFilters: (newFilters: Partial<PropertyFilters>) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
  getPropertyById: (id: string) => Property | undefined;
}

const initialFilters: PropertyFilters = {
  location: '',
  priceMin: 0,
  priceMax: 10000000,
  propertyType: 'all',
  bedrooms: null,
  bathrooms: null,
  areaMin: null,
  status: 'all',
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties] = useState<Property[]>(propertiesData as Property[]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
  ) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }

      return new Promise(resolve => {
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
    };
  };

  const applyFilters = useCallback(() => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let result = [...properties];
      
      // Apply search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          property => 
            property.title.toLowerCase().includes(term) ||
            property.location.city.toLowerCase().includes(term) ||
            property.location.state.toLowerCase().includes(term) ||
            property.location.address.toLowerCase().includes(term)
        );
      }
      
      // Apply location filter
      if (filters.location) {
        const location = filters.location.toLowerCase();
        result = result.filter(
          property => 
            property.location.city.toLowerCase().includes(location) ||
            property.location.state.toLowerCase().includes(location) ||
            property.location.zip.includes(location)
        );
      }
      
      // Apply price filters
      result = result.filter(
        property => property.price >= filters.priceMin && property.price <= filters.priceMax
      );
      
      // Apply property type filter
      if (filters.propertyType !== 'all') {
        result = result.filter(
          property => property.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
        );
      }
      
      // Apply bedrooms filter
      if (filters.bedrooms !== null) {
        result = result.filter(property => property.bedrooms >= filters.bedrooms!);
      }
      
      // Apply bathrooms filter
      if (filters.bathrooms !== null) {
        result = result.filter(property => property.bathrooms >= filters.bathrooms!);
      }
      
      // Apply area filter
      if (filters.areaMin !== null) {
        result = result.filter(property => property.area >= filters.areaMin!);
      }
      
      // Apply status filter (rent/sale)
      if (filters.status !== 'all') {
        result = result.filter(property => property.status === filters.status);
      }
      
      setFilteredProperties(result);
      setLoading(false);
    }, 600); // simulate loading delay
  }, [properties, filters, searchTerm]);

  useEffect(() => {
    const debouncedApplyFilters = debounce(applyFilters, 500);
    debouncedApplyFilters();
  }, [applyFilters]);

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm('');
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  return (
    <PropertyContext.Provider 
      value={{ 
        properties, 
        filteredProperties, 
        filters, 
        loading, 
        searchTerm,
        updateFilters, 
        setSearchTerm, 
        resetFilters,
        getPropertyById
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
