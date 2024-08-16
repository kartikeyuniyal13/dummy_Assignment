import { User } from '@/dbModel/User';
import { connectToDb } from '../db'; // Adjust the path as per your project structure

async function createUser(userData) {
  try {
    await connectToDb();
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}


async function deleteUser(clerkId) {
  try {
    const deletedUser = await User.findOneAndDelete({ clerkId });
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user by clerkId: ${error.message}`);
  }
}
