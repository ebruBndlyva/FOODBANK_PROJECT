import mongoose from "mongoose";


const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    openingTime: { type: Date, required: true },
    closingTime: { type: Date, required: true },
    restaurantAddress: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
    featuredImage: { type: String },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    restaurantStatus: {
        delivery: { type: String, enum: ["Enable", "Disable"], default: "Enable" },
        pickup: { type: String, enum: ["Enable", "Disable"], default: "Enable" },
        currentStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    },

    cuisine: [{ type: mongoose.Schema.Types.ObjectId, ref: "cuisines" }],      //cuisine
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'menuItems' }],        //menu
    rating: { type: Number, default: 0 },                                      //rating
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],       //reviews
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", }  //owner


}, { timestamps: true });

RestaurantSchema.index({ location: "2dsphere" });

export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
