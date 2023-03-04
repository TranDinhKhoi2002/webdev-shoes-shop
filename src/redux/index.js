import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import authReducer from "./slices/auth";
import dataReducer from "./slices/data";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    data: dataReducer,
  },
});

export default store;
