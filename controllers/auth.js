const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../db/db');

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await db.createUser(name, email, hashPassword);
    const jsToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', jsToken, { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(Date.now() + 86400000) });
    return res.status(201).json({
      message: 'User created successfully',
      token: jsToken,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message
    });
  }

  }

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ${db.escape(email)}`;
  // const values = [email];
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    } else {
      if (result.length === 0) {
        return res.status(400).json({
          message: 'User does not exist'
        });
      } else {
        const user = result[0];
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({
            message: 'Incorrect password'
          });
        } else {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
          return res.status(200).json({
            message: 'User logged in successfully',
            token,
            user
          });
        }
      }
    }
  })
  // next();
}

const getUser = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [decoded.id];
  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    } else {
      if (result.rows.length === 0) {
        return res.status(400).json({
          message: 'User does not exist'
        });
      } else {
        return res.status(200).json({
          message: 'User found',
          user: result.rows[0]
        });
      }
    }
  })
};

module.exports = {
  register,
  login,
  getUser
}