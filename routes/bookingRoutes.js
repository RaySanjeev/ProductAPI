const express = require('express');

const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.getAllBookings
  );

router
  .route('/:productID')
  .post(authController.protect, bookingController.createBooking);

router
  .route('/my-bookings')
  .get(authController.protect, bookingController.getUserBookings);

module.exports = router;
