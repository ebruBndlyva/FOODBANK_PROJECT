import mongoose from 'mongoose';

const BasketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants", required: true },
    items: [
        {
            menuId: { type: mongoose.Schema.Types.ObjectId, ref: "menuItems", required: true },
            image: { type: String, required: true },
            count: { type: Number, required: true, default: 1 },
            size: { type: String,enum: ["Small", "Medium"], default: "Small" },
            addons: [{ type: String }],
            note: { type: String }
        }
    ]
})

export const BasketModel = mongoose.model("basket", BasketSchema)