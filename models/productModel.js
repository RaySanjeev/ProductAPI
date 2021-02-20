const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name of the product'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  description: {
    type: String,
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1'],
    max: [5, 'Rating must be below or equal to 5'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
