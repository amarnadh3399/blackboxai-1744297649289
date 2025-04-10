import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const ItemCard = ({ item }) => {
  const statusColor = item.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  const typeColor = item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {item.imageURL && (
          <img 
            src={item.imageURL} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{item.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${typeColor}`}>
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FaMapMarkerAlt className="mr-1" />
          <span>{item.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <FaCalendarAlt className="mr-1" />
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
            {item.status === 'resolved' ? 'Resolved' : 'Unresolved'}
          </span>
          <Link 
            to={`/item/${item._id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;