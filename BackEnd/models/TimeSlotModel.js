import mongoose from "mongoose"

const TimeSlotSchema = new mongoose.Schema({

    restaurant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "restaurants" },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

}, { timestamps: true });

export const TimeSlotModel = mongoose.model("timeslots", TimeSlotSchema)