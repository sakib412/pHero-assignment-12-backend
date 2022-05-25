import { Router } from "express";
import { addReview } from "../controllers/review.controllers";

import verifyJWT from "../middleware/verifyJWT";

const reviewRouter = Router()

reviewRouter.route('/')
    // .get(getItems)
    .post(addReview)

// reviewRouter.route('/:id')



export default reviewRouter