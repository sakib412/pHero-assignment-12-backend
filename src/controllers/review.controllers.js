import Review from "../models/Review"
import User from "../models/User"
import { errorResponse, successResponse } from "../utils/response"

export const addReview = async (req, res) => {
    try {
        const user = await User.findOne({ email: req?.decoded?.email }).exec()
        if (!user) {
            return res.status(403).json(errorResponse("Forbidden access"))
        }
        const { ratings, description } = req.body
        const item = {
            ratings, description,
            reviewer: user._id
        }
        const data = await Review.create(item)
        return res.status(201).json(successResponse(data))
    } catch (err) {
        return res.status(500).json(errorResponse(err));
    }
}