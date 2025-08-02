const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  likePost,
  addCommentToPost, 
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
router.route('/').post(protect, upload.single('image'), createPost).get(protect, getAllPosts);
router.route('/:id/like').put(protect, likePost);
router.route('/:id/comment').post(protect, addCommentToPost);

module.exports = router;