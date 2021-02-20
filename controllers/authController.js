const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Cookie Options
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // Send Cookie
  res.cookie('jwt', token, cookieOption);

  // Send Response
  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('PLease provide a valid email and password'));
  }

  req.user = user;
  createSendToken(user, 200, req, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
  if (req.body.role) req.body.role = undefined;
  const user = await User.create(req.body);

  createSendToken(user, 201, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to continue', 401)
    );
  }

  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(payload.id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to the token does not exist anymore. Please sign in to continue',
        401
      )
    );
  }

  req.user = user;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword, passwordConfirm } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!password || !newPassword) {
    return next(
      new AppError(
        'Please provide the password and Confirm Password fields',
        400
      )
    );
  }

  if (!(await user.comparePassword(password, user.password))) {
    return next(
      new AppError('Current password does not match the user password', 401)
    );
  }

  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
