const express = require('express');

const bookingRouter = require('./bookingRoutes');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/bookings', bookingRouter);

router.route('/signUp').post(authController.signUp);
router.route('/login').get(authController.login);

router.use(authController.protect);

router.route('/updateMe').patch(userController.updateMe);

router.route('/updatePassword').post(authController.updatePassword);

module.exports = router;
