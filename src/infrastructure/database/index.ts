import "dotenv/config";
import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("Conectado a la base de datos!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
