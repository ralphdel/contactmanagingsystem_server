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
  optionsSuccessStatus: 204
};

// Middleware to handle preflight requests
app.options('*', cors(corsOptions));

// Log requests for debugging
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  console.log('Request Method:', req.method);
  next();
});


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
