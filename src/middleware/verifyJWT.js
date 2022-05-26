import { verify } from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import { errorResponse } from "../utils/response";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json(errorResponse("Unauthorized access"));
    }
    const token = authHeader.split(" ")[1];
    verify(token, config.secrets.jwt, async (err, decoded) => {
        if (err) {
            return res.status(403).json(errorResponse("Forbidden access"));
        }
        req.decoded = decoded;
        const user = await User.findOne({ email: decoded.email }).exec()
        req.user = user
        next();
    });
}

export default verifyJWT