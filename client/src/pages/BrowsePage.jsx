import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import FiltersPanel from '../components/FiltersPanel';

const BrowsePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    location: '',
    dateRange: ''
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.dateRange) queryParams.append('dateRange', filters.dateRange);

        const response = await axios.get(`/api/posts?${queryParams.toString()}`);
        setListings(response.data.posts);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) return <div className="text-center mt-8">Loading listings...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FiltersPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="md:w-3/4">
          {listings.length === 0 ? (
            <p className="text-center text-gray-500">No listings found matching your criteria</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(listing => (
                <ItemCard key={listing._id} item={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;