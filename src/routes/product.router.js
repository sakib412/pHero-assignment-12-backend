import { Router } from "express";
import { addProductController, getAllProductsController } from "../controllers/product.controllers";

const productRouter = Router()

productRouter.route('/')
    .get(getAllProductsController)
    .post(addProductController)




export default productRouter