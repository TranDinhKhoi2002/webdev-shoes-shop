import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  products: JSON.parse(localStorage.getItem(`cart-${localStorage.getItem("sessionID")}`)) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, size } = action.payload;

      let sessionID = localStorage.getItem("sessionID");
      if (!sessionID) {
        sessionID = uuidv4();
        localStorage.setItem("sessionID", sessionID);
      }

      const itemIndex = state.products.findIndex((item) => item.product._id === product._id && item.size === size);

      if (itemIndex === -1) {
        const product = { ...action.payload, amount: 1 };
        state.products.push(product);
      } else {
        state.products[itemIndex].amount++;
      }

      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      state.products = state.products.filter(
        (item) =>
          (item.product._id === action.payload.id && item.size !== action.payload.size) ||
          item.product._id !== action.payload.id
      );

      const sessionID = localStorage.getItem("sessionID");
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    checkOut(state) {
      state.products = [];
      const sessionID = localStorage.getItem("sessionID");
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    updateAmountOfProduct(state, action) {
      if (action.payload.amount === "0") {
        state.products = state.products.filter(
          (item) => item.product._id === action.payload.id && item.size !== action.payload.size
        );
      } else {
        const itemIndex = state.products.findIndex(
          (item) => item.product._id === action.payload.id && item.size === action.payload.size
        );

        state.products[itemIndex].amount = +action.payload.amount;
      }

      const sessionID = localStorage.getItem("sessionID");
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
  },
});

export const { addToCart, removeFromCart, checkOut, updateAmountOfProduct } = cartSlice.actions;

export const selectCartProducts = (state) => state.cart.products;

export default cartSlice.reducer;
