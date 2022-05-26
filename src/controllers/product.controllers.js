import Product from "../models/Product";
import { errorResponse } from "../utils/response"

export const addProductController = async (req, res) => {
    try {
        const { name, image, description, minOrderQuantity, quantity, price } = req.body;
        const productData = { name, image, description, minOrderQuantity, quantity, price, creator: req.user._id }
        const product = await Product.create(productData)
        return res.status(201).json(product)
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}