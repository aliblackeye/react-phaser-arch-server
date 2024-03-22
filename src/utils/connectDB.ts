import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI as string);

		isConnected = true;
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error);
	}
};

export default connectDB;