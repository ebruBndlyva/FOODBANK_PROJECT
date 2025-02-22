import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash on delivery', 'stripe'],
        default: 'cash on delivery'
    },
    items: [],
    subtotal: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'
    }
})

export const OrderModel = mongoose.model("orders", OrderSchema)