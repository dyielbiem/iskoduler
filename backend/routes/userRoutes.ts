import express from "express";
import {
  postSignUp,
  postSignIn,
  postAuthenticate,
  postUserInformation,
  patchUserName,
  patchUserPassword,
  postLogout,
  patchUserImage,
  patchDeleteUserImage,
} from "../controllers/userController.js";
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
userRoutes.post("/authenticate", authMiddleware, postAuthenticate);

// GET method to retrieve user's information
userRoutes.post("/information", authMiddleware, postUserInformation);

// PATCH method to update user's name
userRoutes.patch("/information/name", authMiddleware, patchUserName);

// PATCH method to update user's password
userRoutes.patch("/information/password", authMiddleware, patchUserPassword);

// GET method to log out a user
userRoutes.post("/logout", authMiddleware, postLogout);

// PATCH method to update user's display image
userRoutes.patch(
  "/information/image",
  upload.single("image"),
  authMiddleware,
  patchUserImage
);

// PATCH method to update user's display image
userRoutes.patch(
  "/information/image/delete",
  authMiddleware,
  patchDeleteUserImage
);

export default userRoutes;
