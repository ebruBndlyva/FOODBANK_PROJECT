import mongoose from "mongoose"

const CuisineSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    image: { type: String, default: "" },
    description: { type: String, default: "" }

}, { timestamps: true });

export const CuisineModel = mongoose.model("cuisine", CuisineSchema)