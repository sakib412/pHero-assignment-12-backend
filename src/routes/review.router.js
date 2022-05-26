import { Router } from "express";
import { addReview, getReviewsController } from "../controllers/review.controllers";
import verifyJWT from "../middleware/verifyJWT";

const reviewRouter = Router()
reviewRouter.route('/')
    .get(getReviewsController)
    .post(verifyJWT, addReview)

export default reviewRouter