import { Router } from "express";
import { addProductController, deleteProductController, getAllProductsController } from "../controllers/product.controllers";

const productRouter = Router()

productRouter.route('/')
    .get(getAllProductsController)
    .post(addProductController)

productRouter.route('/:id')
    .delete(deleteProductController)




export default productRouter