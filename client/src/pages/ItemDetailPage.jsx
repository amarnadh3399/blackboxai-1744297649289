import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setItem(response.data.post);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading item details...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <img src={item.imageURL} alt={item.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-700 mb-4">{item.description}</p>
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {item.category}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {item.location}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
      <p className={`text-xs px-2 py-1 rounded-full ${item.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {item.status === 'resolved' ? 'Resolved' : 'Unresolved'}
      </p>
    </div>
  );
};

export default ItemDetailPage;