import { model, Schema } from "mongoose";
import { PRODUCT, USER } from "./collectionName";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    minOrderQuantity: { type: Number, required: true },
    creator: { type: Schema.Types.ObjectId, ref: USER, required: true },
    price: { type: Number, required: true },
    email: String
}, { timestamps: true });

const Product = model(PRODUCT, ProductSchema);

export default Product