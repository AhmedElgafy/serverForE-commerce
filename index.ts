import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/routes";
import db from "./db/dbConnection";
db;

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(route);
app.listen(process.env.PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
export default app;
