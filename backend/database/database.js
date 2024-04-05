import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
  //swap if you're using windows
  // const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const url = `://127.0.0.1:27017/couponline`;
  try {
    const connection = await mongoose.connect(url, {});
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Failed to connect database:", e);
    process.exit(1);
  }
};
