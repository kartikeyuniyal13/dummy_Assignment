// src/models/Cart.js or wherever your Cart model is defined

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [{
    productID: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
});

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
