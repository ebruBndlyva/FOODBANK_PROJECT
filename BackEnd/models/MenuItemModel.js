import mongoose from "mongoose"

const MenuItemSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    },
    name: { type: String, required: true, unique: true },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    unitPrice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 }

}, { timestamps: true });

export const MenuItemModel = mongoose.model("menu", MenuItemSchema)