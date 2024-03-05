import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
  //swap if you're using windows
<<<<<<< HEAD
  const url = `mongodb://127.0.0.1:27017/couponline`;
=======
  const url = `mongodb://localhost:27017/couponline`;
>>>>>>> 954d47bdfc41448509dc1e9011318c8b5b9543ab
  //swap if you're using apple
  // const url = `mongodb://localhost:27017/couponline`;
  try {
    const connection = await mongoose.connect(url, {});
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Failed to connect database:", e);
    process.exit(1);
  }
};
