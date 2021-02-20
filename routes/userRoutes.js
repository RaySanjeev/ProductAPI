const express = require('express');

const bookingRouter = require('./bookingRoutes');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/bookings', bookingRouter);

router.route('/signUp').post(authController.signUp);
router.route('/login').get(authController.login);

router
  .route('/updateMe')
  .patch(authController.protect, userController.updateMe);

router
  .route('/updatePassword')
  .post(authController.protect, authController.updatePassword);

module.exports = router;
