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

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);

    if(!user) {
      return res.status(400).json({
        message: 'User does not exist or Invalid credentials'
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if(isMatch){
      user.password = undefined;
      const jsToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', jsToken, { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(Date.now() + 86400000) });
      return res.status(200).json({
        message: 'User logged in successfully',
        token: jsToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
}

const getUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.getVerifiedUser(decoded.user.id);
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist or Invalid credentials'
      });
    }

    const { id, name, email } = user;
    return res.status(200).json({
      message: 'User logged in successfully',
      user: {id, name, email}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  register,
  login,
  getUser
}