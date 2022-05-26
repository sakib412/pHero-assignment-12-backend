import { Router } from "express";
import {
    addProductController, deleteProductController, getAllProductsController,
    getOneProductController
} from "../controllers/product.controllers";
import isAdmin from "../middleware/isAdmin";
import verifyJWT from "../middleware/verifyJWT";

const productRouter = Router()
productRouter.route('/')
    .get(getAllProductsController)
    .post(verifyJWT, isAdmin, addProductController)

productRouter.route('/:id')
    .get(getOneProductController)
    .delete(verifyJWT, isAdmin, deleteProductController)

export default productRouter