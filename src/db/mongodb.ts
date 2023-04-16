import { config } from "dotenv";
import mongoose from "mongoose";
config();
mongoose.set("strictQuery", false);
export const connection = mongoose.connect(process.env.MONGODB_URI as string);
