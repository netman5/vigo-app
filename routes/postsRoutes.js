const express = require('express');
const router = express.Router();
const { jwtTokenVerification } = require('../controllers/auth/auth');
const { createPost, getPosts, getPostsByUserId, getPostById } = require('../controllers/posts');
const upload = require('../utils/multer');

router.get('/', jwtTokenVerification, getPosts);
router.post('/', upload.single('image'), express.static('uploads'), jwtTokenVerification, createPost);
router.get('/user', jwtTokenVerification, getPostsByUserId);
router.get('/user/:id', jwtTokenVerification, getPostById);

module.exports = router;