const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all message routes
router.use(authController.protect);

// Message CRUD operations
router.post('/', messageController.sendMessage); // Create new message

// Get messages
router.get('/', messageController.getMessages); // Get all user messages
router.get('/with/:userId', messageController.getMessageThread); // Get thread with specific user
router.get('/about/:postId', messageController.getMessagesAboutPost); // Get messages about specific post

module.exports = router;
