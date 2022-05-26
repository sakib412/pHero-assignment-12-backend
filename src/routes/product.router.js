import { Router } from "express";
import { addProductController, deleteProductController, getAllProductsController, getOneProductController } from "../controllers/product.controllers";

const productRouter = Router()

productRouter.route('/')
    .get(getAllProductsController)
    .post(addProductController)

productRouter.route('/:id')
    .get(getOneProductController)
    .delete(deleteProductController)




export default productRouter