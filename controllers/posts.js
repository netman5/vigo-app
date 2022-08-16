const db = require('../db/db');

const createPost = async (req, res, next) => {
  try {

    if(!req.file) {
      return res.status(400).json({
        message: 'No image provided'
      });
    }
    const { id } = req.user;
    const { content } = req.body;
    const post = await db.createPostWithImage(id, content, req.file.path);
    return res.status(200).json({
      message: 'Post uploaded successfully',
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}

const getPosts = async (req, res, next) => {
  try {
    const posts = await db.getPosts();
    return res.status(200).json({
      message: 'Posts retrieved successfully',
      posts
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}


const getPostsByUserId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const posts = await db.getPostsByUserId(id);
    return res.status(200).json({
      message: 'Posts retrieved successfully',
      posts
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await db.getPostById(id);
    return res.status(200).json({
      message: 'Post retrieved successfully',
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}


module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostById
};