import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import cors from "cors";

dotenv.config();

const app: express.Express = express();

// Allow front end to make HTTP requests
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);

// Check the path and method of the HTTP request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/schedules", scheduleRoutes);

// Connect to mongoDB atlas
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Start the app and listen to a port
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  } catch {
    console.log("Unable to connect to MongoDB");
  }
};

connectToDB();
