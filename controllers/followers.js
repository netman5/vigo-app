const db = require('../db/db');
const { validationResult } = require('express-validator');
const { followUser } = require('../db/db');

// follow a user
exports.followUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { user_id, following_id } = req.body;
    const result = await followUser(user_id, following_id);
    res.status(200).json({ message: 'You are now following this user', result });
  } catch (error) {
    next(error);
  }
}

// unfollow a user
exports.unfollowUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { user_id, following_id } = req.body;
    const result = await db.unfollowUser(user_id, following_id);
    res.status(200).json({ message: 'You are no longer following this user', result });
  } catch (error) {
    next(error);
  }
}

// get all followers of a user
exports.getFollowers = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const followers = await db.getFollowers(user_id);
    res.status(200).json({
      message: 'Followers retrieved successfully',
      followers
    });
  } catch (error) {
    next(error);
  }
}