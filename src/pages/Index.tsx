
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import SearchBar from '@/components/ui/SearchBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Shield, ThumbsUp } from 'lucide-react';

const Index = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        
        {/* Search Section */}
        <section className="py-20 bg-real-600 text-white">
          <div className="container-custom mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Find Your Dream Home Today</h2>
              <p className="text-blue-100 max-w-xl mx-auto">
                Search from thousands of properties matching your criteria across the country
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <SearchBar className="mb-6" />
              <div className="flex justify-center space-x-4">
                <Button asChild variant="secondary">
                  <Link to="/properties?status=sale">Buy Properties</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/properties?status=rent">Rent Properties</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-real-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Wide Coverage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find properties in over 100 cities across the country with detailed location information.
                </p>
              </div>
              
              <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-8 w-8 text-real-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verified Listings</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All our listings are verified to ensure you get accurate and up-to-date information.
                </p>
              </div>
              
              <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-real-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Process</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data and transactions are secure, giving you peace of mind throughout your search.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        <BlogSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container-custom mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Start your journey today with HomeFinder and discover a property that perfectly matches your needs and preferences.
            </p>
            <Button asChild size="lg" className="bg-real-600 hover:bg-real-700">
              <Link to="/properties" className="flex items-center">
                Browse All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
