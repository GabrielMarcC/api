import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const createDBConnection = async () => {
  try {
    await connect(process.env.URI ?? "");
    console.log("connected to DB");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
