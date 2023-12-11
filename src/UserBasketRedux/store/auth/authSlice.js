import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "../../localStorageFunctions/getLocalStorage";

// Get bearer token from local storage to save having to login on each visit
const initialAuthState = {
    authToken: getLocalStorage("authToken"),
};

// Set bearer token when logging in; remove when logging out/deleting account.
const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setAuthToken(state,action)
        {
            state.authToken = action.payload.authToken;
        },
        clearAuthToken(state,action)
        {
            state.authToken = null;
        }
    }
});



export default authSlice.reducer;
export const authSliceActions = authSlice.actions;