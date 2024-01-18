const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productImageUrl: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Products = mongoose.model("products", productSchema);
module.exports = Products;
