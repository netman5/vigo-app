const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
authRouter.use(cookieParser());

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Vigo API',
  })
})

// Authendication routes
app.use('/api', authRouter);

// error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message,
})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});