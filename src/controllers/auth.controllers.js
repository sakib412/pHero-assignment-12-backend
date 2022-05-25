import { sign } from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import { errorResponse, successResponse } from "../utils/response";

// Login route
export const loginController = async (req, res) => {
    try {
        const { email, name, image } = req.body;
        const user = await User.findOneAndUpdate({ email }, { email, name, image }, { upsert: true, new: true })
        const access = sign({ email }, config.secrets.jwt, {
            expiresIn: config.secrets.jwtExp,
        });
        return res.json(successResponse({ accessToken: access, user }));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

// Signup 
export const signupController = async (req, res) => {
    try {
        const { name, email, image, method } = req.body
        const userData = { name, email, image }
        const accessToken = sign(
            { email: email },
            config.secrets.jwt,
            { expiresIn: config.secrets.jwtExp }
        );
        const user = await User.findOneAndUpdate({ email }, { name, image }, { new: true })
        // if user signup by google , no need to send error
        if (user && method == 'google') {
            return res.status(200).json(successResponse({ user, accessToken }))
        }
        const data = await User.create(userData)
        return res.status(201).json(successResponse({ user: data, accessToken }))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const getMeController = async (req, res) => {
    try {
        const { email } = req.decoded;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json(errorResponse("Please login again"))
        }
        return res.json(successResponse(user))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}