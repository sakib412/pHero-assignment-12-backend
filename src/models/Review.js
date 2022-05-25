import { model, Schema } from "mongoose";
import { REVIEW, USER } from "./collectionName";

const ReviewSchema = new Schema({
    ratings: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: USER, required: true },
}, { timestamps: true });

const Review = model(REVIEW, ReviewSchema);

export default Review