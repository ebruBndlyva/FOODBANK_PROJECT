import mongoose from "mongoose";


const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    openingTime: { type: Date, required: true },
    closingTime: { type: Date, required: true },
    cuisine: [{ type: mongoose.Schema.Types.ObjectId, ref: "cuisine" }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
    restaurantAddress: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
    featuredImage: { type: String },

    // Kuponları ayrıca modeldən gətirmək üçün
    vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "coupon" }],

    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    restaurantStatus: {
        delivery: { type: String, enum: ["Enable", "Disable"], default: "Enable" },
        pickup: { type: String, enum: ["Enable", "Disable"], default: "Enable" },
        currentStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    }
}, { timestamps: true });

RestaurantSchema.index({ location: "2dsphere" });

export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
