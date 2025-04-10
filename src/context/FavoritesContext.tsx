
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface Property {
  id: string;
  [key: string]: any;
}

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (property: Property) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    // Save to localStorage when favorites change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (property: Property) => {
    if (!favorites.includes(property.id)) {
      setFavorites(prev => [...prev, property.id]);
      toast.success('Added to favorites!');
    }
  };

  const removeFromFavorites = (propertyId: string) => {
    setFavorites(prev => prev.filter(id => id !== propertyId));
    toast.info('Removed from favorites');
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
