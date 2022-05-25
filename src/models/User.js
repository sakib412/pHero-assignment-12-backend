import { model, Schema } from "mongoose";
import { USER } from "./collectionName";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['MEMBER', "ADMIN"], default: 'MEMBER' },
    description: String,
    image: String,
    address: String,
    education: String,
    phone: String,
    linkedInProfile: String,
}, { timestamps: true });

const User = model(USER, UserSchema);

export default User