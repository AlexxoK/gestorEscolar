import { initServer } from "./configs/server.js";
import { config } from "dotenv";
import { connectDB } from "./configs/mongo.js";

config()
connectDB()
initServer()