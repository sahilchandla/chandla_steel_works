import { createSlice } from '@reduxjs/toolkit';

const cartData = localStorage.getItem('cart');          //get the cart data from the local storage
const initialState = cartData ? JSON.parse(cartData) : {   //if the cart data exists in the local storage, then we will parse the cart data and set it as the initial state of the cart, otherwise we will set the initial state of the cart as an empty array and total quantity and total amount as 0
  items: [],
  totalQuantity: 0,
  totalAmount: 0
};
const CartSlice = createSlice({           //redux slice create
  name: 'cart',                           //slice name
  initialState,
  reducers: {                       //reducers for cart actions or for updating the reducers state
    addItem(state, action) {        //reducer 1
      const newItem = action.payload;               //payload is the data that we want to add to the cart
      const existingItem = state.items.find(item => item.id === newItem.id);            //check if the item already exists in the cart
      if (existingItem) {                                                               //if the item already exists in the cart, then we will update the quantity and total price of the existing item
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = Number(existingItem.price) * existingItem.quantity;
      } else {
        state.items.push(newItem);                                                     //if the item does not exist in the cart, then we will add the new item to the cart
      }
      state.totalQuantity += newItem.quantity;                                      //update the total quantity and total amount of the cart    
      state.totalAmount += Number(newItem.price) * newItem.quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem(state, action) {         //reducer 2
      const id = action.payload;                                                //payload is the id of the item that we want to remove from the cart
      const existingItem = state.items.find(item => item.id === id);                //check if the item exists in the cart
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => item.id !== id);               //if the item exists in the cart, then we will remove the item from the cart and update the total quantity and total amount of the cart
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    increaseQuantity(state, action) {         //reducer 3
      const id = action.payload;                                                //payload is the id of the item that we want to increase the quantity of the item in the cart
      const existingItem = state.items.find(item => item.id === id);                //check if the item exists in the cart
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = Number(existingItem.price) * existingItem.quantity;
        state.totalQuantity += 1;
        state.totalAmount += Number(existingItem.price);                                      //if the item exists in the cart, then we will increase the quantity of the item in the cart and update the total quantity and total amount of the cart
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decreaseQuantity(state, action) {         //reducer 4
      const id = action.payload;                                                //payload is the id of the item that we want to decrease the quantity of the item in the cart
      const existingItem = state.items.find(item => item.id === id);                //check if the item exists in the cart
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = Number(existingItem.price) * existingItem.quantity;
        state.totalQuantity -= 1;
        state.totalAmount -= Number(existingItem.price);                                      //if the item exists in the cart and the quantity of the item is greater than 1, then we will decrease the quantity of the item in the cart and update the total quantity and total amount of the cart
        localStorage.setItem("cart", JSON.stringify(state));
      }
      // else if (existingItem && existingItem.quantity === 1) 
      //   {
      //   state.totalQuantity -= 1;
      //   state.totalAmount -= Number(existingItem.price);
      //   state.items = state.items.filter(item => item.id !== id);               //if the item exists in the cart and the quantity of the item is equal to 1, then we will remove the item from the cart and update the total quantity and total amount of the cart
      // } 
    },
    clearCart(state) {

      state.items = [];

      state.totalQuantity = 0;

      state.totalAmount = 0;
      localStorage.removeItem("cart");                                              
    }
  }
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;