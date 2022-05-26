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

export const getAllOrdersControllers = async (req, res) => {
    try {
        let { page = 1, size = 10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const query = {}
        const totalData = await Order.find().estimatedDocumentCount()
        const data = await Order.find(query).sort({ updatedAt: -1 }).skip((page - 1) * size).limit(size).populate('product').exec()

        const totalPage = Math.ceil(totalData / size)
        const results = {
            currentPage: page,
            totalData,
            totalPage,
            prevPage: page <= 1 ? null : page - 1,
            nextPage: page >= totalPage ? null : page + 1,
            data
        }
        return res.json(successResponse(results))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}