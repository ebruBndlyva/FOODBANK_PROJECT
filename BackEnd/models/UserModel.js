import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "restaurantOwner", "deliveryBoy", "customer"],
    default: "customer"
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  depositAmount: { type: Number, default: 0 },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); //timestamps - elave veya update olundu tarixida db -e elave edir !

export const UserModel = mongoose.model("User", UserSchema);

