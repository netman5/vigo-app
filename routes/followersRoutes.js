const express = require('express');
const router = express.Router();
const { followUser, getFollowers, unfollowUser } = require('../controllers/followers');
const { jwtTokenVerification } = require('../controllers/auth');

router.get('/followers', jwtTokenVerification, getFollowers);
router.post('/follow', jwtTokenVerification, followUser);
router.post('/unfollow', jwtTokenVerification, unfollowUser);

module.exports = router;