import Product from "../models/Product";
import { errorResponse, successResponse } from "../utils/response"

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

export const getAllProductsController = async (req, res) => {
    try {
        let { page = 1, size = 10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const query = {}
        const totalData = await Product.find().estimatedDocumentCount()
        const data = await Product.find(query).sort({ updatedAt: -1 }).skip((page - 1) * size).limit(size).exec()

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

export const deleteProductController = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) return res.status(400).json(errorResponse("The item you are trying to delete is not found."));
        return res.status(204).json(successResponse("Succesfully deleted."));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const getOneProductController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).exec();
        if (!product) return res.status(404).json(errorResponse("Not found"));
        return res.json(successResponse(product));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}