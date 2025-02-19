import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],  // Səbətdəki məhsullar
    total: 0,   // Ümumi qiymət
    discount: 0, // Endirim məbləği
    deliveryCharge: 0, // Çatdırılma haqqı
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.items = action.payload.items;
            state.total = action.payload.items.reduce((sum, item) => sum + item.menuId.unitPrice * item.count, 0);
        },
        applyCoupon: (state, action) => {
            state.discount = action.payload; 
        },
        setDeliveryCharge: (state, action) => {
            state.deliveryCharge = action.payload;
        },
        clearBasket: (state) => {
            state.items = [];
            state.total = 0;
            state.discount = 0;
            state.deliveryCharge = 0;
        }
    }
});

export const { setBasket, applyCoupon, setDeliveryCharge, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
