import { Router } from "express";
import { getMeController, loginController, signupController, updateUserController } from "../controllers/auth.controllers";
import verifyJWT from "../middleware/verifyJWT";
const authRouter = Router()

authRouter.post("/signup", signupController)
authRouter.post("/login", loginController)
authRouter.route("/me")
    .get(verifyJWT, getMeController)
    .put(verifyJWT, updateUserController)

export default authRouter