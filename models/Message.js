const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  postRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Message cannot be empty'],
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

// Indexes for faster querying
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ postRef: 1 });
messageSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Message', messageSchema);