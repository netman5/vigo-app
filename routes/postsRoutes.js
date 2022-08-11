const express = require('express');
const router = express.Router();
const { jwtTokenVerification } = require('../controllers/auth/auth');
const { createPost, getPosts, getPostsByUserId, getPostById } = require('../controllers/posts');
const upload = require('../utils/multer');

router.post('/', upload.single('image'), jwtTokenVerification, createPost);
router.get('/', jwtTokenVerification, getPosts);
router.get('/user', jwtTokenVerification, getPostsByUserId);
router.get('/user/:id', jwtTokenVerification, getPostById);

module.exports = router;