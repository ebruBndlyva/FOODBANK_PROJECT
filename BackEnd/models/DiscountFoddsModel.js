import mongoose from "mongoose";


const DiscountFoodsSchema = new mongoose.Schema({
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'menuItems', required: true },
    discountPrice: { type: Number },
    discountStartTime: { type: Date },
    discountPercentage: { type: Number, required: true },  // Endirim faizi
});

export const DiscountFoodsModel = mongoose.model("discountFoods", DiscountFoodsSchema)
