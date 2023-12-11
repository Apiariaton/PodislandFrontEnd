import { createSlice } from "@reduxjs/toolkit";
// Past order reducers
// obtain user past orders

const initialStripeInfoSlice = {
    "clientSecret":null,
    "orderID":null,
};

const stripeInfoSlice = createSlice({
    name: "stripeInfo",
    initialState: initialStripeInfoSlice,
    reducers: {
        setStripeInfo(state,action)
        {
            state.clientSecret = action.payload.clientSecret;
            state.orderID = action.payload.orderID;
        },
    }
});


export default stripeInfoSlice.reducer;
export const stripeInfoSliceActions = stripeInfoSlice.actions;