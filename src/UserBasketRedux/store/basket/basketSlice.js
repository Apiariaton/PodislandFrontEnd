import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "../../localStorageFunctions/getLocalStorage";


const initialBasketState =
  {basket: getLocalStorage("basket") != null ? getLocalStorage("basket") : []};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {
    addToBasket(state, action) {
      const existingItem = state.basket.find((basketItem)=>basketItem.name == action.payload.basket.name);
      
      //Increment item quantity when item already in basket
      if (existingItem) 
      {
        existingItem.quantity++;
      } 
      //Add item object to basket array when not in basket
      else 
      {
        state.basket.push(action.payload.basket);
      }
    },
    removeFromBasket(state, action) {

      const itemIndex = state.basket.findIndex((item) => item.name === action.payload.basket.name);

      if (itemIndex !== -1) {
        if (state.basket[itemIndex].quantity === 1) {
          // Create a new array excluding the item to be removed

          state.basket = state.basket.filter((item, index) => index !== itemIndex);
    
        } else {
          // Decrement the item quantity
          state.basket[itemIndex].quantity--;
        }
    }
  },
  emptyBasket(state, action) {
    state.basket = [];
  },
  },
});

export default basketSlice.reducer;

export const basketSliceActions = basketSlice.actions;
