import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/databaseconnection.js";
import { Router } from "./routes/routes.js";
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS with specified origin
app.use(cors({
  origin: 'https://ralphcontactms.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors({
  origin: 'https://ralphcontactms.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware to log requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  console.log('Request headers:', req.headers);
  next();
});

// Use the router for routes starting with /contactms
app.use('/contactms', Router);

// Default route for testing server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});