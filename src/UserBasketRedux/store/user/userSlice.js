import {createSlice} from "@reduxjs/toolkit";
// Key user info reducers
// obtain user creation date
// obtain username


const initialUserState = {};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        getUserData(state,action)
        {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.accountCreationDate = action.payload.accountCreationDate;
        },
        clearUserData(state,action)
        {
            return {};
        }
    }
});



export default userSlice.reducer;

export const userSliceActions = userSlice.actions;

