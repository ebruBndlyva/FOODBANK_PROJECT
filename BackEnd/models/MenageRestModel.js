import mongoose from "mongoose";


//!  Category Model
const CategorySchema = new mongoose.Schema({
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    name: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" }
});
export const CategoryModel = mongoose.model("categories", CategorySchema);

//! Menu Item Model
const MenuItemSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    name: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    unitPrice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 }
});

MenuItemSchema.index({ restaurant: 1, name: 1 }, { unique: true });
export const MenuItemModel = mongoose.model("menuItems", MenuItemSchema);

//! CuisineModel
const CuisineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"], default: "Active" },
    image: { type: String, default: "" },
    description: { type: String, default: "" }
});
export const CuisineModel = mongoose.model("cuisines", CuisineSchema);


//! Table Model
const TableSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants", required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"], default: "Active" },
    capacity: { type: Number, required: true }
});

TableSchema.index({ restaurant: 1, name: 1 }, { unique: true });
export const TableModel = mongoose.model("tables", TableSchema);


//! TimeSlot model
const TimeSlotSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "restaurants" },
    status: { type: String, required: true, enum: ["Active", "Inactive"], default: "Active" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});
export const TimeSlotModel = mongoose.model("timeSlots", TimeSlotSchema);



// ! Coupon model
const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },  // Kupon kodu
    discountType: {  type: String,  default:"percentage",required: true }, 
    discountValue: { type: Number, required: true },  // Kuponun dəyəri (faiz və ya məbləğ)
    minOrderAmount: { type: Number, default: 0 },  // Ən az sifariş məbləği (istəyə bağlı)
    validFrom: { type: Date, required: true },  // Kuponun etibarlı olduğu başlama tarixi
    validUntil: { type: Date, required: true },  // Kuponun son istifadə tarixi
    isActive: { type: Boolean, default: true },  // Kuponun aktiv olub-olmaması
}, { timestamps: true }); 

export const CouponModel = mongoose.model("coupons", CouponSchema);
