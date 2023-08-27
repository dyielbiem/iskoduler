import { Request, Response } from "express";
import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function for creating jsonwebtoken
const createToken = (_id: string, res: Response) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3h" });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10800000,
    sameSite: "none",
    secure: true,
  });
};

// Controller to signup a new user through a POST request
export const postSignUp = async (req: Request, res: Response) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    // Check if username and password is not empty
    if (!username || !password || !firstname || !lastname)
      return res.status(400).json({ Error: "All fields must be filled" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      firstname,
      lastname,
      password: hashedPassword,
    };

    const savedUser = await user.create(newUser);

    createToken(String(savedUser._id), res);
    res.json({ username });
  } catch (error: any) {
    if (error.code === 11000) {
      // Respond if the entered username is not available
      res.status(400).json({ Error: "The username is not available" });
    } else {
      // Respond for bad request
      res.status(400).json({ Error: "Bad Request" });
    }
  }
};

export const postSignIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ Error: "The username and password must not be empty" });

    const existingUser = await user.findOne({ username });

    if (!existingUser)
      return res.status(400).json({ Error: "User does not exist" });

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword)
      return res.status(400).json({ Error: "Incorrect password" });

    createToken(String(existingUser._id), res);
    res.json({ username, id: existingUser._id });
  } catch {
    res.status(400).json({ Error: "Bad Request" });
  }
};
