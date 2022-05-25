import { sign } from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import { errorResponse, successResponse } from "../utils/response";

// Login route
export const loginController = async (req, res) => {
    try {
        const { email } = req.body;
        const access = sign({ email }, config.secrets.jwt, {
            expiresIn: config.secrets.jwtExp,
        });
        return res.json(successResponse({ accessToken: access }));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

// Signup 
export const signupController = async (req, res) => {
    try {
        const { name, email, image, method } = req.body
        const userData = { name, email, image }
        const user = await User.findOneAndUpdate({ email }, { name, image }, { new: true })
        // if user signup by google , no need to send error
        if (user && method == 'google') {
            const access = sign(
                { email: user.email },
                config.secrets.jwt,
                { expiresIn: config.secrets.jwtExp });
            return res.status(200).json(successResponse({ user, accessToken: access }))
        }

        const data = await User.create(userData)
        const access = sign(
            { email: data.email },
            config.secrets.jwt,
            { expiresIn: config.secrets.jwtExp }
        );

        return res.status(201).json(successResponse({ user: data, accessToken: access }))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}