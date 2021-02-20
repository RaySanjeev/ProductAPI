const express = require('express');

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.addProduct
  )
  .get(authController.protect, productController.getAllProduct);

router.route('/:id').get(productController.getProduct);

module.exports = router;
