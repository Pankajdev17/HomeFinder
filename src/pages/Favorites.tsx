
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useProperties } from '@/context/PropertyContext';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { properties } = useProperties();
  
  // Get only favorited properties
  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  );
  
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="bg-real-600 text-white py-16">
          <div className="container-custom mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Favorites</h1>
            <p className="text-blue-100 mb-8 max-w-2xl">
              Properties you've saved for future reference. Compare and make informed decisions.
            </p>
          </div>
        </div>
        
        {/* Favorites Content */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="container-custom mx-auto">
            {favoriteProperties.length > 0 ? (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  You have <span className="font-medium">{favoriteProperties.length}</span> saved properties
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No favorites yet</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Start adding properties to your favorites by clicking the heart icon on any property card.
                </p>
                <Button asChild className="bg-real-600 hover:bg-real-700">
                  <Link to="/properties" className="flex items-center">
                    Browse Properties
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
