import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: undefined,
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async () => {});

export const fetchUserRegister = createAsyncThunk("auth/fetchUserRegister", async () => {});

export const fetchUserLogin = createAsyncThunk("auth/fetchUserLogin", async () => {});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;

      const { accountId, token } = action.payload;

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      Cookies.set("token", token, { expires: expiryDate });
      Cookies.set("accountId", accountId, { expires: expiryDate });
    },
    logout(state) {
      state.isAuth = false;
      Cookies.remove("token");
      Cookies.remove("accountId");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchUserLogin.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchUserRegister.fulfilled, (state, { payload }) => {});
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
