import { configureStore } from "@reduxjs/toolkit";  //redux store create
import CartReducer from "./CartSlice.js";              //importing the cart reducer from the cart slice

export const store = configureStore({                   //creating the redux store and adding the cart reducer to the store
  reducer: {
    cart: CartReducer
  }
});