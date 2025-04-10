import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import SearchBar from '@/components/ui/SearchBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useProperties } from '@/context/PropertyContext';
import { Loader2, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Properties: React.FC = () => {
  const { filteredProperties, loading, updateFilters } = useProperties();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const propertiesPerPage = 6;
  
  // Parse URL params and set filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    const typeParam = params.get('type');
    
    if (statusParam) {
      updateFilters({ status: statusParam as 'sale' | 'rent' | 'all' });
    }
    
    if (typeParam) {
      updateFilters({ propertyType: typeParam });
    }
  }, [location.search, updateFilters]);
  
  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="bg-real-600 text-white py-16">
          <div className="container-custom mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Properties</h1>
            <p className="text-blue-100 mb-8 max-w-2xl">
              Explore our extensive collection of properties available for sale and rent. 
              Use filters to find your perfect match.
            </p>
            <SearchBar className="max-w-2xl" />
          </div>
        </div>
        
        {/* Properties Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar for Desktop */}
              <div className="lg:col-span-1">
                <PropertyFilters />
              </div>
              
              {/* Properties Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex flex-wrap justify-between items-center">
                  {/* Mobile Filters */}
                  <PropertyFilters isMobile />
                  
                  <div className="flex items-center justify-between w-full">
                    <p className="text-gray-600 dark:text-gray-400">
                      Showing <span className="font-medium">{filteredProperties.length}</span> properties
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-real-600 hover:bg-real-700' : ''}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-real-600 hover:bg-real-700' : ''}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 text-real-600 animate-spin" />
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No properties found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters for better results</p>
                  </div>
                ) : (
                  <div className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-6"
                  }>
                    {currentProperties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {filteredProperties.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex space-x-2">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          if (totalPages <= 5) return true;
                          if (page === 1 || page === totalPages) return true;
                          if (Math.abs(currentPage - page) <= 1) return true;
                          return false;
                        })
                        .map((page, index, array) => {
                          if (index > 0 && array[index - 1] !== page - 1) {
                            return (
                              <React.Fragment key={`ellipsis-${page}`}>
                                <Button variant="ghost" disabled>
                                  ...
                                </Button>
                                <Button
                                  variant={currentPage === page ? 'default' : 'outline'}
                                  onClick={() => paginate(page)}
                                  className={currentPage === page ? 'bg-real-600 hover:bg-real-700' : ''}
                                >
                                  {page}
                                </Button>
                              </React.Fragment>
                            );
                          }
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? 'default' : 'outline'}
                              onClick={() => paginate(page)}
                              className={currentPage === page ? 'bg-real-600 hover:bg-real-700' : ''}
                            >
                              {page}
                            </Button>
                          );
                        })}
                      
                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
