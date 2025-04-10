import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-gray-500 text-lg">Lost & Found</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            {user ? (
              <>
                <Link
                  to="/report-lost"
                  className="py-2 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
                >
                  Report Lost
                </Link>
                <Link
                  to="/report-found"
                  className="py-2 px-3 bg-purple-500 text-white rounded hover:bg-purple-400 transition duration-300"
                >
                  Report Found
                </Link>
                <Link
                  to="/messages"
                  className="py-2 px-3 bg-indigo-500 text-white rounded hover:bg-indigo-400 transition duration-300"
                >
                  Messages
                </Link>
                <button 
                  onClick={logout}
                  className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-400 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="py-2 px-3 bg-green-500 text-white rounded hover:bg-green-400 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}