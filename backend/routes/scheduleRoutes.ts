import express from "express";
import {
  getSchedules,
  postTask,
  postClass,
} from "../controllers/scheduleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

const scheduleRoutes = express.Router();

scheduleRoutes.use(cookieParser());
scheduleRoutes.use(express.json());

// Route where client can make GET request to fetch all schedules
scheduleRoutes.get("/", authMiddleware, getSchedules);

// Route where client can make POST request to add a new task task
scheduleRoutes.post("/tasks", authMiddleware, postTask);

// Route where client can make POST request to add a new task class
scheduleRoutes.post("/classes", authMiddleware, postClass);

export default scheduleRoutes;
