"use server";
import { User } from '@/dbModel/User';
import { connectToDb } from '../db'; // Adjust the path as per your project structure

async function createUser(userData) {
  try {
    await connectToDb();
    const newUser = await User.create(userData); // Fixed usage
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function deleteUser(clerkId) {
  try {
    const deletedUser = await User.findOneAndDelete({ clerkId });
    if (!deletedUser) {
      throw new Error(`User with clerkId ${clerkId} not found`);
    }
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user by clerkId: ${error.message}`);
  }
}
