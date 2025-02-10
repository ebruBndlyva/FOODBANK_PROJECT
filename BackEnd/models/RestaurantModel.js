import mongoose from "mongoose"

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true,unique: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    cuisine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cuisine',
        required: true
    },
    restaurantAddress: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
    featuredImage: { type: String },

    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // UserModel ilə əlaqə qurulur
        required: true,
    },

    restaurantStatus: {
        delivery: { type: String, enum: ["Enable", "Disable"], default: "Enable" },
        pickup: { type: String, enum: ["Enable", "Disable"], default: "Enable" },
        currentStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    }
}, { timestamps: true });

export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema)