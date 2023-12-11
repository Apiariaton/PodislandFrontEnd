import { createSlice } from "@reduxjs/toolkit";

const initialErrorMessageState = {
  authErrorMessage: [],
  basketErrorMessage: [],
  pastOrdersErrorMessage: [],
  userErrorMessage: [],
  podcastFilterErrorMessage: [],
};

const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState: initialErrorMessageState,
  reducers: {
    setAuthErrorMessage(state, action) {
      state.authErrorMessage.push(action.payload.authErrorMessage);
    },
    clearAuthErrorMessage(state, action) {
      state.authErrorMessage = [];
    },
    setBasketErrorMessage(state, action) {
      state.basketErrorMessage.push(action.payload.basketErrorMessage);
    },
    clearBasketErrorMessage(state, action) {
      state.basketErrorMessage = [];
    },
    setPastOrdersErrorMessage(state, action) {
      state.pastOrdersErrorMessage.push(action.payload.pastOrdersErrorMessage);
    },
    clearPastOrdersErrorMessage(state, action) {
      state.pastOrdersErrorMessage = [];
    },
    setUserErrorMessage(state, action) {
      state.userErrorMessage.push(action.payload.userErrorMessage);
    },
    clearUserErrorMessage(state, action) {
      state.userErrorMessage = [];
    },
    setPodcastFilterErrorMessage(state, action) {
      state.podcastFilterErrorMessage.push(action.payload.podcastFilterErrorMessage);
    },
    clearPodcastFilterErrorMessage(state, action) {
      state.podcastFilterErrorMessage = [];
    },
  },
});

export const errorMessageSliceActions = errorMessageSlice.actions;
export default errorMessageSlice.reducer;
