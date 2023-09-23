import express from "express";
import { postSchedules, postTask, postClass, patchDeleteTask, patchTask, patchClass, patchDeleteClass, } from "../controllers/scheduleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
const scheduleRoutes = express.Router();
scheduleRoutes.use(cookieParser());
scheduleRoutes.use(express.json());
// Route where client can make GET request to fetch all schedules
scheduleRoutes.post("/", authMiddleware, postSchedules);
// Route where client can make POST, PATCH, DELETE request for task schedules
scheduleRoutes.post("/tasks", authMiddleware, postTask);
scheduleRoutes.patch("/tasks/:id", authMiddleware, patchTask);
scheduleRoutes.patch("/tasks/delete/:id", authMiddleware, patchDeleteTask);
// Route where client can make POST, PATCH, DELETE request for class schedules
scheduleRoutes.post("/classes", authMiddleware, postClass);
scheduleRoutes.patch("/classes/:id", authMiddleware, patchClass);
scheduleRoutes.patch("/classes/delete/:id", authMiddleware, patchDeleteClass);
export default scheduleRoutes;
