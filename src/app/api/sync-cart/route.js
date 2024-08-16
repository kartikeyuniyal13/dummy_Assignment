// src/app/api/sync-cart/route.js
import { createCart, updateCart, getCart } from "@/lib/actions/cart.action";
import { updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, cartItems } = await req.json();

  try {
    // Validate cartItems structure
    if (!Array.isArray(cartItems) || !cartItems.every(item => item.productID && item.quantity)) {
      return NextResponse.json({ success: false, error: "Invalid cart items format." }, { status: 400 });
    }

    let cart = await getCart(userId);
    
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await createCart({ userId, items: cartItems });
      
      // Optionally update the user with the new cartId
      await updateUser({
        clerkId: userId,
        updateData: { cartId: cart._id },
      });
    } else {
      // Update the existing cart
      cart = await updateCart(userId, cartItems);
    }

    // Return success response with the updated/created cart
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Error syncing cart:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
