import { Router } from "express";
import { getMeController, loginController, signupController } from "../controllers/auth.controllers";
import verifyJWT from "../middleware/verifyJWT";
const authRouter = Router()

authRouter.post("/signup", signupController)
authRouter.post("/login", loginController)
authRouter.get("/me", verifyJWT, getMeController)

export default authRouter