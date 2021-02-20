const Product = require('../models/productModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');

exports.createBooking = catchAsync(async (req, res, next) => {
  const getProduct = await Product.findById(req.params.productID);
  const product = getProduct._id;
  const user = req.user._id;
  const price = getProduct.price;

  const userBookings = await Booking.findOne({ user, product });

  if (!userBookings) {
    await Booking.create({ product, user, price });
  } else {
    userBookings.quantity = userBookings.quantity + 1;
    userBookings.price = userBookings.price + price;
    await userBookings.save();
  }

  res.status(201).json({
    status: 'success',
    message: 'Booking successfully created!',
  });
});

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});
