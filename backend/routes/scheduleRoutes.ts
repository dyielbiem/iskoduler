import express from "express";
import {
  getSchedules,
  postTask,
  postClass,
  deleteTask,
  patchTask,
  patchClass,
  deleteClass,
} from "../controllers/scheduleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

const scheduleRoutes = express.Router();

scheduleRoutes.use(cookieParser());
scheduleRoutes.use(express.json());

// Route where client can make GET request to fetch all schedules
scheduleRoutes.get("/", authMiddleware, getSchedules);

// Route where client can make POST, PATCH, DELETE request for task schedules
scheduleRoutes.post("/tasks", authMiddleware, postTask);
scheduleRoutes.patch("/tasks/:id", authMiddleware, patchTask);
scheduleRoutes.delete("/tasks/:id", authMiddleware, deleteTask);

// Route where client can make POST, PATCH, DELETE request for class schedules
scheduleRoutes.post("/classes", authMiddleware, postClass);
scheduleRoutes.patch("/classes/:id", authMiddleware, patchClass);
scheduleRoutes.delete("/classes/:id", authMiddleware, deleteClass);

export default scheduleRoutes;
