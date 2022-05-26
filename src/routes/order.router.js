import { Router } from "express";
import { addOrderControllers } from "../controllers/order.controllers";

import verifyJWT from "../middleware/verifyJWT";

const orderRouter = Router()

orderRouter.route('/')
    // .get(getordersController)
    .post(addOrderControllers)


export default orderRouter