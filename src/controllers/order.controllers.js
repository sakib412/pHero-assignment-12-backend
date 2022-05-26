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
        if (req.user.role !== 'ADMIN') {
            query.customer = req.user._id
        }
        const totalData = await Order.find(query).countDocuments()
        const data = await Order.find(query)
            .sort({ updatedAt: -1 })
            .skip((page - 1) * size)
            .limit(size)
            .populate('product').exec()

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

export const getOneOrderControllers = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product').populate('customer').exec()
        if (!order) {
            return res.status(404).json(errorResponse("Not found"))
        }
        return res.status(200).json(successResponse(order))

    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const updateOrderControllers = async (req, res) => {
    try {
        const { invoice, status } = req.body;
        if (status && req.user.role !== 'ADMIN') {
            return res.status(403).json(errorResponse("Forbidden access"))
        }
        const order = await Order.findByIdAndUpdate(req.params.id, { invoice, status }, { new: true })
        if (!order) {
            return res.status(404).json(errorResponse("Not found!"))
        }
        return res.status(200).json(successResponse(order))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const deleteOrderController = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).exec()
        if (!order || order.invoice) {
            return res.status(403).json(errorResponse("You have no access to delete this order"));
        }
        await Order.findByIdAndDelete(order._id)
        return res.status(204).json(successResponse("Succesfully deleted."));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}