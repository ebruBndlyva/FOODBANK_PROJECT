import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    phone: { type: String, required: true },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tables",
        required: true
    },
    guest: {
        type: Number,
        required: true
    },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" }
}, { timestamps: true });

export const ReservationModel = mongoose.model("reservation", ReservationSchema);
