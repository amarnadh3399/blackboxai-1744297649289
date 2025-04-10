import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (activeTab === 'listings') {
          const res = await axios.get('/api/posts', {
            params: { userRef: user._id }
          });
          setListings(res.data.posts);
        } else {
          const res = await axios.get('/api/messages');
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [activeTab, user._id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'listings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : activeTab === 'listings' ? (
        <div className="space-y-4">
          {listings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't created any listings yet</p>
              <Link 
                to="/report-lost" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Report a Lost Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.map(listing => (
                <div key={listing._id} className="border rounded-lg p-4">
                  <h3 className="font-medium">{listing.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{listing.type === 'lost' ? 'Lost' : 'Found'}</p>
                  <p className={`text-xs px-2 py-1 rounded-full inline-block ${listing.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {listing.status === 'resolved' ? 'Resolved' : 'Unresolved'}
                  </p>
                  <Link 
                    to={`/item/${listing._id}`} 
                    className="block mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No messages yet</p>
          ) : (
            messages.map(message => (
              <div key={message._id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {message.sender._id === user._id ? 
                      `To: ${message.receiver.name}` : 
                      `From: ${message.sender.name}`}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{message.content}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;