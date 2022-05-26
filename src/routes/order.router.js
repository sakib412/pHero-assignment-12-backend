import { Router } from "express";
import { addOrderControllers, deleteOrderController, getAllOrdersControllers, getOneOrderControllers, updateOrderControllers } from "../controllers/order.controllers";

const orderRouter = Router()

orderRouter.route('/')
    .get(getAllOrdersControllers)
    .post(addOrderControllers)

orderRouter.route('/:id')
    .get(getOneOrderControllers)
    .patch(updateOrderControllers)
    .delete(deleteOrderController)

export default orderRouter