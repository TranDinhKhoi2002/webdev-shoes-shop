import { getData } from "@/services/dataServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  products: [],
};

export const getCommonData = createAsyncThunk("data/getCommonData", async () => {
  const response = await getData();
  return response;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommonData.fulfilled, (state, { payload }) => {
      const { success, brands, products } = payload;

      if (success) {
        state.brands = brands;
        state.products = products;
      }
    });
  },
});

export const selectBrands = (state) => state.data.brands;
export const selectProducts = (state) => state.data.products;

export default dataSlice.reducer;
