import { Router } from "express";
import { createIntentControllers } from "../controllers/payment.controllers";
import verifyJWT from "../middleware/verifyJWT";

const paymentRouter = Router()
paymentRouter.post('/create-intent', verifyJWT, createIntentControllers)

export default paymentRouter