import mongoose from "mongoose";


//!  Category Model
const CategorySchema = new mongoose.Schema({
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants" },
    name: String,
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "menuItems" }],
    name: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" }
});
export const CategoryModel = mongoose.model("categories", CategorySchema);

//! CuisineModel
const CuisineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"], default: "Active" },
    image: { type: String, default: "" },
    description: { type: String, default: "" }
});
export const CuisineModel = mongoose.model("cuisines", CuisineSchema);

//! Menu Item Model
const MenuItemSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants", required: true },
    name: { type: String, required: true },
    status: { type: String,  enum: ["Active", "Inactive"], default: "Active" },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    unitPrice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 }
});

MenuItemSchema.index({ restaurant: 1, name: 1 }, { unique: true });
//! Table Model
const TableSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants", required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"], default: "Active" },
    capacity: { type: Number, required: true }
});

TableSchema.index({ restaurant: 1, name: 1 }, { unique: true });

//! TimeSlot model
const TimeSlotSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "restaurants" },
    status: { type: String, required: true, enum: ["Active", "Inactive"], default: "Active" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});


export const MenuItemModel = mongoose.model("menuItems", MenuItemSchema);
export const TableModel = mongoose.model("tables", TableSchema);
export const TimeSlotModel = mongoose.model("timeSlots", TimeSlotSchema);
