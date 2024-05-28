import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/databaseconnection.js";
import { Router } from "./routes/routes.js";
dotenv.config({ path: "./config/.env" });


const app = express();

app.use(express.json());


// Enable CORS with specified origin
app.use(cors({
  origin: 'https://ralphcontactms.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware to log requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  console.log('Request headers:', req.headers);
  next();
});

app.use('/contactms', Router);

// Handle preflight requests
app.options('*', cors({
  origin: 'https://ralphcontactms.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});
