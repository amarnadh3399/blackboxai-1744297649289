const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { recipient, content, postRef } = req.body;

  if (!postRef) {
    res.status(400);
    throw new Error('Please specify the item this message is about');
  }

  const message = await Message.create({
    sender: req.user._id,
    recipient,
    postRef,
    content
  });

  // Populate sender and post details
  const populatedMessage = await Message.findById(message._id)
    .populate('sender', 'name')
    .populate('postRef', 'title');

  res.status(201).json(populatedMessage);
});

// @desc    Get messages for a user
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id },
      { recipient: req.user._id }
    ]
  })
  .sort({ createdAt: -1 })
  .populate('sender recipient', 'name email');

  res.json(messages);
});

// @desc    Get message thread between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessageThread = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, recipient: req.params.userId },
      { sender: req.params.userId, recipient: req.user._id }
    ]
  })
  .sort({ createdAt: 1 })
  .populate('sender recipient', 'name email');

  res.json(messages);
});

module.exports = {
  sendMessage,
  getMessages,
  getMessageThread
};