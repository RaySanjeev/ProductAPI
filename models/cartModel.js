const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Please provide the product id'],
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user id'],
  },
  // quantity: {
  //   type: Number,
  //   required: true,
  //   min: [1, 'Quantity cannot be less than 1']
  // }
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
