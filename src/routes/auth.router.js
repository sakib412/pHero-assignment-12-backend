import { Router } from "express";
import { loginController, signupController } from "../controllers/auth.controllers";
const authRouter = Router()

authRouter.route("/signup")
    .post(signupController)

export default authRouter