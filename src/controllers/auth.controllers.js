import { sign } from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import { errorResponse, successResponse } from "../utils/response";

// Login route
export const loginController = async (req, res) => {
    const { email } = req.body;
    const access = sign({ email }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp,
    });
    return res.json(successResponse({ accessToken: access }));
}

// Signup 
export const signupController = async (req, res) => {
    try {
        const { name, email, image } = req.body
        const userData = { name, email, image }
        const data = await User.create(userData)
        return res.status(201).json(successResponse(data))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}