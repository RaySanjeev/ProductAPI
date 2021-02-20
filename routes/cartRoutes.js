const express = require('express');

const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    cartController.viewOrders
  );

router
  .route('/:productID')
  .post(authController.protect, cartController.addToCart);

router.route('/mycart').get(authController.protect, cartController.displayCart);

module.exports = router;
