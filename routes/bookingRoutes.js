const express = require('express');

const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), bookingController.getAllBookings);

router.route('/:productID').post(bookingController.createBooking);

router.route('/my-bookings').get(bookingController.getUserBookings);

module.exports = router;
