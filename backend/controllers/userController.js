var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Function for creating jsonwebtoken
const createToken = (_id, res) => {
    const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3h" });
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 10800000,
        sameSite: "none",
        secure: true,
    });
};
// Controller to signup a new user through a POST request
export const postSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, firstname, lastname } = req.body;
        // Check if username and password is not empty
        if (!username || !password || !firstname || !lastname)
            return res.status(400).json({ Error: "All fields must be filled" });
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const newUser = {
            username,
            firstname,
            lastname,
            password: hashedPassword,
        };
        const savedUser = yield user.create(newUser);
        createToken(String(savedUser._id), res);
        res.json({ username });
    }
    catch (error) {
        if (error.code === 11000) {
            // Respond if the entered username is not available
            res.status(400).json({ Error: "The username is not available" });
        }
        else {
            // Respond for bad request
            res.status(400).json({ Error: "Bad Request" });
        }
    }
});
export const postSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res
                .status(400)
                .json({ Error: "The username and password must not be empty" });
        const existingUser = yield user.findOne({ username });
        if (!existingUser)
            return res.status(400).json({ Error: "User does not exist" });
        const checkPassword = yield bcrypt.compare(password, existingUser.password);
        if (!checkPassword)
            return res.status(400).json({ Error: "Incorrect password" });
        createToken(String(existingUser._id), res);
        setTimeout(() => {
            res.json({ username, id: existingUser._id });
        }, 3000);
    }
    catch (_a) {
        res.status(400).json({ Error: "Bad Request" });
    }
});
