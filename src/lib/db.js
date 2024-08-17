import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);
    
    // Check if there's already a connection
    if (isConnected) {
        console.log("Using existing connection");
        return;
    }
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("MONGO_URI environment variable is not defined");
        return;
    }

    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(mongoUri, {
            dbName: "newdb",
        });
        isConnected = true;
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database", error);
        // Optionally implement retry logic here
    }
};

// Gracefully close the connection when shutting down
export const disconnectFromDb = async () => {
    if (isConnected) {
        await mongoose.disconnect();
        isConnected = false;
        console.log("Disconnected from database");
    }
};
