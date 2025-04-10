import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ReportPage = ({ type }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    location: '',
    coordinates: { lat: 0, lng: 0 },
    date: new Date().toISOString().split('T')[0],
    image: null,
    previewURL: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        previewURL: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('category', formData.category);
      formPayload.append('type', type);
      formPayload.append('location', formData.location);
      formPayload.append('coordinates', JSON.stringify(formData.coordinates));
      formPayload.append('date', formData.date);
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      await axios.post('/api/posts', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Report {type === 'lost' ? 'Lost' : 'Found'} Item
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            maxLength="100"
          />
        </div>

        <div>
          <label className="block mb-1">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
            maxLength="1000"
          />
        </div>

        <div>
          <label className="block mb-1">Category*</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Clothing">Clothing</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Keys">Keys</option>
            <option value="Pets">Pets</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Date*</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image*</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {formData.previewURL && (
            <div className="mt-2">
              <img 
                src={formData.previewURL} 
                alt="Preview" 
                className="h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportPage;