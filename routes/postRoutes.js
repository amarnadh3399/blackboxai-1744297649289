const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Protected routes
router.use(authController.protect);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;