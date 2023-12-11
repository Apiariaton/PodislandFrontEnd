import authSliceReducer from "./auth/authSlice";
import basketSliceReducer from "./basket/basketSlice";
import pastOrdersSliceReducer from "./pastOrders/pastOrdersSlice";
import userSliceReducer from "./user/userSlice";
import errorMessageSliceReducer from "./errorMessage/errorMessageSlice";
import podcastFilterSliceReducer from "./podcastFilter/podcastFilterSlice";
import stripeInfoSliceReducer from "./stripeInfo/stripeInfoSlice";
import { combineReducers } from "@reduxjs/toolkit";

const allStateReducer = combineReducers(
{
    auth: authSliceReducer, 
    basket : basketSliceReducer,
    pastOrders: pastOrdersSliceReducer,
    user : userSliceReducer,
    errorMessage : errorMessageSliceReducer,
    podcastFilter: podcastFilterSliceReducer,
    stripeInfo: stripeInfoSliceReducer,
}
);

export default allStateReducer;