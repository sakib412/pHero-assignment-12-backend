import { Router } from "express";
import { addOrderControllers, getAllOrdersControllers } from "../controllers/order.controllers";

import verifyJWT from "../middleware/verifyJWT";

const orderRouter = Router()

orderRouter.route('/')
    .get(getAllOrdersControllers)
    .post(addOrderControllers)


export default orderRouter