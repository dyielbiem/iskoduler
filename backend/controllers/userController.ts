import { Request, Response } from "express";
import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { Buffer } from "buffer";

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
      throw Error("All fields must be filled");

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

// Controller to signin a new user through a POST request
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

// Authenticate user requests
export const getAuthenticate = (req: Request, res: Response) => {
  res.json({ isAuthenticated: true });
};

// Controller for providing all the information of user
export const getUserInformation = async (req: Request, res: Response) => {
  try {
    const userID = req.user?._id;
    let foundUser = await user.findById(userID).select(["-__v", "-password"]);

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    if (!foundUser) throw Error("User does not exist");

    let imageURL = "";

    if (foundUser.imageID) imageURL = cloudinary.url(foundUser.imageID);

    res.json({ ...foundUser?.toObject(), imageURL });
  } catch (error: any) {
    res.status(400).json({ Error: error.message });
  }
};

// Controller for updating user's name
export const patchUserName = async (req: Request, res: Response) => {
  try {
    const userID = req.user?._id;
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname)
      throw Error("Both first and last name are both required");

    const updatedInformation = await user
      .findByIdAndUpdate(
        userID,
        { firstname, lastname },
        { new: true, runValidators: true }
      )
      .select(["_id", "username", "firstname", "lastname"]);

    if (!updatedInformation) throw Error("Bad Request");
    return res.json(updatedInformation);
  } catch (error: any) {
    res.status(400).json({ Error: error.message });
  }
};

// Controller for updating user's password
export const patchUserPassword = async (req: Request, res: Response) => {
  try {
    const userID = req.user?._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      throw Error("Both current and new password are required");

    const userPassword = await user.findById(userID).select("password");
    const checkPassword = await bcrypt.compare(
      currentPassword,
      userPassword?.password as string
    );

    if (!checkPassword) throw Error("Incorrect current password");

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updatedInformation = await user
      .findByIdAndUpdate(
        userID,
        {
          password: hashedNewPassword,
        },
        { new: true }
      )
      .select(["username", "_id"]);

    if (!updatedInformation) throw Error("Bad Request");

    return res.json(updatedInformation);
  } catch (error: any) {
    res.status(400).json({ Error: error.message });
  }
};

// Controller to logout a new user through a GET request
export const getLogout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", { sameSite: "none", secure: true });
    res.status(200).json({ Message: "User is logged out" });
  } catch (error: any) {
    res.status(400).json({ Error: error.message });
  }
};

// Function to upload user's image to cloudinary from request
async function uploadStream(buffer: Buffer) {
  return new Promise((resolve, reject) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      {
        folder: "ISKOduler",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    let readableBuffer = Readable.from(buffer);
    readableBuffer.pipe(theTransformStream);
  });
}

// Controller for uploading user's image
export const patchUserImage = async (req: Request, res: Response) => {
  try {
    if (!req.file?.buffer) throw Error("There is no image uploaded");

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const userID = req.user?._id;
    const retrievedUser = await user.findById(userID).select(["imageID"]);

    const uploadedImage: any = await uploadStream(req.file.buffer);

    const updatedImageID = await user
      .findByIdAndUpdate(
        userID,
        {
          imageID: uploadedImage!.public_id,
        },
        { new: true }
      )
      .select(["imageID"]);

    if (!updatedImageID) throw Error("User's display image is not updated");

    const imageURL = cloudinary.url(updatedImageID.imageID);

    res.json({ ...updatedImageID.toObject(), imageURL });

    if (retrievedUser?.imageID)
      await cloudinary.uploader.destroy(retrievedUser.imageID);
  } catch (error: any) {
    res.json({ Error: error.message });
  }
};

// Controller for deleting user's image
export const deleteUserImage = async (req: Request, res: Response) => {
  try {
    const userID = req.user?._id;
    const retrievedUser = await user.findById(userID).select(["imageID"]);
    if (!retrievedUser?.imageID)
      throw Error("User does not have display image");

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const updatedUser = await user
      .findByIdAndUpdate(
        userID,
        {
          imageID: "",
        },
        { new: true }
      )
      .select(["imageID"]);

    res.json(updatedUser);
    await cloudinary.uploader.destroy(retrievedUser.imageID);
  } catch (error: any) {
    res.json({ Error: error.message });
  }
};
