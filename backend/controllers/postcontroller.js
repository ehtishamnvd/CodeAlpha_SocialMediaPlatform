
const Post = require('../models/Post');
const User = require('../models/User');


const createPost = async (req, res) => {
  const { content } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an image' });
  }
  const post = new Post({
    content,
    imageUrl: `/${req.file.path.replace(/\\/g, "/")}`,
    user: req.user._id,
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
};


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePic')
      .populate('comments.user', 'username profilePic'); 
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const addCommentToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const comment = {
      text: text,
      user: req.user._id,
    };
    post.comments.unshift(comment);
    await post.save();
   
    const populatedPost = await Post.findById(post._id)
        .populate('user', 'username profilePic')
        .populate('comments.user', 'username profilePic');
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Ensure all functions are exported
module.exports = {
  createPost,
  getAllPosts,
  likePost,
  addCommentToPost,
};