import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = mongoose
  .connect(process.env.DATABASE_URL || "", {
    dbName: "e-commerce",
  })
  .then(() => {
    console.log("********** Database Connected************");
  })
  .catch((error) => {
    console.log("************** Some thing wrong with connection ***********");
    console.log(error);
  });
export default db;
