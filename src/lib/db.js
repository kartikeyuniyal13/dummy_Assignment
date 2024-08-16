import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set("strictQuery", true)
    if (isConnected) {
        console.log("Using existing connection");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
            {
                dbName: "myshopdb",
            }
        )
        isConnected = true;
    } catch (error) {
        console.error("Error connecting to database", error);

    }
}