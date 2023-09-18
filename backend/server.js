var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
// Allow front end to make HTTP requests
app.use(cors({
    origin: process.env.FRONTEND,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
}));
// Check the path and method of the HTTP request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/schedules", scheduleRoutes);
// Connect to mongoDB atlas
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.MONGO_URI);
        // Start the app and listen to a port
        app.listen(process.env.PORT, () => {
            console.log(`Listening to port ${process.env.PORT}`);
        });
    }
    catch (_a) {
        console.log("Unable to connect to MongoDB");
    }
});
connectToDB();
