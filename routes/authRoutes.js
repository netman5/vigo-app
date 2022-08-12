const express = require('express');
const router = express.Router();
const { signupValidator, loginValidator } = require('../utils/validation');

const { register, login, logout, getUser } = require('../controllers/auth/auth');

router.post('/register', signupValidator, register);
router.post('/login', loginValidator, login);
router.post('/get-user', signupValidator, getUser)
router.post('/logout', logout);

module.exports = router;