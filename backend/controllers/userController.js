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
            throw Error("All fields must be filled");
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
// Controller to signin a new user through a POST request
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
        res.json({ username, id: existingUser._id });
    }
    catch (_a) {
        res.status(400).json({ Error: "Bad Request" });
    }
});
// Authenticate user requests
export const getAuthenticate = (req, res) => {
    res.json({ isAuthenticated: true });
};
export const getUserInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userID = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const foundUser = yield user.findById(userID).select(["-__v", "-password"]);
        res.json(foundUser);
    }
    catch (error) {
        res.status(400).json({ Error: error.name });
    }
});
export const patchUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userID = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const { firstname, lastname } = req.body;
        if (!firstname || !lastname)
            throw Error("Both first and last name are both required");
        const updatedInformation = yield user
            .findByIdAndUpdate(userID, { firstname, lastname }, { new: true, runValidators: true })
            .select(["_id", "username", "firstname", "lastname"]);
        if (!updatedInformation)
            throw Error("Bad Request");
        return res.json(updatedInformation);
    }
    catch (error) {
        res.status(400).json({ Error: error.message });
    }
});
export const patchUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userID = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword)
            throw Error("Both current and new password are required");
        const userPassword = yield user.findById(userID).select("password");
        const checkPassword = yield bcrypt.compare(currentPassword, userPassword === null || userPassword === void 0 ? void 0 : userPassword.password);
        if (!checkPassword)
            throw Error("Incorrect current password");
        const salt = yield bcrypt.genSalt(10);
        const hashedNewPassword = yield bcrypt.hash(newPassword, salt);
        const updatedInformation = yield user
            .findByIdAndUpdate(userID, {
            password: hashedNewPassword,
        }, { new: true })
            .select(["username", "_id"]);
        if (!updatedInformation)
            throw Error("Bad Request");
        return res.json(updatedInformation);
    }
    catch (error) {
        res.status(400).json({ Error: error.message });
    }
});
// Controller to logout a new user through a GET request
export const getLogout = (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true });
        res.status(200).json({ Message: "User is logged out" });
    }
    catch (error) {
        res.status(400).json({ Error: error.message });
    }
};
