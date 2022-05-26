import { Router } from "express";
import { addProductController } from "../controllers/product.controllers";

const productRouter = Router()

productRouter.route('/')
    // .get(getItems)
    .post(addProductController)




export default productRouter