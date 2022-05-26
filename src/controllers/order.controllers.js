import Order from "../models/Order"
import User from "../models/User"
import { errorResponse, successResponse } from "../utils/response"

export const addOrderControllers = async (req, res) => {
    try {
        const user = await User.findOne({ email: req?.decoded?.email }).exec()
        if (!user) {
            return res.status(403).json(errorResponse("Forbidden access"))
        }
        const { address, productID, phone, note, price } = req.body
        const item = {
            address, phone, note, price,
            product: productID,
            customer: user._id
        }
        const data = await Order.create(item)
        return res.status(201).json(successResponse(data))
    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}