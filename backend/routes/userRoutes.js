import express from 'express';
import { postSignUp, postSignIn } from '../controllers/userController.js';
import cookieParser from 'cookie-parser';
const userRoutes = express.Router();
userRoutes.use(cookieParser());
userRoutes.use(express.json());
// POST method to sign up a new user
userRoutes.post("/signup", postSignUp);
// POST method to sign in a user
userRoutes.post("/signin", postSignIn);
export default userRoutes;
