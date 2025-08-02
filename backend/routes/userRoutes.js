const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getMyProfile,
  followUser,
  updateUserProfile,
} = require('../controllers/usercontroller');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/me', protect, getMyProfile);
router.put('/profile', protect, upload.single('profilePic'), updateUserProfile);

router.put('/:id/follow', protect, followUser);
router.get('/:username', getUserProfile);

module.exports = router;