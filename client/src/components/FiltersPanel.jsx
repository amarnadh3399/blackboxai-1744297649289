import React from 'react';

const FiltersPanel = ({ filters, onFilterChange }) => {
  const categories = [
    'Electronics',
    'Documents',
    'Clothing',
    'Jewelry',
    'Keys',
    'Pets',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Statuses</option>
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Search by location"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <input
            type="date"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={() => onFilterChange({
            category: '',
            status: '',
            location: '',
            dateRange: ''
          })}
          className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;