import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);

            if (existItem) {
                existItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }


            state.totalPrice = state.cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.id !== id);


            state.totalPrice = state.cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;