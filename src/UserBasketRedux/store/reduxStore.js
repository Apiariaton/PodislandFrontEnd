import { configureStore } from "@reduxjs/toolkit";
import allStateReducer from "./combineReduxSliceReducers";

const reduxStore = configureStore({ reducer: allStateReducer });

export default reduxStore;
