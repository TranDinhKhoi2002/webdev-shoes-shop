import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authServices from "@/services/authServices";

const initialState = {
  currentUser: undefined,
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async () => {
  const response = await authServices.getUserProfile();
  return response;
});

export const fetchUserSignup = createAsyncThunk("auth/fetchUserSignup", async (formData) => {
  const response = await authServices.signup(formData);
  return response;
});

export const fetchUserLogin = createAsyncThunk("auth/fetchUserLogin", async (formData) => {
  const response = await authServices.login(formData);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      const { success, user } = payload;

      if (success) {
        state.currentUser = user;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, { payload }) => {
      const { success, jwt, user } = payload;

      if (success) {
        const remainingMilliseconds = 24 * 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        Cookies.set("token", jwt, { expires: expiryDate });

        state.currentUser = user;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchUserSignup.fulfilled, (state, { payload }) => {
      const { success } = payload;

      if (success) {
        Cookies.remove("token");
      }
    });
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
