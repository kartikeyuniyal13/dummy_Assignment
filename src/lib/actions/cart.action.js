// src/lib/actions/cart.action.js

import { Cart } from '@/dbModel/Cart';
import { connectToDB } from '@/lib/db';

export async function createCart({ userId, items }) {
  try {
    await connectToDB();
    const newCart = await Cart.create({ userId, items });
    return newCart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function getCart(userId) {
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId });
    return cart;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
}

export async function updateCart(userId, items) {
  try {
    await connectToDB();
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items } },
      { new: true, upsert: true }
    );
    return updatedCart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}
