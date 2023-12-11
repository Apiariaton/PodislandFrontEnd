import { createSlice } from "@reduxjs/toolkit";
// Past order reducers
// obtain user past orders

const initialPastOrdersSlice = [];

const pastOrdersSlice = createSlice({
    name: "pastOrders",
    initialState: initialPastOrdersSlice,
    reducers: {
        getPastOrders(state,action)
        {
            return action.payload.pastOrders;
        },
        addToPastOrders(state,action)
        {
            state.push(action.payload.newOrder);
        }
    }
});


export default pastOrdersSlice.reducer;
export const pastOrdersSliceActions = pastOrdersSlice.actions;