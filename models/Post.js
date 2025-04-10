const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Electronics',
      'Documents',
      'Clothing',
      'Jewelry',
      'Keys',
      'Pets',
      'Other'
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  imageURL: {
    type: String,
    required: [true, 'Please upload an image']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  status: {
    type: String,
    enum: ['resolved', 'unresolved'],
    default: 'unresolved'
  },
  date: {
    type: Date,
    required: [true, 'Please provide the date']
  },
  userRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location searches
postSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Post', postSchema);