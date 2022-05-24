import { model, Schema } from "mongoose";
import { ORDER, PRODUCT, USER } from "./collectionName";

const OrderSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: PRODUCT }],
    customer: { type: Schema.Types.ObjectId, ref: USER, required: true },
    status: { type: String, enum: ['PENDING', 'SHIPPED', 'DELIVERED'], default: 'PENDING' },
    price: { type: Number, required: true },
    invoice: String
}, { timestamps: true })

const Order = model(ORDER, OrderSchema)

export default Order