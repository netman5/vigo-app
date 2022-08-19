const express = require('express');
const router = express.Router();
const { jwtTokenVerification } = require('../controllers/auth/auth');
const { createPost, getPosts, getPostsByUserId, getPostById } = require('../controllers/posts');
const upload = require('../utils/multer');

router.get('/posts', jwtTokenVerification, getPosts);
router.post('/posts', upload.single('image'), jwtTokenVerification, createPost);
router.get('/:id', jwtTokenVerification, getPostById);
router.get('/user/:id', jwtTokenVerification, getPostsByUserId);

module.exports = router;