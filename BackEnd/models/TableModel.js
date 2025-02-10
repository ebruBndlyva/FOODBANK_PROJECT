import mongoose from "mongoose"

const TableSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, unique: true },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    capacity: { type: Number, required: true },


}, { timestamps: true });

export const TableModel = mongoose.model("cuisine", TableSchema)