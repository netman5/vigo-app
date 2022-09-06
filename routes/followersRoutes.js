const express = require('express');
const router = express.Router();
const { followUser, getFollowers, unfollowUser } = require('../controllers/followers');
const { jwtTokenVerification } = require('../controllers/auth/auth');

router.get('/:id/followers', jwtTokenVerification, getFollowers);
router.post('/:id/follow', jwtTokenVerification, followUser);
router.post('/:id/unfollow', jwtTokenVerification, unfollowUser);

module.exports = router;