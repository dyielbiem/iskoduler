import jwt from "jsonwebtoken";
// Middleware to authenticate the client making the HTTP request
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    }
    catch (_a) {
        res.clearCookie("token", { sameSite: "none", secure: true });
        return res.status(401).json({ Error: "Unauthorized" });
    }
};
export default authMiddleware;
