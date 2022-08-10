const express = require('express');
const router = express.Router();
const { signupValidator, loginValidator } = require('../utils/validation');

const { register, login, getUser } = require('../controllers/auth');

router.post('/register', signupValidator, register);
router.post('/login', loginValidator, login);
router.post('/get-user', signupValidator, getUser)

module.exports = router;