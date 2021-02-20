const express = require('express');

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/:id').get(productController.getProduct);

router.use(authController.protect);

router
  .route('/')
  .post(authController.restrictTo('admin'), productController.addProduct)
  .get(productController.getAllProduct);

module.exports = router;
