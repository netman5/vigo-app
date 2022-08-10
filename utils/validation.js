const { check } = require('express-validator');

const signupValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Pls Provide valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password lenght must be 8 or more characters').isLength({ min: 8 }),
];

const loginValidator = [
  check('email', 'Valid Email is required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password lenght must be 8 or more characters').isLength({ min: 8 }),
]
module.exports = {
  signupValidator,
  loginValidator,
}