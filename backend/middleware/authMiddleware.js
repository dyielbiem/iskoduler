import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Middleware to authenticate the client making the HTTP request
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    }
    catch (_a) {
        res.clearCookie("token", {
            sameSite: "none",
            secure: true,
            domain: process.env.DOMAIN,
        });
        return res.status(401).json({ Error: "Unauthorized" });
    }
};
export default authMiddleware;
