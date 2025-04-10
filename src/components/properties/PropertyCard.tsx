
import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, SquareIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Property } from '@/context/PropertyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Skeleton } from '@/components/ui/skeleton';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(property.id);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const placeholderImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const formatPrice = (price: number, unit: string): string => {
    return unit === '$'
      ? `${unit}${price.toLocaleString()}`
      : `${unit}${price.toLocaleString()}`;
  };

  return (
    <div className="property-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <Link to={`/property/${property.id}`}>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <Loader2 className="h-6 w-6 text-real-600 animate-spin" />
            </div>
          )}
          <img 
            src={imageError ? placeholderImage : property.images[0]} 
            alt={property.title}
            className={`w-full h-56 object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            onError={handleImageError}
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ${
            favorite ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-red-500'
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
        </Button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {property.badges.includes('featured') && (
            <span className="badge bg-real-600 text-white">Featured</span>
          )}
          {property.badges.includes('new') && (
            <span className="badge bg-emerald-500 text-white">New</span>
          )}
          <span className={`badge ${property.status === 'sale' ? 'badge-sale' : 'badge-rent'}`}>
            For {property.status === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            <Link to={`/property/${property.id}`} className="hover:text-real-600 dark:hover:text-real-400 transition-colors">
              {property.title}
            </Link>
          </h3>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
            <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
            <span className="text-sm truncate">
              {property.location.address}, {property.location.city}, {property.location.state}
            </span>
          </div>
        </div>
        
        <p className="text-2xl font-bold text-real-600 dark:text-real-400 mb-4">
          {formatPrice(property.price, property.priceUnit)}
          {property.status === 'rent' && <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/month</span>}
        </p>
        
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <SquareIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
