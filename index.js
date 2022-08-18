const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const followRoute = require('./routes/followersRoutes');
const postsRoutes = require('./routes/postsRoutes');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true,
}));
authRouter.use(cookieParser());

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Vigo API',
  })
})

// Authendication routes
app.use('/api/auth', authRouter);
app.use('/api', followRoute);
app.use('/api/posts', postsRoutes);

// error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message,
})
});

const start = () => {
  try {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

start();