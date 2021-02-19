const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

// Adding incoming request data to the req.body
app.use(express.json({ limit: '10kb' })); // JSON Parser
app.use(express.urlencoded({ extended: true })); // Form parser
app.use(cookieParser()); // Cookie Parser

// ROUTES
app.use('/api/v1/users', userRouter);

// GLOBAL ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
