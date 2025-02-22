import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(Bun.env.MONGO_URI!);
    console.log(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default dbConnect;
