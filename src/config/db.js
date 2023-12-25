import mongoose from "mongoose";

const URI = process.env.DB_URL;
import "dotenv/config";

/**
 * @description Connect to MongoDB
 * @returns {void}
 * @throws {error}
 */

const ConnectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connection Done");
};

export default ConnectDB;