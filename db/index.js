import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "../src/config/config.js";

dotenv.config();

mongoose.connect(config.db.url);

const db = mongoose.connection;

export default db;
