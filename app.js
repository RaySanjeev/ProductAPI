const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

// Adding incoming request data to the req.body
app.use(express.json({ limit: '10kb' })); // JSON Parser
app.use(express.urlencoded({ extended: true })); // Form parser
app.use(cookieParser()); // Cookie Parser

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/bookings', bookingRouter);

// GLOBAL ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
