const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const APIFeatures = require('../utils/ApiFeatures');

exports.addProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: product,
  });
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
  // let filter = {};
  // if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const products = await features.query;
  // const products = await Product.find();

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});
