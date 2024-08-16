import { Webhook } from "svix";
import { headers } from "next/headers";
import { createUser, deleteUser } from "@/lib/actions/user.action";
import { createCart } from "@/lib/actions/cart.action";
import { NextResponse } from "next/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;
  console.log("Webhook Secret:", WEBHOOK_SECRET);

  if (!WEBHOOK_SECRET) {
    console.error("Webhook secret not found");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("Received headers:", { svix_id, svix_timestamp, svix_signature });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return new Response("Missing Svix headers", { status: 400 });
  }

  let payload;
  try {
    payload = await req.json();
    console.log("Received payload:", payload);
  } catch (err) {
    console.error("Error parsing JSON payload:", err);
    return new Response("Invalid JSON payload", { status: 400 });
  }

  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log("Verified event:", evt);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;
  console.log("Event type:", eventType);

  try {
    if (eventType === "user.created") {
      const { id, email_addresses, username, first_name, last_name } = evt.data;

      console.log("Creating cart for user:", id);
      let cart;
      try {
        cart = await createCart({ userId: id, items: [] });
        console.log("Created cart:", cart);
      } catch (err) {
        console.error("Error creating cart:", err);
        return new Response("Error creating cart", { status: 500 });
      }

      console.log("Creating user in MongoDB:", id);
      let mongoUser;
      try {
        mongoUser = await createUser({
          clerkId: id,
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          username: username || "", // Default to empty string if null
          email: email_addresses[0].email_address,
          cartId: cart._id,
        });
        console.log("Created MongoDB user:", mongoUser);
      } catch (err) {
        console.error("Error creating user:", err);
        return new Response("Error creating user", { status: 500 });
      }

      return NextResponse.json({ message: "User created", user: mongoUser });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      console.log("Deleting user:", id);
      let deletedUser;
      try {
        deletedUser = await deleteUser({ clerkId: id });
        console.log("Deleted user:", deletedUser);
      } catch (err) {
        console.error("Error deleting user:", err);
        return new Response("Error deleting user", { status: 500 });
      }

      return NextResponse.json({ message: "User deleted", user: deletedUser });
    }

    console.log("Unhandled event type:", eventType);
    return new Response("Event type not handled", { status: 204 });
  } catch (err) {
    console.error("Error handling event:", err);
    return new Response("Error processing event", { status: 500 });
  }
}