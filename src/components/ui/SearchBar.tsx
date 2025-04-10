
import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/context/PropertyContext';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', compact = false }) => {
  const { searchTerm, setSearchTerm, loading } = useProperties();
  const [inputValue, setInputValue] = useState(searchTerm);
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
      setLocalLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setLocalLoading(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    navigate('/properties');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center ${className}`}
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={compact ? "Search properties..." : "Search by city, address, or zip code..."}
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full pl-10 ${
            compact 
              ? 'pr-8 py-2 text-sm' 
              : 'pr-12 py-3 text-base'
          } bg-white dark:text-white text-black dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-real-400 focus:border-transparent`}
        />
        {(localLoading || loading) && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
        )}
      </div>
      {!compact && (
        <Button 
          type="submit" 
          className="ml-2 bg-real-700"
        >
          Search
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
