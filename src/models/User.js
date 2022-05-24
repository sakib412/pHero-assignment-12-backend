import { model, Schema } from "mongoose";
import { USER } from "./collectionName";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: String,
    image: String,
    address: String,
    education: String,
    phoneNumber: String,
    linkedInProfile: String,
}, { timestamps: true });

const User = model(USER, UserSchema);

export default User