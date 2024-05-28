import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/databaseconnection.js";
import { Router } from "./routes/routes.js";
dotenv.config({ path: "./config/.env" });


const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'https://ralphcontactms.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue:false,
  optionsSuccessStatus: 204
};

/*app.use((req, res, next) => {
  console.log('CORS origin:', req.headers.origin);
  next();
});
*/

app.use(
  cors((corsOptions))
);

app.use("/contactms", Router);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
