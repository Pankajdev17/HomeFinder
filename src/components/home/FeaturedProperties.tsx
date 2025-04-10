
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/properties/PropertyCard';
import { useProperties } from '@/context/PropertyContext';

const FeaturedProperties: React.FC = () => {
  const { properties } = useProperties();
  
  // Get featured properties
  const featuredProperties = properties
    .filter(property => property.badges.includes('featured'))
    .slice(0, 3);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Properties</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Handpicked properties by our experts to match your lifestyle and preferences
            </p>
          </div>
          <Link 
            to="/properties" 
            className="mt-4 md:mt-0 inline-flex items-center text-real-600 hover:text-real-700 dark:text-real-400 dark:hover:text-real-300 font-medium"
          >
            View all properties
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
