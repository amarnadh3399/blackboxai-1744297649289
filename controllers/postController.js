const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      type: req.body.type,
      imageURL: req.body.imageURL,
      location: req.body.location,
      coordinates: req.body.coordinates,
      date: req.body.date,
      userRef: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: {
        post: newPost
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// Get all posts with filters
exports.getAllPosts = async (req, res) => {
  try {
    const { category, location, dateRange, status } = req.query;

    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(',');
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const posts = await Post.find(query).populate('userRef', 'name email');

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userRef', 'name email');

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};