const express = require('express');

const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), cartController.viewOrders);

router.route('/:productID').post(cartController.addToCart);

router.route('/mycart').get(cartController.displayCart);

module.exports = router;
