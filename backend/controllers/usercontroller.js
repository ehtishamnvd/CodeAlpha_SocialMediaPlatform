
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.bio = req.body.bio || user.bio;
      if (req.file) {
        user.profilePic = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
        token: generateToken(updatedUser._id), 
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const registerUser = async (req, res) => {
  const { username, email, password, bio } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, email, password, bio });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('followers', 'username profilePic')
      .populate('following', 'username profilePic');
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('followers', 'username profilePic')
      .populate('following', 'username profilePic');
      
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (userToFollow.id === currentUser.id) {
        return res.status(400).json({ message: "You cannot follow yourself." });
    }

    if (currentUser.following.includes(userToFollow.id)) {
      currentUser.following = currentUser.following.filter(id => id.toString() !== userToFollow.id.toString());
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUser.id.toString());
      
      await currentUser.save();
      await userToFollow.save();
      res.json({ message: 'User Unfollowed' });
    } else {
      currentUser.following.push(userToFollow.id);
      userToFollow.followers.push(currentUser.id);

      await currentUser.save();
      await userToFollow.save();
      res.json({ message: 'User Followed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getMyProfile, followUser, updateUserProfile };
