const express = require('express');
const router = express.Router();
const { jwtTokenVerification } = require('../controllers/auth');
const { createPost, getPosts, getPostsByUserId, getPostById } = require('../controllers/posts');

router.post('/', jwtTokenVerification, createPost);
router.get('/', jwtTokenVerification, getPosts);
router.get('/user', jwtTokenVerification, getPostsByUserId);
router.get('/user/:id', jwtTokenVerification, getPostById);

module.exports = router;