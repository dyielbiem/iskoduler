import express from "express";
import { postSignUp, postSignIn, getAuthenticate, getUserInformation, patchUserName, patchUserPassword, getLogout, patchUserImage, deleteUserImage, } from "../controllers/userController.js";
import cookieParser from "cookie-parser";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
const userRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
userRoutes.use(cookieParser());
userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: true }));
// POST method to sign up a new user
userRoutes.post("/signup", postSignUp);
// POST method to sign in a user
userRoutes.post("/signin", postSignIn);
// GET method to authenticate user
userRoutes.get("/authenticate", authMiddleware, getAuthenticate);
// GET method to retrieve user's information
userRoutes.get("/information", authMiddleware, getUserInformation);
// PATCH method to update user's name
userRoutes.patch("/information/name", authMiddleware, patchUserName);
// PATCH method to update user's password
userRoutes.patch("/information/password", authMiddleware, patchUserPassword);
// GET method to log out a user
userRoutes.get("/logout", authMiddleware, getLogout);
// PATCH method to update user's display image
userRoutes.patch("/information/image", authMiddleware, upload.single("image"), patchUserImage);
// PATCH method to update user's display image
userRoutes.delete("/information/image", authMiddleware, deleteUserImage);
export default userRoutes;
