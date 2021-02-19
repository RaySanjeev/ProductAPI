const mongoose = require('mongoose');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

exports.updateMe = catchAsync(async (req, res, next) => {
  let obj = {};
  req.body.name ? (obj.name = req.body.name) : req.user.name;
  req.body.email ? (obj.email = req.body.email) : req.user.email;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, obj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
