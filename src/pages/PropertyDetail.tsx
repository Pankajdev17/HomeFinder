
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useProperties } from '@/context/PropertyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  SquareIcon, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Share2,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperties();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [property, setProperty] = useState(getPropertyById(id || ''));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const placeholderImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop";
  
  const favorite = isFavorite(property?.id || '');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set property
    setProperty(getPropertyById(id || ''));
  }, [id, getPropertyById]);
  
  if (!property) {
    return (
      <div>
        <Navbar />
        <main className="pt-20 pb-20 min-h-screen">
          <div className="container-custom mx-auto">
            <div className="flex flex-col items-center justify-center py-16">
              <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">The property you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/properties">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Properties
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  const handleSubmitInquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Your inquiry has been sent!');
      setSubmitting(false);
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };
  
  const formatPrice = (price: number, unit: string): string => {
    return unit === '$'
      ? `${unit}${price.toLocaleString()}`
      : `${unit}${price.toLocaleString()}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Create a Google Maps embed URL using the property address
  const getGoogleMapsUrl = () => {
    const fullAddress = encodeURIComponent(`${property.location.address}, ${property.location.city}, ${property.location.state} ${property.location.zip}`);
    return `https://maps.google.com/maps?q=${fullAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };
  
  return (
    <div>
      <Navbar />
      <main className="pt-20 pb-16">
        {/* Property Header */}
        <section className="bg-white dark:bg-gray-900 shadow-sm">
          <div className="container-custom mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="flex items-center mb-2">
                  <Link to="/properties" className="text-gray-500 dark:text-gray-400 hover:text-real-600 dark:hover:text-real-400 mr-2">
                    Properties
                  </Link>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">{property.title}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{property.title}</h1>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="flex items-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button 
                  variant={favorite ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleFavoriteClick}
                  className={`flex items-center ${
                    favorite ? 'bg-red-500 hover:bg-red-600 border-red-500' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${favorite ? 'fill-current' : ''}`} />
                  {favorite ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className={`badge ${property.status === 'sale' ? 'badge-sale' : 'badge-rent'}`}>
                For {property.status === 'sale' ? 'Sale' : 'Rent'}
              </span>
              {property.badges.includes('featured') && (
                <span className="badge bg-real-600 text-white">Featured</span>
              )}
              {property.badges.includes('new') && (
                <span className="badge bg-emerald-500 text-white">New</span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-3xl font-bold text-real-600 dark:text-real-400">
                  {formatPrice(property.price, property.priceUnit)}
                  {property.status === 'rent' && <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/month</span>}
                </p>
              </div>
              <div className="flex items-center justify-start md:justify-end space-x-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center">
                  <SquareIcon className="h-5 w-5 mr-2" />
                  <span>{property.area} sqft</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Property Content */}
        <section className="py-10">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column - Property Details */}
              <div className="lg:col-span-2">
                {/* Image Gallery */}
                <div className="mb-10 relative rounded-lg overflow-hidden">
                  <img 
                    src={imageError ? placeholderImage : property.images[currentImageIndex]} 
                    alt={`Property ${currentImageIndex + 1}`}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  
                  {/* Image Navigation */}
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={prevImage}
                      className="rounded-full bg-black/30 text-white hover:bg-black/40"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={nextImage}
                      className="rounded-full bg-black/30 text-white hover:bg-black/40"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-5 gap-2 mb-10">
                  {property.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index 
                          ? 'border-real-600' 
                          : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-16 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Set thumbnail to placeholder if it fails to load
                          (e.target as HTMLImageElement).src = placeholderImage;
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Description */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {property.description}
                  </p>
                </div>
                
                {/* Features */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Property Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-real-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Location with Google Maps */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Location</h2>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-64 mb-4 relative">
                    {mapLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 z-10">
                        <Loader2 className="h-8 w-8 text-real-600 animate-spin" />
                      </div>
                    )}
                    <iframe
                      src={getGoogleMapsUrl()}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${property.location.address}`}
                      onLoad={() => setMapLoading(false)}
                      className="z-0"
                    ></iframe>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
                  </p>
                </div>
              </div>
              
              {/* Right Column - Agent & Contact */}
              <div className="lg:col-span-1">
                {/* Agent Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <img 
                      src={property.agent.image} 
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{property.agent.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Real Estate Agent</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Phone className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Mail className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{property.agent.email}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-real-600 hover:bg-real-700">
                    Contact Agent
                  </Button>
                </div>
                
                {/* Property Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Property Information</h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Property ID:</span>
                      <span className="font-medium">{property.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Property Type:</span>
                      <span className="font-medium capitalize">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="font-medium capitalize">For {property.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Area:</span>
                      <span className="font-medium">{property.area} sqft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Bedrooms:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Bathrooms:</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Listed:</span>
                      <span className="font-medium">{property.listed}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Request Information</h3>
                  <form onSubmit={handleSubmitInquiry}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            required
                            className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            required
                            className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Your phone (optional)"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="I'm interested in this property..."
                          defaultValue={`I'm interested in ${property.title} (ID: ${property.id}). Please provide more information.`}
                        ></textarea>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-real-600 hover:bg-real-700"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Inquiry'
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
