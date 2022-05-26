import { Router } from "express";
import {
    getAllUsersControllers, getMeController, loginController, signupController,
    updateUserController, updateUserRoleController
} from "../controllers/auth.controllers";
import isAdmin from "../middleware/isAdmin";
import verifyJWT from "../middleware/verifyJWT";
const authRouter = Router()

authRouter.post("/signup", signupController)
authRouter.post("/login", loginController)
authRouter.route("/me")
    .get(verifyJWT, getMeController)
    .put(verifyJWT, updateUserController)

authRouter.get('/users', verifyJWT, isAdmin, getAllUsersControllers)
authRouter.patch('/user/update-role/:id', verifyJWT, isAdmin, updateUserRoleController)

export default authRouter