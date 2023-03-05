import { getData } from "@/services/dataServices";
import { getHistory } from "@/services/dataServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  products: [],
  history: [],
};

export const getCommonData = createAsyncThunk(
  "data/getCommonData",
  async () => {
    const response = await getData();
    return response;
  }
);

export const getCommonHistory = createAsyncThunk(
  "data/getCommonHistory",
  async () => {
    const response = await getHistory();
    return response;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommonData.fulfilled, (state, { payload }) => {
      const { success, brands, products, history } = payload;

      if (success) {
        if (history) {
          state.history = history;
        }
        state.brands = brands;
        state.products = products;
      }
    });
  },
});

export const selectBrands = (state) => state.data.brands;
export const selectProducts = (state) => state.data.products;
export const selectUserHistory = (state) => state.data.history;

export default dataSlice.reducer;
