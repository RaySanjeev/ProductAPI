const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.addToCart = catchAsync(async (req, res, next) => {
  const productID = req.params.productID;
  const userID = req.user._id;

  const cart = await Cart.find({ user: userID });

  let cartItem;
  if (cart.length === 0) {
    cartItem = await Cart.create({
      user: userID,
      products: [productID],
    });
  } else {
    cartItem = await Cart.findOneAndUpdate(
      { user: userID },
      {
        $push: { products: productID },
      },
      {
        new: true,
      }
    );
  }

  res.status(201).json({
    status: 'success',
    data: cartItem,
  });
});

exports.displayCart = catchAsync(async (req, res, next) => {
  const cartProducts = await Cart.findOne({ user: req.user._id }).populate({
    path: 'user',
    select: 'name email',
  });

  res.status(200).json({
    status: 'success',
    data: cartProducts,
  });
});

exports.viewOrders = catchAsync(async (req, res, next) => {
  const products = await Cart.find();

  res.status(200).json({
    status: 'success',
    data: products,
  });
});
